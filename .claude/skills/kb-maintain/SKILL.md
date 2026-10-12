---
name: kb-maintain
description: >
  Ведение wiki GitMark при создании, изменении или перемещении документа:
  типы, метаданные, связи, индексы каталогов и проверка MkDocs.
---

# Ведение wiki GitMark

1. Изучить [онтологию](../../../docs/gitmark/ontology.md) и найти материал:
   `python3 .claude/skills/kb-search/gitmark.py search "<тема>" --scope all`.
   Править существующий документ; канонические решения и задачи — в
   `docs/gitmark/README.md`, их не дублировать.
2. При добавлении документа выбрать `node_type` из онтологии, указать `title`,
   `service`, `status`, `updated` и типизированную связь в YAML frontmatter.
   Новый каталог снабдить `README.md` с перечнем документов.
   Пути в frontmatter — от корня репозитория, Markdown-ссылки — от файла.
3. При содержательной правке обновить дату метаданных; дату первоисточника
   сохранить в тексте. Устаревшее пометить `deprecated` или `archived` и
   связать новую версию через `supersedes`. При переносе исправить входящие
   ссылки и навигацию MkDocs.
4. Проверить:

```sh
python3 .claude/skills/kb-search/gitmark.py lint --strict
python3 .claude/skills/kb-search/gitmark.py index
.venv/bin/mkdocs build --strict --site-dir /tmp/diplom-site
```

GitMark проверяет типы и пути, MkDocs — навигацию и якоря. Индекс `.gitmark/`
не коммитить; опубликованный `site/` пересобирать при изменении wiki.
