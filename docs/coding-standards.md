# Coding Standards

## TypeScript Best Practices
- **Strict Mode:** TypeScript `strict` mode is mandatory across the entire project.
- **No `any` Types:** Use precise types or `unknown` where appropriate. `any` is strictly prohibited.

## Development Workflow
- **TDD (Test-Driven Development):** Tests MUST be written before the implementation. Every new feature or bug fix requires a corresponding test suite.
- **Validation:** Every input from the outside world and between internal boundaries must be validated with **Zod**.

## Code Quality
- All exported functions and methods should have clear JSDoc descriptions.
- Use explicit naming for variables, functions, and classes to ensure readability.
