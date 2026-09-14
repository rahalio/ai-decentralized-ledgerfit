/**
 * In-memory stores for Ledgerfit product domains (local/sandbox).
 */

import { nowIso, responseMeta, sandboxId } from './sandbox-store.js';

export { nowIso, responseMeta, sandboxId };

export type SandboxRecord = Record<string, unknown> & { id: string };

const stores = new Map<string, Map<string, SandboxRecord>>();

function bucket(name: string): Map<string, SandboxRecord> {
  let m = stores.get(name);
  if (!m) {
    m = new Map();
    stores.set(name, m);
  }
  return m;
}

export function listRecords(store: string): SandboxRecord[] {
  return [...bucket(store).values()];
}

export function getRecord(store: string, id: string): SandboxRecord | undefined {
  return bucket(store).get(id);
}

export function putRecord(store: string, record: SandboxRecord): SandboxRecord {
  bucket(store).set(record.id, record);
  return record;
}

export function updateRecord(
  store: string,
  id: string,
  patch: Record<string, unknown>
): SandboxRecord | undefined {
  const existing = bucket(store).get(id);
  if (!existing) return undefined;
  const next = { ...existing, ...patch, id };
  bucket(store).set(id, next);
  return next;
}

export function envelopeList(items: unknown[], correlationId?: string) {
  return { data: { items }, ...responseMeta(correlationId) };
}

export function envelopeData(data: unknown, correlationId?: string) {
  return { data, ...responseMeta(correlationId) };
}

export function corr(input: unknown): string {
  const raw = (input ?? {}) as Record<string, unknown>;
  return String(raw.correlationId ?? '');
}

export function asRaw(input: unknown): Record<string, unknown> {
  return (input ?? {}) as Record<string, unknown>;
}
