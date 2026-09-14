/**
 * DecideRepositoryDdb — in-memory sandbox implementation for Ledgerfit.
 * Hand-maintained (codegen stubs replaced for local/dev).
 */

import type { DecideRepository } from "@ledgerfit/services/investigation";
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

export class DecideRepositoryDdb implements DecideRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async decideRevealRequest(input: Parameters<DecideRepository['decideRevealRequest']>[0]): Promise<Awaited<ReturnType<DecideRepository['decideRevealRequest']>>> {
    const raw = asRaw(input);
    const correlationId = corr(input);
    const id = String(raw.id ?? raw.ledgerId ?? raw.jobId ?? raw.artefactId ?? raw.triggerId ?? raw.recordId ?? raw.policyId ?? raw.revealRequestId ?? raw.freezeOrderId ?? '');
    const updated = updateRecord('reveals', id, { ...raw, updatedAt: nowIso() });
    if (!updated) { const err = new Error('Not found') as Error & { statusCode?: number }; err.statusCode = 404; throw err; }
    updated.status = String(raw.decision) === 'approve' ? 'approved' : 'denied'; updated.resolvedAt = nowIso();
    putRecord('reveals', updated);
    return envelopeData(updated, correlationId);
  }
}
