/**
 * MemberRepositoryDdb — in-memory sandbox implementation for Ledgerfit.
 * Hand-maintained (codegen stubs replaced for local/dev).
 */

import type { MemberRepository } from "@ledgerfit/services/ledgers";
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

export class MemberRepositoryDdb implements MemberRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listPharmacyMembers(input: Parameters<MemberRepository['listPharmacyMembers']>[0]): Promise<Awaited<ReturnType<MemberRepository['listPharmacyMembers']>>> {
    const raw = asRaw(input);
    const correlationId = corr(input);
    return envelopeList(listRecords('members'), correlationId);
  }
async addPharmacyMember(input: Parameters<MemberRepository['addPharmacyMember']>[0]): Promise<Awaited<ReturnType<MemberRepository['addPharmacyMember']>>> {
    const raw = asRaw(input);
    const correlationId = corr(input);
    const id = String(raw.id ?? sandboxId('ldg'));
    const record = { ...raw, id, status: raw.status ?? 'active', createdAt: nowIso() } as SandboxRecord;
    putRecord('members', record);
    return envelopeData(record, correlationId);
  }
}
