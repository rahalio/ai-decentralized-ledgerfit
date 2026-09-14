/**
 * EventRepositoryDdb — in-memory sandbox implementation for Ledgerfit.
 * Hand-maintained (codegen stubs replaced for local/dev).
 */

import type { EventRepository } from "@ledgerfit/services/ledgers";
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

export class EventRepositoryDdb implements EventRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listPrescriptionEventRefs(input: Parameters<EventRepository['listPrescriptionEventRefs']>[0]): Promise<Awaited<ReturnType<EventRepository['listPrescriptionEventRefs']>>> {
    const raw = asRaw(input);
    const correlationId = corr(input);
    return envelopeList(listRecords('events'), correlationId);
  }
async anchorPrescriptionEvent(input: Parameters<EventRepository['anchorPrescriptionEvent']>[0]): Promise<Awaited<ReturnType<EventRepository['anchorPrescriptionEvent']>>> {
    const raw = asRaw(input);
    const correlationId = corr(input);
    const id = String(raw.id ?? sandboxId('ldg'));
    const record = { ...raw, id, status: raw.status ?? 'active', createdAt: nowIso() } as SandboxRecord;
    putRecord('events', record);
    return envelopeData(record, correlationId);
  }
}
