---
description: Обновить документ wiki GitMark по заданной теме без создания дубликата.
allowed-tools: Bash(python3:*)
---

# Обновление документа GitMark

Документировать тему: `$ARGUMENTS`.

1. Прочитать `docs/gitmark/README.md` и найти существующий материал:
   `python3 .claude/skills/kb-search/gitmark.py search "$ARGUMENTS" --scope all`.
2. Обновить канонический документ, следуя скиллу `kb-maintain` и
   `docs/gitmark/ontology.md`; отличать подтверждённое решение от предложения.
   Если темы нет — добавить типизированный документ со связью и индексом каталога.
3. Проверить `gitmark.py lint --strict`, `gitmark.py index` и
   `.venv/bin/mkdocs build --strict --site-dir /tmp/diplom-site`.
4. Указать изменённый документ, источники и фактические проверки.
