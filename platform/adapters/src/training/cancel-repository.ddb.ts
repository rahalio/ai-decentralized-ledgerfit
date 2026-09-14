/**
 * CancelRepositoryDdb — in-memory sandbox implementation for Ledgerfit.
 * Hand-maintained (codegen stubs replaced for local/dev).
 */

import type { CancelRepository } from "@ledgerfit/services/training";
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

export class CancelRepositoryDdb implements CancelRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async cancelTrainingJob(input: Parameters<CancelRepository['cancelTrainingJob']>[0]): Promise<Awaited<ReturnType<CancelRepository['cancelTrainingJob']>>> {
    const raw = asRaw(input);
    const correlationId = corr(input);
    const id = String(raw.id ?? raw.ledgerId ?? raw.jobId ?? raw.artefactId ?? raw.triggerId ?? raw.recordId ?? raw.policyId ?? raw.revealRequestId ?? raw.freezeOrderId ?? '');
    const updated = updateRecord('trainingJobs', id, { ...raw, updatedAt: nowIso() });
    if (!updated) { const err = new Error('Not found') as Error & { statusCode?: number }; err.statusCode = 404; throw err; }
    updated.status = 'cancelled';
    putRecord('trainingJobs', updated);
    return envelopeData(updated, correlationId);
  }
}
