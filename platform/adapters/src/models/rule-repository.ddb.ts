/**
 * RuleRepositoryDdb — in-memory sandbox implementation for Ledgerfit.
 * Hand-maintained (codegen stubs replaced for local/dev).
 */

import type { RuleRepository } from "@ledgerfit/services/models";
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

export class RuleRepositoryDdb implements RuleRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listAssociationRules(input: Parameters<RuleRepository['listAssociationRules']>[0]): Promise<Awaited<ReturnType<RuleRepository['listAssociationRules']>>> {
    const raw = asRaw(input);
    const correlationId = corr(input);
    return envelopeList(listRecords('associationRules'), correlationId);
  }
}
