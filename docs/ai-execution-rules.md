# AI Execution Rules

To ensure consistency and quality, the following rules MUST be followed during execution:

1. **Strict Scope Enforcement:** Never modify files or directories that are outside the explicit scope of the user's prompt.
2. **Preserve Tests:** NEVER delete existing tests. If a change impacts a test, the test must be updated or augmented, not deleted.
3. **TDD First:** Always implement tests (unit or e2e) before adding the corresponding business logic.
4. **Architectural Integrity:** Never simplify the modular monolith or Clean Architecture structure without express user approval.
5. **Validation First:** All new data inputs must be validated using the project's standard (Zod) before any logic is applied.
