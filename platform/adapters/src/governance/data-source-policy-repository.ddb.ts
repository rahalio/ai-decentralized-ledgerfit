/**
 * DataSourcePolicyRepositoryDdb — in-memory sandbox implementation for Ledgerfit.
 * Hand-maintained (codegen stubs replaced for local/dev).
 */

import type { DataSourcePolicyRepository } from "@ledgerfit/services/governance";
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

export class DataSourcePolicyRepositoryDdb implements DataSourcePolicyRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listDataSourcePolicies(input: Parameters<DataSourcePolicyRepository['listDataSourcePolicies']>[0]): Promise<Awaited<ReturnType<DataSourcePolicyRepository['listDataSourcePolicies']>>> {
    const raw = asRaw(input);
    const correlationId = corr(input);
    return envelopeList(listRecords('dataSourcePolicies'), correlationId);
  }
async createDataSourcePolicy(input: Parameters<DataSourcePolicyRepository['createDataSourcePolicy']>[0]): Promise<Awaited<ReturnType<DataSourcePolicyRepository['createDataSourcePolicy']>>> {
    const raw = asRaw(input);
    const correlationId = corr(input);
    const id = String(raw.id ?? sandboxId('gov'));
    const record = { ...raw, id, status: raw.status ?? 'active', createdAt: nowIso() } as SandboxRecord;
    putRecord('dataSourcePolicies', record);
    return envelopeData(record, correlationId);
  }
async getDataSourcePolicy(input: Parameters<DataSourcePolicyRepository['getDataSourcePolicy']>[0]): Promise<Awaited<ReturnType<DataSourcePolicyRepository['getDataSourcePolicy']>>> {
    const raw = asRaw(input);
    const correlationId = corr(input);
    const id = String(raw.id ?? raw.ledgerId ?? raw.jobId ?? raw.artefactId ?? raw.triggerId ?? raw.recordId ?? raw.policyId ?? raw.revealRequestId ?? raw.memberId ?? raw.freezeOrderId ?? '');
    const found = getRecord('dataSourcePolicies', id);
    if (!found) { const err = new Error('Not found') as Error & { statusCode?: number }; err.statusCode = 404; throw err; }
    return envelopeData(found, correlationId);
  }
}
