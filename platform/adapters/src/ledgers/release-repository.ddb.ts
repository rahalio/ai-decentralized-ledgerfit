/**
 * ReleaseRepositoryDdb — in-memory sandbox implementation for Ledgerfit.
 * Hand-maintained (codegen stubs replaced for local/dev).
 */

import type { ReleaseRepository } from "@ledgerfit/services/ledgers";
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

export class ReleaseRepositoryDdb implements ReleaseRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async releaseFreezeOrder(input: Parameters<ReleaseRepository['releaseFreezeOrder']>[0]): Promise<Awaited<ReturnType<ReleaseRepository['releaseFreezeOrder']>>> {
    const raw = asRaw(input);
    const correlationId = corr(input);
    const id = String(raw.id ?? raw.ledgerId ?? raw.jobId ?? raw.artefactId ?? raw.triggerId ?? raw.recordId ?? raw.policyId ?? raw.revealRequestId ?? raw.freezeOrderId ?? '');
    const updated = updateRecord('freezeOrders', id, { ...raw, updatedAt: nowIso() });
    if (!updated) { const err = new Error('Not found') as Error & { statusCode?: number }; err.statusCode = 404; throw err; }
    updated.status = 'released'; updated.releasedAt = nowIso();
    putRecord('freezeOrders', updated);
    return envelopeData(updated, correlationId);
  }
}
