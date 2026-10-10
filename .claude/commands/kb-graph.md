---
description: Построить локальный HTML-граф связей wiki GitMark без публикации на сайте.
allowed-tools: Bash(python3:*)
---

# Граф связей wiki

Построить граф из Markdown wiki:

```sh
python3 .claude/skills/kb-search/graph.py -o "${ARGUMENTS:-artifacts/kb-graph.html}"
```

Путь по умолчанию в игнорируемом `artifacts/`, а не в `docs/`, чтобы MkDocs
не копировал сгенерированный HTML в сайт. Сообщить путь, количество документов
и связей. Для проверки структуры использовать `gitmark.py lint --strict`;
описание типов связей — в `docs/gitmark/ontology.md`.
