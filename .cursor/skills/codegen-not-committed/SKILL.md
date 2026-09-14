---
name: codegen-not-committed
description: >-
  Enforce that .codegen is never committed or pushed. Use when staging files,
  committing, pushing, or restoring zero-codegen tooling for Ledgerfit.
---

# `.codegen` never on GitHub

This repository vendors `zero-codegen` under `.codegen/` for local generation only.

## Rules

1. Do **not** stage, commit, or push `.codegen/`.
2. Do **not** use `git add -f` on `.codegen/`.
3. If `.codegen/` is missing after clone, restore it:

```bash
rsync -a /path/to/zero-apps-codegen-scaffold/.codegen/ .codegen/
# Ensure package_scope is @ledgerfit in .codegen/zero-codegen.json and .zero-codegen-merged.json
pnpm codegen:paths
```

4. Prefer regenerating from OpenAPI over checking in tool binaries or Python sources.
