---
description: Проверить покрытие существующей wiki GitMark и пересобрать индекс без дублирования документов.
allowed-tools: Bash(python3:*)
---

# Проверка wiki GitMark

Проверить область `$ARGUMENTS` (если пусто — всю wiki).

1. Прочитать `docs/gitmark/README.md` и `docs/gitmark/ontology.md`, проверить Git status.
2. Индексировать: `python3 .claude/skills/kb-search/gitmark.py index` и
   `python3 .claude/skills/kb-search/gitmark.py stat`.
3. Сопоставить имеющиеся документы с задачей; новых документов из кода агента
   автоматически не генерировать. Для пробела предложить точечное дополнение
   существующей wiki с владельцем и источником, соблюдая `kb-maintain`.
4. Выполнить `python3 .claude/skills/kb-search/gitmark.py lint --strict`
   и `.venv/bin/mkdocs build --strict --site-dir /tmp/diplom-site`; сообщить количество документов и проверки.

Решения исследования и список задач живут в `docs/gitmark/README.md`, не в
отдельной автоматически созданной базе.
