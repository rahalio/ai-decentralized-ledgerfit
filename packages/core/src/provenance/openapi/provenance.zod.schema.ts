import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const exportProvenanceAuditPack_Body = z
  .object({
    artefactIds: z.array(z.string()).min(1),
    includePhi: z.boolean().optional().default(false),
    note: z.string().optional(),
  })
  .passthrough();
const Problem = z
  .object({
    type: z.string().url(),
    title: z.string(),
    status: z.number().int(),
    detail: z.string(),
    instance: z.string().url(),
    code: z.string(),
  })
  .partial()
  .passthrough();
const RecordId = z.string();
const ProvenanceRecord = z
  .object({
    id: z.string().min(1),
    artefactId: z.string(),
    ledgerId: z.string(),
    jobId: z.string(),
    triggerId: z.union([z.string(), z.null()]).optional(),
    eventWindowDigest: z.string(),
    thresholdPolicyId: z.union([z.string(), z.null()]).optional(),
    evaluatorIdentity: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const ProvenanceRecordListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().min(1),
          artefactId: z.string(),
          ledgerId: z.string(),
          jobId: z.string(),
          triggerId: z.union([z.string(), z.null()]).optional(),
          eventWindowDigest: z.string(),
          thresholdPolicyId: z.union([z.string(), z.null()]).optional(),
          evaluatorIdentity: z.string().optional(),
          createdAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
  })
  .passthrough();
const ResponseMeta = z
  .object({
    requestId: z.string().uuid(),
    correlationId: z.string(),
    generatedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();
const ProvenanceRecordListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().min(1),
              artefactId: z.string(),
              ledgerId: z.string(),
              jobId: z.string(),
              triggerId: z.union([z.string(), z.null()]).optional(),
              eventWindowDigest: z.string(),
              thresholdPolicyId: z.union([z.string(), z.null()]).optional(),
              evaluatorIdentity: z.string().optional(),
              createdAt: z.string().datetime({ offset: true }),
            })
            .passthrough()
        ),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const ProvenanceRecordResponse = z
  .object({
    data: z
      .object({
        id: z.string().min(1),
        artefactId: z.string(),
        ledgerId: z.string(),
        jobId: z.string(),
        triggerId: z.union([z.string(), z.null()]).optional(),
        eventWindowDigest: z.string(),
        thresholdPolicyId: z.union([z.string(), z.null()]).optional(),
        evaluatorIdentity: z.string().optional(),
        createdAt: z.string().datetime({ offset: true }),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const ProvenanceExportRequest = z
  .object({
    artefactIds: z.array(z.string()).min(1),
    includePhi: z.boolean().optional().default(false),
    note: z.string().optional(),
  })
  .passthrough();
const ProvenanceExport = z
  .object({
    exportId: z.string(),
    artefactIds: z.array(z.string()),
    contentDigest: z.string(),
    createdAt: z.string().datetime({ offset: true }),
    downloadRef: z.string(),
    expiresAt: z.union([z.string(), z.null()]).optional(),
  })
  .passthrough();
const ProvenanceExportResponse = z
  .object({
    data: z
      .object({
        exportId: z.string(),
        artefactIds: z.array(z.string()),
        contentDigest: z.string(),
        createdAt: z.string().datetime({ offset: true }),
        downloadRef: z.string(),
        expiresAt: z.union([z.string(), z.null()]).optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();

export const schemas: any = {
  exportProvenanceAuditPack_Body,
  Problem,
  RecordId,
  ProvenanceRecord,
  ProvenanceRecordListData,
  ResponseMeta,
  ProvenanceRecordListResponse,
  ProvenanceRecordResponse,
  ProvenanceExportRequest,
  ProvenanceExport,
  ProvenanceExportResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/provenance',
    alias: 'listProvenanceRecords',
    requestFormat: 'json',
    parameters: [
      {
        name: 'cursor',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().int().gte(1).lte(200).optional().default(50),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().min(1),
                  artefactId: z.string(),
                  ledgerId: z.string(),
                  jobId: z.string(),
                  triggerId: z.union([z.string(), z.null()]).optional(),
                  eventWindowDigest: z.string(),
                  thresholdPolicyId: z.union([z.string(), z.null()]).optional(),
                  evaluatorIdentity: z.string().optional(),
                  createdAt: z.string().datetime({ offset: true }),
                })
                .passthrough()
            ),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/v1/provenance/:recordId',
    alias: 'getProvenanceRecord',
    requestFormat: 'json',
    parameters: [
      {
        name: 'recordId',
        type: 'Path',
        schema: z.string().min(1),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().min(1),
            artefactId: z.string(),
            ledgerId: z.string(),
            jobId: z.string(),
            triggerId: z.union([z.string(), z.null()]).optional(),
            eventWindowDigest: z.string(),
            thresholdPolicyId: z.union([z.string(), z.null()]).optional(),
            evaluatorIdentity: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/provenance/export',
    alias: 'exportProvenanceAuditPack',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: exportProvenanceAuditPack_Body,
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            exportId: z.string(),
            artefactIds: z.array(z.string()),
            contentDigest: z.string(),
            createdAt: z.string().datetime({ offset: true }),
            downloadRef: z.string(),
            expiresAt: z.union([z.string(), z.null()]).optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
