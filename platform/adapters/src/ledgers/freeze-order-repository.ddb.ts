/**
 * FreezeOrderRepositoryDdb — in-memory sandbox implementation for Ledgerfit.
 * Hand-maintained (codegen stubs replaced for local/dev).
 */

import type { FreezeOrderRepository } from "@ledgerfit/services/ledgers";
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

export class FreezeOrderRepositoryDdb implements FreezeOrderRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listFreezeOrders(input: Parameters<FreezeOrderRepository['listFreezeOrders']>[0]): Promise<Awaited<ReturnType<FreezeOrderRepository['listFreezeOrders']>>> {
    const raw = asRaw(input);
    const correlationId = corr(input);
    return envelopeList(listRecords('freezeOrders'), correlationId);
  }
}
