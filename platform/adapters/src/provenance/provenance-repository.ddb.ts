/**
 * ProvenanceRepositoryDdb — in-memory sandbox implementation for Ledgerfit.
 * Hand-maintained (codegen stubs replaced for local/dev).
 */

import type { ProvenanceRepository } from "@ledgerfit/services/provenance";
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

export class ProvenanceRepositoryDdb implements ProvenanceRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listProvenanceRecords(input: Parameters<ProvenanceRepository['listProvenanceRecords']>[0]): Promise<Awaited<ReturnType<ProvenanceRepository['listProvenanceRecords']>>> {
    const raw = asRaw(input);
    const correlationId = corr(input);
    return envelopeList(listRecords('provenance'), correlationId);
  }
async getProvenanceRecord(input: Parameters<ProvenanceRepository['getProvenanceRecord']>[0]): Promise<Awaited<ReturnType<ProvenanceRepository['getProvenanceRecord']>>> {
    const raw = asRaw(input);
    const correlationId = corr(input);
    const id = String(raw.id ?? raw.ledgerId ?? raw.jobId ?? raw.artefactId ?? raw.triggerId ?? raw.recordId ?? raw.policyId ?? raw.revealRequestId ?? raw.memberId ?? raw.freezeOrderId ?? '');
    const found = getRecord('provenance', id);
    if (!found) { const err = new Error('Not found') as Error & { statusCode?: number }; err.statusCode = 404; throw err; }
    return envelopeData(found, correlationId);
  }
}
