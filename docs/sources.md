# Научные источники

Сверено с первичными страницами **30.09.2026**. Здесь указана роль работы в нашем исследовании, а не подтверждение её результатов собственным экспериментом. Подробный разбор стенда — в [обзоре τ-bench](tau-bench-review.md), границы постановки — в [исследовании](research.md).

| Работа и первичный источник | Год и статус | Зачем используем | Разбор |
| --- | --- | --- | --- |
| Yao, Shinn, Razavi, Narasimhan. [τ-bench: A Benchmark for Tool-Agent-User Interaction in Real-World Domains](https://proceedings.iclr.cc/paper_files/paper/2025/hash/1b126cc38b8638e07bef37e7b2bb72bf-Abstract-Conference.html) | 2025; статья в proceedings ICLR 2025 | Исходная оценка сервисного агента с инструментами и симуляцией пользователя. | [Состав и оценивание](tau-bench-review.md#семейство-и-состав) |
| Barres, Dong, Ray, Si, Narasimhan. [τ²-Bench: Evaluating Conversational Agents in a Dual-Control Environment](https://arxiv.org/abs/2506.07982) | 2025; [в программе ICML 2026](https://icml.cc/Downloads/2026), препринт arXiv v1 | Расширение семейства: взаимодействие агента и пользователя с общей средой. | [Семейство](tau-bench-review.md#семейство-и-состав) |
| Shi, Zytek, Razavi, Narasimhan, Barres. [τ-Knowledge: Evaluating Conversational Agents over Unstructured Knowledge](https://arxiv.org/abs/2603.04370v1) | 2026; [в программе ICML 2026](https://icml.cc/Downloads/2026), препринт arXiv v1 | Источник для предлагаемого стенда `banking_knowledge` с поиском по базе знаний. | [Корпус и ограничения](tau-bench-review.md#семейство-и-состав) |
| Kapoor и соавт. [Holistic Agent Leaderboard: The Missing Infrastructure for AI Agent Evaluation](https://arxiv.org/abs/2510.11977) | 2026; [статья ICLR 2026](https://hal.cs.princeton.edu/), препринт arXiv v1 | Внешняя оценка агентов с учётом затрат; HAL включает TAU-bench Airline. | [Научный статус](tau-bench-review.md#научный-статус) |
| Cuadron, Yu, Liu, Gupta. [SABER: Small Actions, Big Errors — Safeguarding Mutating Steps in LLM Agents](https://arxiv.org/abs/2512.07850v1) | 2025; препринт arXiv v1, статус рецензирования не подтверждён | Анализ ошибок заданий τ-bench и значимости действий, меняющих состояние. | [Научный статус](tau-bench-review.md#научный-статус) |
| Liu. [Evaluating System One Models for Agent Security Decisions: Reliability, Calibration, and Selective Automation](https://arxiv.org/abs/2609.33401v1) | 2026; препринт arXiv v1 от 27.09.2026, статус рецензирования не подтверждён | Соседняя работа о точности, калибровке и выборочной автоматизации; помогает уточнить отличие нашей задачи. | [Исходные источники](research.md#исходные-источники) |

## Другие типы источников

[Карточки KEV и Laya, исходный код и документация поставщиков](model-research.md) нужны для проверки конкретных моделей и версий, но сами по себе не подтверждают статус рецензируемой статьи. Код и документация τ-bench перечислены в [подробном обзоре стенда](tau-bench-review.md); заявления поставщиков и численные результаты авторов не являются нашими измерениями.
