/**
 * FreezeRepositoryDdb — in-memory sandbox implementation for Ledgerfit.
 * Hand-maintained (codegen stubs replaced for local/dev).
 */

import type { FreezeRepository } from "@ledgerfit/services/ledgers";
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

export class FreezeRepositoryDdb implements FreezeRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async freezePharmacyMember(input: Parameters<FreezeRepository['freezePharmacyMember']>[0]): Promise<Awaited<ReturnType<FreezeRepository['freezePharmacyMember']>>> {
    const raw = asRaw(input);
    const correlationId = corr(input);
    const id = String(raw.id ?? sandboxId('ldg'));
    const record = { ...raw, id, status: raw.status ?? 'active', createdAt: nowIso() } as SandboxRecord;
    record.status = 'active';
    record.issuedAt = nowIso();
    record.slaDeadline = new Date(Date.now() + 24*3600*1000).toISOString();
    putRecord('freezeOrders', record);
    return envelopeData(record, correlationId);
  }
}
