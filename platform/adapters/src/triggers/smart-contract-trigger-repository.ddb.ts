/**
 * SmartContractTriggerRepositoryDdb — in-memory sandbox implementation for Ledgerfit.
 * Hand-maintained (codegen stubs replaced for local/dev).
 */

import type { SmartContractTriggerRepository } from "@ledgerfit/services/triggers";
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

export class SmartContractTriggerRepositoryDdb implements SmartContractTriggerRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listSmartContractTriggers(input: Parameters<SmartContractTriggerRepository['listSmartContractTriggers']>[0]): Promise<Awaited<ReturnType<SmartContractTriggerRepository['listSmartContractTriggers']>>> {
    const raw = asRaw(input);
    const correlationId = corr(input);
    return envelopeList(listRecords('triggers'), correlationId);
  }
async createSmartContractTrigger(input: Parameters<SmartContractTriggerRepository['createSmartContractTrigger']>[0]): Promise<Awaited<ReturnType<SmartContractTriggerRepository['createSmartContractTrigger']>>> {
    const raw = asRaw(input);
    const correlationId = corr(input);
    const id = String(raw.id ?? sandboxId('trg'));
    const record = { ...raw, id, status: raw.status ?? 'active', createdAt: nowIso() } as SandboxRecord;
    putRecord('triggers', record);
    return envelopeData(record, correlationId);
  }
async getSmartContractTrigger(input: Parameters<SmartContractTriggerRepository['getSmartContractTrigger']>[0]): Promise<Awaited<ReturnType<SmartContractTriggerRepository['getSmartContractTrigger']>>> {
    const raw = asRaw(input);
    const correlationId = corr(input);
    const id = String(raw.id ?? raw.ledgerId ?? raw.jobId ?? raw.artefactId ?? raw.triggerId ?? raw.recordId ?? raw.policyId ?? raw.revealRequestId ?? raw.memberId ?? raw.freezeOrderId ?? '');
    const found = getRecord('triggers', id);
    if (!found) { const err = new Error('Not found') as Error & { statusCode?: number }; err.statusCode = 404; throw err; }
    return envelopeData(found, correlationId);
  }
async updateSmartContractTrigger(input: Parameters<SmartContractTriggerRepository['updateSmartContractTrigger']>[0]): Promise<Awaited<ReturnType<SmartContractTriggerRepository['updateSmartContractTrigger']>>> {
    const raw = asRaw(input);
    const correlationId = corr(input);
    const id = String(raw.id ?? raw.ledgerId ?? raw.jobId ?? raw.artefactId ?? raw.triggerId ?? raw.recordId ?? raw.policyId ?? raw.revealRequestId ?? raw.freezeOrderId ?? '');
    const updated = updateRecord('triggers', id, { ...raw, updatedAt: nowIso() });
    if (!updated) { const err = new Error('Not found') as Error & { statusCode?: number }; err.statusCode = 404; throw err; }
    putRecord('triggers', updated);
    return envelopeData(updated, correlationId);
  }
}
