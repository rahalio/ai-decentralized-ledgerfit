#!/usr/bin/env node
/**
 * Rewrite .codegen/.zero-codegen-merged.json paths to absolute (cwd = repo root).
 * Preserves paths.output import maps from zero-codegen.json when missing.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const configPath = join(root, '.codegen', '.zero-codegen-merged.json');
const basePath = join(root, '.codegen', 'zero-codegen.json');
const cfg = JSON.parse(readFileSync(configPath, 'utf8'));

cfg.paths = {
  ...cfg.paths,
  project_root: root,
  openapi_dir: join(root, 'packages', 'openapi-core', 'src'),
  bundled_dir: join(root, 'packages', 'openapi-core', 'src', '.bundled'),
};

if ((!cfg.paths.output || !Object.keys(cfg.paths.output).length) && existsSync(basePath)) {
  const base = JSON.parse(readFileSync(basePath, 'utf8'));
  if (base.paths?.output) {
    cfg.paths.output = base.paths.output;
  }
  if (base.package_scope) cfg.package_scope = base.package_scope;
  if (base.package_name) cfg.package_name = base.package_name;
}

if (!cfg.package_scope) cfg.package_scope = '@ledgerfit';
if (!cfg.package_name) cfg.package_name = '@ledgerfit/core';

writeFileSync(configPath, JSON.stringify(cfg, null, 2) + '\n');
console.log('Updated codegen paths for', root);
