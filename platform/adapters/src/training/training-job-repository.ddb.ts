/**
 * TrainingJobRepositoryDdb — in-memory sandbox implementation for Ledgerfit.
 * Hand-maintained (codegen stubs replaced for local/dev).
 */

import type { TrainingJobRepository } from "@ledgerfit/services/training";
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

export class TrainingJobRepositoryDdb implements TrainingJobRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listTrainingJobs(input: Parameters<TrainingJobRepository['listTrainingJobs']>[0]): Promise<Awaited<ReturnType<TrainingJobRepository['listTrainingJobs']>>> {
    const raw = asRaw(input);
    const correlationId = corr(input);
    return envelopeList(listRecords('trainingJobs'), correlationId);
  }
async createTrainingJob(input: Parameters<TrainingJobRepository['createTrainingJob']>[0]): Promise<Awaited<ReturnType<TrainingJobRepository['createTrainingJob']>>> {
    const raw = asRaw(input);
    const correlationId = corr(input);
    const id = String(raw.id ?? sandboxId('trn'));
    const record = { ...raw, id, status: raw.status ?? 'active', createdAt: nowIso() } as SandboxRecord;
    putRecord('trainingJobs', record);
    return envelopeData(record, correlationId);
  }
async getTrainingJob(input: Parameters<TrainingJobRepository['getTrainingJob']>[0]): Promise<Awaited<ReturnType<TrainingJobRepository['getTrainingJob']>>> {
    const raw = asRaw(input);
    const correlationId = corr(input);
    const id = String(raw.id ?? raw.ledgerId ?? raw.jobId ?? raw.artefactId ?? raw.triggerId ?? raw.recordId ?? raw.policyId ?? raw.revealRequestId ?? raw.memberId ?? raw.freezeOrderId ?? '');
    const found = getRecord('trainingJobs', id);
    if (!found) { const err = new Error('Not found') as Error & { statusCode?: number }; err.statusCode = 404; throw err; }
    return envelopeData(found, correlationId);
  }
}
