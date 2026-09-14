/**
 * FireRepositoryDdb — in-memory sandbox implementation for Ledgerfit.
 * Hand-maintained (codegen stubs replaced for local/dev).
 */

import type { FireRepository } from "@ledgerfit/services/triggers";
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

export class FireRepositoryDdb implements FireRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async fireSmartContractTrigger(input: Parameters<FireRepository['fireSmartContractTrigger']>[0]): Promise<Awaited<ReturnType<FireRepository['fireSmartContractTrigger']>>> {
    const raw = asRaw(input);
    const correlationId = corr(input);
    const id = String(raw.id ?? raw.ledgerId ?? raw.jobId ?? raw.artefactId ?? raw.triggerId ?? raw.recordId ?? raw.policyId ?? raw.revealRequestId ?? raw.freezeOrderId ?? '');
    const fire = { id: sandboxId('trg'), triggerId: id, jobId: sandboxId('trn'), firedAt: nowIso() } as SandboxRecord;
    putRecord('triggerFires', fire);
    return envelopeData(fire, correlationId);
  }
}
