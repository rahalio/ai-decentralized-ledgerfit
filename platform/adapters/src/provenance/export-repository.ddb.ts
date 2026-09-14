/**
 * ExportRepositoryDdb — in-memory sandbox implementation for Ledgerfit.
 * Hand-maintained (codegen stubs replaced for local/dev).
 */

import type { ExportRepository } from "@ledgerfit/services/provenance";
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

export class ExportRepositoryDdb implements ExportRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async exportProvenanceAuditPack(input: Parameters<ExportRepository['exportProvenanceAuditPack']>[0]): Promise<Awaited<ReturnType<ExportRepository['exportProvenanceAuditPack']>>> {
    const raw = asRaw(input);
    const correlationId = corr(input);
    const id = String(raw.id ?? raw.ledgerId ?? raw.jobId ?? raw.artefactId ?? raw.triggerId ?? raw.recordId ?? raw.policyId ?? raw.revealRequestId ?? raw.freezeOrderId ?? '');
    const exp = { id: sandboxId('prv'), exportId: sandboxId('prv'), artefactIds: raw.artefactIds ?? [], contentDigest: 'sha256:sandbox', createdAt: nowIso(), downloadRef: 'sandbox://export' } as SandboxRecord;
    putRecord('provenanceExports', exp);
    return envelopeData(exp, correlationId);
  }
}
