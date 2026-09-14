/**
 * RevealRepositoryDdb — in-memory sandbox implementation for Ledgerfit.
 * Hand-maintained (codegen stubs replaced for local/dev).
 */

import type { RevealRepository } from "@ledgerfit/services/investigation";
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

export class RevealRepositoryDdb implements RevealRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listRevealRequests(input: Parameters<RevealRepository['listRevealRequests']>[0]): Promise<Awaited<ReturnType<RevealRepository['listRevealRequests']>>> {
    const raw = asRaw(input);
    const correlationId = corr(input);
    return envelopeList(listRecords('reveals'), correlationId);
  }
async createRevealRequest(input: Parameters<RevealRepository['createRevealRequest']>[0]): Promise<Awaited<ReturnType<RevealRepository['createRevealRequest']>>> {
    const raw = asRaw(input);
    const correlationId = corr(input);
    const id = String(raw.id ?? sandboxId('inv'));
    const record = { ...raw, id, status: raw.status ?? 'active', createdAt: nowIso() } as SandboxRecord;
    putRecord('reveals', record);
    return envelopeData(record, correlationId);
  }
async getRevealRequest(input: Parameters<RevealRepository['getRevealRequest']>[0]): Promise<Awaited<ReturnType<RevealRepository['getRevealRequest']>>> {
    const raw = asRaw(input);
    const correlationId = corr(input);
    const id = String(raw.id ?? raw.ledgerId ?? raw.jobId ?? raw.artefactId ?? raw.triggerId ?? raw.recordId ?? raw.policyId ?? raw.revealRequestId ?? raw.memberId ?? raw.freezeOrderId ?? '');
    const found = getRecord('reveals', id);
    if (!found) { const err = new Error('Not found') as Error & { statusCode?: number }; err.statusCode = 404; throw err; }
    return envelopeData(found, correlationId);
  }
}
