/**
 * ApproveRepositoryDdb — in-memory sandbox implementation for Ledgerfit.
 * Hand-maintained (codegen stubs replaced for local/dev).
 */

import type { ApproveRepository } from "@ledgerfit/services/governance";
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

export class ApproveRepositoryDdb implements ApproveRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async approveThresholdPolicy(input: Parameters<ApproveRepository['approveThresholdPolicy']>[0]): Promise<Awaited<ReturnType<ApproveRepository['approveThresholdPolicy']>>> {
    const raw = asRaw(input);
    const correlationId = corr(input);
    const id = String(raw.id ?? raw.ledgerId ?? raw.jobId ?? raw.artefactId ?? raw.triggerId ?? raw.recordId ?? raw.policyId ?? raw.revealRequestId ?? raw.freezeOrderId ?? '');
    const updated = updateRecord('thresholdPolicies', id, { ...raw, updatedAt: nowIso() });
    if (!updated) { const err = new Error('Not found') as Error & { statusCode?: number }; err.statusCode = 404; throw err; }
    updated.status = 'approved'; updated.approvedAt = nowIso();
    putRecord('thresholdPolicies', updated);
    return envelopeData(updated, correlationId);
  }
}
