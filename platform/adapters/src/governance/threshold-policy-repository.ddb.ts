/**
 * ThresholdPolicyRepositoryDdb — in-memory sandbox implementation for Ledgerfit.
 * Hand-maintained (codegen stubs replaced for local/dev).
 */

import type { ThresholdPolicyRepository } from "@ledgerfit/services/governance";
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

export class ThresholdPolicyRepositoryDdb implements ThresholdPolicyRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listThresholdPolicies(input: Parameters<ThresholdPolicyRepository['listThresholdPolicies']>[0]): Promise<Awaited<ReturnType<ThresholdPolicyRepository['listThresholdPolicies']>>> {
    const raw = asRaw(input);
    const correlationId = corr(input);
    return envelopeList(listRecords('thresholdPolicies'), correlationId);
  }
async createThresholdPolicy(input: Parameters<ThresholdPolicyRepository['createThresholdPolicy']>[0]): Promise<Awaited<ReturnType<ThresholdPolicyRepository['createThresholdPolicy']>>> {
    const raw = asRaw(input);
    const correlationId = corr(input);
    const id = String(raw.id ?? sandboxId('gov'));
    const record = { ...raw, id, status: raw.status ?? 'active', createdAt: nowIso() } as SandboxRecord;
    putRecord('thresholdPolicies', record);
    return envelopeData(record, correlationId);
  }
async getThresholdPolicy(input: Parameters<ThresholdPolicyRepository['getThresholdPolicy']>[0]): Promise<Awaited<ReturnType<ThresholdPolicyRepository['getThresholdPolicy']>>> {
    const raw = asRaw(input);
    const correlationId = corr(input);
    const id = String(raw.id ?? raw.ledgerId ?? raw.jobId ?? raw.artefactId ?? raw.triggerId ?? raw.recordId ?? raw.policyId ?? raw.revealRequestId ?? raw.memberId ?? raw.freezeOrderId ?? '');
    const found = getRecord('thresholdPolicies', id);
    if (!found) { const err = new Error('Not found') as Error & { statusCode?: number }; err.statusCode = 404; throw err; }
    return envelopeData(found, correlationId);
  }
}
