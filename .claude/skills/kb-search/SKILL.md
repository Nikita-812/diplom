---
name: kb-search
description: >
  Искать положения и ссылки в wiki проекта через GitMark, прежде чем читать
  много документов наугад или отвечать, где зафиксировано решение.
---

# Поиск по wiki GitMark

Канонические Markdown-документы находятся в `docs/gitmark/`, индекс `.gitmark/`
пересобирается из них. Из корня репозитория:

```sh
python3 .claude/skills/kb-search/gitmark.py index
python3 .claude/skills/kb-search/gitmark.py search "<запрос>" -k 8
python3 .claude/skills/kb-search/gitmark.py stat
```

Искать можно по точному термину, подстроке и неточному совпадению;
в ответе указаны путь, строка и фрагмент. Открыть 1–2 подходящих документа,
проверить контекст и дать ссылки на них. Для исторических `plan`/`report`
использовать `search "<запрос>" --scope all` (по умолчанию поиск по живой wiki).
Типы и порядок обновления — в `docs/gitmark/ontology.md` и скилле `kb-maintain`.
