---
node_type: reference
title: Онтология GitMark
service: _platform
status: active
updated: 2026-10-10
links:
  relates_to: [docs/gitmark/README.md]
---

# Онтология GitMark

Wiki в [GitMark](README.md) — единственный источник проектных решений и задач.
GitMark добавляет к Markdown тип документа, метаданные и связи; `.gitmark/` —
производный индекс, который не хранится в Git. Сканируется только `docs/gitmark/`.
Сайт MkDocs отображает те же файлы, без копирования содержания.

## Типы документов

| `node_type` | Значение |
| --- | --- |
| `index` | Навигация по каталогу (`README.md`) |
| `reference` | Актуальная постановка, спецификация, обзор ресурсов |
| `guide` | Как пользоваться материалами или работать в проекте |
| `runbook` | Процедура с последовательностью действий |
| `gotcha` | Ограничение и способ его учёта |
| `decision` | Принятое решение с контекстом |
| `service` | Описание работающего компонента |
| `plan` | Исторический план, который может устареть |
| `report` | Разовый датированный отчёт |

`plan` и `report` доступны через `search --scope all`, но исключены из поиска
актуальных документов по умолчанию. Предложение из исследовательского документа
само по себе не становится решением при смене типа.

## Метаданные и связи

```yaml
---
node_type: reference
title: Пример документа
service: _platform
status: active
updated: 2026-10-10
links:
  depends_on: [docs/gitmark/README.md]
---
```

Обязателен `node_type`. Для несущих документов указываются также `title`,
`service`, `status` (`active`, `draft`, `deprecated`, `archived`) и дата `updated`
(`YYYY-MM-DD`). `service` — свободная метка; пока общая область `_platform`.
При содержательном изменении обновить дату метаданных, не подменяя даты
исходных интервью или первичных источников в тексте.

`links` описывают типизированные отношения: `documents` и `implemented_by`
ведут к коду, `depends_on` — к необходимому контексту, `part_of` — к индексу,
`relates_to` — к соседнему документу, `supersedes` — от замены к устаревшей версии.
В frontmatter пути пишутся от корня репозитория, например
`docs/gitmark/research.md`. В обычных Markdown-ссылках пути пишутся **от файла**
(`research.md`, `../README.md`): так переходы работают и в MkDocs, и на GitHub.
Пример метаданных выше — схема, а не действительный объект wiki.

## Инварианты и проверки

- I1: несущие документы имеют известный `node_type`.
- I2: `node_type` и `status` принадлежат словарям выше.
- I3: несущий документ связан хотя бы с одним другим объектом.
- I4: Markdown- и frontmatter-ссылки ведут к существующим файлам.
- I5: в каждом каталоге базы есть `README.md`.
- I6: цель `supersedes` имеет статус `deprecated` или `archived`.

После изменения документа: `python3 .claude/skills/kb-search/gitmark.py lint --strict`,
затем `python3 .claude/skills/kb-search/gitmark.py index`. GitMark проверяет наличие
файла, но не якоря `#…`; якоря и навигацию проверяет `mkdocs build --strict`.
Перед созданием документа искать существующий; список задач и подтверждённые
решения обновлять в [главной wiki](README.md), не заводить второй список.

Адаптировано из [онтологии very-ai-framework](https://github.com/redmadrobot-rnd/very-ai-framework/blob/4ebe7903d8725d45335ec7f726a06ad3f8d5bd53/docs/gitmark/ontology.md)
(коммит `4ebe790`, проверено 10.10.2026); лицензия скопированных компонентов —
в `.claude/FRAMEWORK-LICENSE`.
