/**
 * AcknowledgeRepositoryDdb — in-memory sandbox implementation for Ledgerfit.
 * Hand-maintained (codegen stubs replaced for local/dev).
 */

import type { AcknowledgeRepository } from "@ledgerfit/services/ledgers";
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

export class AcknowledgeRepositoryDdb implements AcknowledgeRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async acknowledgeFreezeOrder(input: Parameters<AcknowledgeRepository['acknowledgeFreezeOrder']>[0]): Promise<Awaited<ReturnType<AcknowledgeRepository['acknowledgeFreezeOrder']>>> {
    const raw = asRaw(input);
    const correlationId = corr(input);
    const id = String(raw.id ?? raw.ledgerId ?? raw.jobId ?? raw.artefactId ?? raw.triggerId ?? raw.recordId ?? raw.policyId ?? raw.revealRequestId ?? raw.freezeOrderId ?? '');
    const updated = updateRecord('freezeOrders', id, { ...raw, updatedAt: nowIso() });
    if (!updated) { const err = new Error('Not found') as Error & { statusCode?: number }; err.statusCode = 404; throw err; }
    updated.status = 'acknowledged'; updated.acknowledgedAt = nowIso();
    putRecord('freezeOrders', updated);
    return envelopeData(updated, correlationId);
  }
}
