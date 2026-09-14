/**
 * ModelArtefactRepositoryDdb — in-memory sandbox implementation for Ledgerfit.
 * Hand-maintained (codegen stubs replaced for local/dev).
 */

import type { ModelArtefactRepository } from "@ledgerfit/services/models";
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

export class ModelArtefactRepositoryDdb implements ModelArtefactRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listModelArtefacts(input: Parameters<ModelArtefactRepository['listModelArtefacts']>[0]): Promise<Awaited<ReturnType<ModelArtefactRepository['listModelArtefacts']>>> {
    const raw = asRaw(input);
    const correlationId = corr(input);
    return envelopeList(listRecords('modelArtefacts'), correlationId);
  }
async registerModelArtefact(input: Parameters<ModelArtefactRepository['registerModelArtefact']>[0]): Promise<Awaited<ReturnType<ModelArtefactRepository['registerModelArtefact']>>> {
    const raw = asRaw(input);
    const correlationId = corr(input);
    const id = String(raw.id ?? sandboxId('mdl'));
    const record = { ...raw, id, status: raw.status ?? 'active', createdAt: nowIso() } as SandboxRecord;
    putRecord('modelArtefacts', record);
    return envelopeData(record, correlationId);
  }
async getModelArtefact(input: Parameters<ModelArtefactRepository['getModelArtefact']>[0]): Promise<Awaited<ReturnType<ModelArtefactRepository['getModelArtefact']>>> {
    const raw = asRaw(input);
    const correlationId = corr(input);
    const id = String(raw.id ?? raw.ledgerId ?? raw.jobId ?? raw.artefactId ?? raw.triggerId ?? raw.recordId ?? raw.policyId ?? raw.revealRequestId ?? raw.memberId ?? raw.freezeOrderId ?? '');
    const found = getRecord('modelArtefacts', id);
    if (!found) { const err = new Error('Not found') as Error & { statusCode?: number }; err.statusCode = 404; throw err; }
    return envelopeData(found, correlationId);
  }
}
