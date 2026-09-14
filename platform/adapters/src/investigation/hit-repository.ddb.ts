/**
 * HitRepositoryDdb — in-memory sandbox implementation for Ledgerfit.
 * Hand-maintained (codegen stubs replaced for local/dev).
 */

import type { HitRepository } from "@ledgerfit/services/investigation";
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

export class HitRepositoryDdb implements HitRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listMaskedHits(input: Parameters<HitRepository['listMaskedHits']>[0]): Promise<Awaited<ReturnType<HitRepository['listMaskedHits']>>> {
    const raw = asRaw(input);
    const correlationId = corr(input);
    return envelopeList(listRecords('maskedHits'), correlationId);
  }
}
