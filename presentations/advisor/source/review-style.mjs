// Review the editable current deck without depending on historical PPTX files.
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath, pathToFileURL } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(dir, '../../..');
const advisor = process.env.ADVISOR_DIRECTORY || path.join(root, 'presentations/advisor');
const source = path.resolve(process.env.DECK_INPUT || path.join(advisor, 'advisor-presentation.pptx'));
const work = path.resolve(process.env.DECK_WORK_DIR || path.join(root, 'artifacts/advisor-style-review'));
const build = path.join(work, '.build');
const out = path.join(work, 'output');
const moduleDir = process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES;
const skill = process.env.PRESENTATIONS_SKILL_DIR;
const python = process.env.CODEX_PRIMARY_RUNTIME_PYTHON;
if (!moduleDir || !skill || !python) throw new Error('Set the Codex runtime and presentation skill paths.');
const { default: JSZip } = await import(pathToFileURL(path.join(moduleDir, 'jszip/lib/index.js')).href);
const { PresentationFile, FileBlob } = await import(pathToFileURL(path.join(moduleDir, '@oai/artifact-tool/dist/artifact_tool.mjs')).href);
const { finalizePresentation } = await import(pathToFileURL(path.join(skill, 'container_tools/artifact_tool_utils.mjs')).href);
const versions = JSON.parse(await fs.readFile(path.join(advisor, 'source/runtime-versions.json'), 'utf8'));
const installed = JSON.parse(await fs.readFile(path.join(moduleDir, '@oai/artifact-tool/package.json'), 'utf8'));
if (installed.version !== versions.artifact_tool) throw new Error('Artifact Tool version differs from runtime-versions.json.');
const bytes = await fs.readFile(source);
await fs.mkdir(build, { recursive: true });
await fs.mkdir(out, { recursive: true });
const imported = await PresentationFile.importPptx(await FileBlob.load(source));
if (imported.slides.items.length !== 16) throw new Error('Source import lost slides.');
const zip = await JSZip.loadAsync(bytes);
const changedParts = [];
for (let slide = 1; slide <= 16; slide++) {
  const name = `ppt/slides/slide${slide}.xml`;
  const original = await zip.file(name).async('string');
  // Change text properties only: preserve diagram strokes and native equations.
  const updated = original.replace(/<a:(rPr|defRPr|endParaRPr)\b[^>]*>.*?<\/a:\1>/gs, props => {
    let result = props.replaceAll('val="236F6A"', `val="${versions.text_color}"`);
    if (slide === 1 && /\bsz="1800"/.test(props)) {
      result = result.replaceAll('val="5D686E"', `val="${versions.text_color}"`);
    }
    return result;
  });
  if (original !== updated) {
    zip.file(name, updated, { createFolders: false });
    changedParts.push(name);
  }
}
// PowerPoint renders hyperlinks with theme colors even with an explicit run fill.
for (const name of Object.keys(zip.files).filter(n => /^ppt\/(?:[^/]+\/)?theme\/theme\d+\.xml$/.test(n))) {
  const original = await zip.file(name).async('string');
  const updated = original.replace(/<a:(hlink|folHlink)>.*?<\/a:\1>/gs,
    (_, role) => `<a:${role}><a:srgbClr val="${versions.text_color}" /></a:${role}>`);
  if (original !== updated) {
    zip.file(name, updated, { createFolders: false });
    changedParts.push(name);
  }
}
const candidate = path.join(build, 'candidate.pptx');
await fs.writeFile(candidate, await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' }));
const tableOwners = [4, 9, 10, 12, 15];
await finalizePresentation({
  workspaceDir: work, candidatePath: candidate,
  finalPath: path.join(out, 'advisor-presentation.pptx'),
  pythonExecutable: python,
  integrityValidatorPath: path.join(skill, 'container_tools/inspect_presentation_package_integrity.py'),
  layoutValidatorPath: path.join(skill, 'container_tools/inspect_presentation_layout_geometry.py'),
  explicitTotalSlideCount: 16, requiredNativeTableOwnerSlides: tableOwners,
  requiredNativeChartOwnerSlides: [],
  layoutArgs: ['--expected-slide-size-emu', '12192000,6858000', '--validate-heading-fit', ...tableOwners.flatMap(n => ['--require-native-table-slide', String(n)])],
  fontPolicy: { basis: 'reference', families: ['DejaVu Sans', 'Cambria Math'], referencePath: source,
    referenceSha256: crypto.createHash('sha256').update(bytes).digest('hex') },
  verifyArtifactToolImport: true, receiptPath: path.join(build, 'validation.json'),
});
await fs.writeFile(path.join(build, 'style-review.json'), JSON.stringify({
  sourceSha256: crypto.createHash('sha256').update(bytes).digest('hex'), changedParts,
  textColor: versions.text_color, preservedContent: true,
}, null, 2) + '\n');
console.log(`Style review exported; ${changedParts.length} package parts changed.`);
