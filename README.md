# Ledgerfit

Permissioned-ledger ML control plane for multi-pharmacy controlled-substance surveillance. OpenAPI-first DDD monorepo (`@ledgerfit/*`) ported from the zero-apps codegen scaffold.

Product specs: [PRODUCT.md](./PRODUCT.md) · [USER_STORIES.md](./USER_STORIES.md) · [WEBAPP.md](./WEBAPP.md)

## Layout

```
packages/openapi-core  →  packages/core  →  platform/services  →  platform/adapters  →  platform/api-server
         ↑ OpenAPI source of truth                              ports↑        impl↑              HTTP↑
platform/webapp        → domain services + feature views (codegen skeleton + product UI)
```

Package scope: **`@ledgerfit/*`**

## Quick start

```bash
# If .codegen/ is missing (it is never committed), restore from the scaffold:
#   rsync -a --delete /path/to/zero-apps-codegen-scaffold/.codegen/ .codegen/
#   then set package_scope to @ledgerfit in .codegen/*.json and run pnpm codegen:paths

pnpm install
pnpm codegen:paths
pnpm lint:openapi && pnpm bundle:openapi
pnpm build
pnpm dev:api
# Health: curl http://127.0.0.1:4000/health
# Demo key: X-API-Key: ledgerfit_demo_local_dev_key
```

Optional Dynamo Local:

```bash
docker compose up -d
TABLE_NAME=ledgerfit-core-local AWS_ENDPOINT_URL=http://localhost:8000 node scripts/ensure-dynamo-table.mjs
```

## Codegen rules

1. **New domain** → full multi-layer generate once (Mode A).
2. **YAML edit on existing domain** → regenerate **core only**, handwrite below (Mode B).
3. **Never commit or push `.codegen/`** — restore from `zero-apps-codegen-scaffold` when needed.
4. Keep envelopes (`{ data, meta }`), nested DI, and identity middleware intact.

See `.cursor/skills/` and `docs/CODEGEN.md`.

## Domains

| Domain | OpenAPI |
|--------|---------|
| identity | `packages/openapi-core/src/identity.yaml` |
| ledgers | `packages/openapi-core/src/ledgers.yaml` |
| training | `packages/openapi-core/src/training.yaml` |
| models | `packages/openapi-core/src/models.yaml` |
| triggers | `packages/openapi-core/src/triggers.yaml` |
| provenance | `packages/openapi-core/src/provenance.yaml` |
| investigation | `packages/openapi-core/src/investigation.yaml` |
| governance | `packages/openapi-core/src/governance.yaml` |
