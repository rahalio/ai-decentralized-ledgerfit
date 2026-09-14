/**
 * CaseNoteRepositoryDdb — in-memory sandbox implementation for Ledgerfit.
 * Hand-maintained (codegen stubs replaced for local/dev).
 */

import type { CaseNoteRepository } from "@ledgerfit/services/investigation";
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

export class CaseNoteRepositoryDdb implements CaseNoteRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listCaseNotes(input: Parameters<CaseNoteRepository['listCaseNotes']>[0]): Promise<Awaited<ReturnType<CaseNoteRepository['listCaseNotes']>>> {
    const raw = asRaw(input);
    const correlationId = corr(input);
    return envelopeList(listRecords('caseNotes'), correlationId);
  }
async createCaseNote(input: Parameters<CaseNoteRepository['createCaseNote']>[0]): Promise<Awaited<ReturnType<CaseNoteRepository['createCaseNote']>>> {
    const raw = asRaw(input);
    const correlationId = corr(input);
    const id = String(raw.id ?? sandboxId('inv'));
    const record = { ...raw, id, status: raw.status ?? 'active', createdAt: nowIso() } as SandboxRecord;
    putRecord('caseNotes', record);
    return envelopeData(record, correlationId);
  }
}
