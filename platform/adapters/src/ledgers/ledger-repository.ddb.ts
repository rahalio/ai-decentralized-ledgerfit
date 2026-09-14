/**
 * LedgerRepositoryDdb — in-memory sandbox implementation for Ledgerfit.
 * Hand-maintained (codegen stubs replaced for local/dev).
 */

import type { LedgerRepository } from "@ledgerfit/services/ledgers";
import {
  asRaw,
  corr,
  envelopeData,
  envelopeList,
  getRecord,
  listRecords,
  nowIso,
  putRecord,
  sandboxId,
  updateRecord,
  type SandboxRecord,
} from "../_shared/product-sandbox-store.js";

export class LedgerRepositoryDdb implements LedgerRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listLedgers(input: Parameters<LedgerRepository['listLedgers']>[0]): Promise<Awaited<ReturnType<LedgerRepository['listLedgers']>>> {
    const raw = asRaw(input);
    const correlationId = corr(input);
    return envelopeList(listRecords('ledgers'), correlationId);
  }
async registerLedger(input: Parameters<LedgerRepository['registerLedger']>[0]): Promise<Awaited<ReturnType<LedgerRepository['registerLedger']>>> {
    const raw = asRaw(input);
    const correlationId = corr(input);
    const id = String(raw.id ?? sandboxId('ldg'));
    const record = { ...raw, id, ledgerId: id, name: raw.name, fabricType: raw.fabricType, permissioned: true, status: raw.status ?? 'active', createdAt: nowIso() } as SandboxRecord;
    putRecord('ledgers', record);
    return envelopeData(record, correlationId);
  }
async getLedger(input: Parameters<LedgerRepository['getLedger']>[0]): Promise<Awaited<ReturnType<LedgerRepository['getLedger']>>> {
    const raw = asRaw(input);
    const correlationId = corr(input);
    const id = String(raw.ledgerId ?? raw.id ?? '');
    const found = getRecord('ledgers', id);
    if (!found) { const err = new Error('Not found') as Error & { statusCode?: number }; err.statusCode = 404; throw err; }
    return envelopeData(found, correlationId);
  }
}
