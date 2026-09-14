import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createRevealRequest_Body = z
  .object({ hitId: z.string().min(1), reason: z.string() })
  .passthrough();
const decideRevealRequest_Body = z
  .object({
    decision: z.enum(['approve', 'deny']),
    note: z.string().optional(),
  })
  .passthrough();
const createCaseNote_Body = z
  .object({ hitId: z.string().min(1), body: z.string() })
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
const MaskedHitId = z.string();
const MaskedHit = z
  .object({
    id: z.string().min(1),
    ruleId: z.string(),
    artefactId: z.string(),
    maskedSubjectLabel: z.string(),
    pharmacyMemberId: z.union([z.string(), z.null()]).optional(),
    support: z.number(),
    confidence: z.number(),
    gatewayNonOpioidTag: z.boolean().optional().default(false),
    priority: z.number().int().gte(0).optional(),
  })
  .passthrough();
const MaskedHitListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().min(1),
          ruleId: z.string(),
          artefactId: z.string(),
          maskedSubjectLabel: z.string(),
          pharmacyMemberId: z.union([z.string(), z.null()]).optional(),
          support: z.number(),
          confidence: z.number(),
          gatewayNonOpioidTag: z.boolean().optional().default(false),
          priority: z.number().int().gte(0).optional(),
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
const MaskedHitListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().min(1),
              ruleId: z.string(),
              artefactId: z.string(),
              maskedSubjectLabel: z.string(),
              pharmacyMemberId: z.union([z.string(), z.null()]).optional(),
              support: z.number(),
              confidence: z.number(),
              gatewayNonOpioidTag: z.boolean().optional().default(false),
              priority: z.number().int().gte(0).optional(),
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
const RevealRequestId = z.string();
const RevealRequest = z
  .object({
    id: z.string().min(1),
    hitId: z.string().min(1),
    status: z.enum(['pending', 'approved', 'denied', 'expired']),
    requestedBy: z.string(),
    approverId: z.union([z.string(), z.null()]).optional(),
    reason: z.string().optional(),
    requestedAt: z.string().datetime({ offset: true }),
    resolvedAt: z.union([z.string(), z.null()]).optional(),
    revealedPayload: z.object({}).partial().passthrough().optional(),
  })
  .passthrough();
const RevealRequestListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().min(1),
          hitId: z.string().min(1),
          status: z.enum(['pending', 'approved', 'denied', 'expired']),
          requestedBy: z.string(),
          approverId: z.union([z.string(), z.null()]).optional(),
          reason: z.string().optional(),
          requestedAt: z.string().datetime({ offset: true }),
          resolvedAt: z.union([z.string(), z.null()]).optional(),
          revealedPayload: z.object({}).partial().passthrough().optional(),
        })
        .passthrough()
    ),
  })
  .passthrough();
const RevealRequestListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().min(1),
              hitId: z.string().min(1),
              status: z.enum(['pending', 'approved', 'denied', 'expired']),
              requestedBy: z.string(),
              approverId: z.union([z.string(), z.null()]).optional(),
              reason: z.string().optional(),
              requestedAt: z.string().datetime({ offset: true }),
              resolvedAt: z.union([z.string(), z.null()]).optional(),
              revealedPayload: z.object({}).partial().passthrough().optional(),
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
const RevealRequestCreate = z
  .object({ hitId: z.string().min(1), reason: z.string() })
  .passthrough();
const RevealRequestResponse = z
  .object({
    data: z
      .object({
        id: z.string().min(1),
        hitId: z.string().min(1),
        status: z.enum(['pending', 'approved', 'denied', 'expired']),
        requestedBy: z.string(),
        approverId: z.union([z.string(), z.null()]).optional(),
        reason: z.string().optional(),
        requestedAt: z.string().datetime({ offset: true }),
        resolvedAt: z.union([z.string(), z.null()]).optional(),
        revealedPayload: z.object({}).partial().passthrough().optional(),
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
const RevealDecision = z
  .object({
    decision: z.enum(['approve', 'deny']),
    note: z.string().optional(),
  })
  .passthrough();
const CaseNoteId = z.string();
const CaseNote = z
  .object({
    id: z.string().min(1),
    hitId: z.string().min(1),
    body: z.string(),
    authorId: z.string(),
    createdAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const CaseNoteListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().min(1),
          hitId: z.string().min(1),
          body: z.string(),
          authorId: z.string(),
          createdAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
  })
  .passthrough();
const CaseNoteListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().min(1),
              hitId: z.string().min(1),
              body: z.string(),
              authorId: z.string(),
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
const CaseNoteCreate = z
  .object({ hitId: z.string().min(1), body: z.string() })
  .passthrough();
const CaseNoteResponse = z
  .object({
    data: z
      .object({
        id: z.string().min(1),
        hitId: z.string().min(1),
        body: z.string(),
        authorId: z.string(),
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

export const schemas: any = {
  createRevealRequest_Body,
  decideRevealRequest_Body,
  createCaseNote_Body,
  Problem,
  MaskedHitId,
  MaskedHit,
  MaskedHitListData,
  ResponseMeta,
  MaskedHitListResponse,
  RevealRequestId,
  RevealRequest,
  RevealRequestListData,
  RevealRequestListResponse,
  RevealRequestCreate,
  RevealRequestResponse,
  RevealDecision,
  CaseNoteId,
  CaseNote,
  CaseNoteListData,
  CaseNoteListResponse,
  CaseNoteCreate,
  CaseNoteResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/investigation/case-notes',
    alias: 'listCaseNotes',
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
                  hitId: z.string().min(1),
                  body: z.string(),
                  authorId: z.string(),
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
    method: 'post',
    path: '/v1/investigation/case-notes',
    alias: 'createCaseNote',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createCaseNote_Body,
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
            id: z.string().min(1),
            hitId: z.string().min(1),
            body: z.string(),
            authorId: z.string(),
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
    ],
  },
  {
    method: 'get',
    path: '/v1/investigation/hits',
    alias: 'listMaskedHits',
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
                  ruleId: z.string(),
                  artefactId: z.string(),
                  maskedSubjectLabel: z.string(),
                  pharmacyMemberId: z.union([z.string(), z.null()]).optional(),
                  support: z.number(),
                  confidence: z.number(),
                  gatewayNonOpioidTag: z.boolean().optional().default(false),
                  priority: z.number().int().gte(0).optional(),
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
    path: '/v1/investigation/reveals',
    alias: 'listRevealRequests',
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
                  hitId: z.string().min(1),
                  status: z.enum(['pending', 'approved', 'denied', 'expired']),
                  requestedBy: z.string(),
                  approverId: z.union([z.string(), z.null()]).optional(),
                  reason: z.string().optional(),
                  requestedAt: z.string().datetime({ offset: true }),
                  resolvedAt: z.union([z.string(), z.null()]).optional(),
                  revealedPayload: z
                    .object({})
                    .partial()
                    .passthrough()
                    .optional(),
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
    method: 'post',
    path: '/v1/investigation/reveals',
    alias: 'createRevealRequest',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createRevealRequest_Body,
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
            id: z.string().min(1),
            hitId: z.string().min(1),
            status: z.enum(['pending', 'approved', 'denied', 'expired']),
            requestedBy: z.string(),
            approverId: z.union([z.string(), z.null()]).optional(),
            reason: z.string().optional(),
            requestedAt: z.string().datetime({ offset: true }),
            resolvedAt: z.union([z.string(), z.null()]).optional(),
            revealedPayload: z.object({}).partial().passthrough().optional(),
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
  {
    method: 'get',
    path: '/v1/investigation/reveals/:revealRequestId',
    alias: 'getRevealRequest',
    requestFormat: 'json',
    parameters: [
      {
        name: 'revealRequestId',
        type: 'Path',
        schema: z.string().min(1),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().min(1),
            hitId: z.string().min(1),
            status: z.enum(['pending', 'approved', 'denied', 'expired']),
            requestedBy: z.string(),
            approverId: z.union([z.string(), z.null()]).optional(),
            reason: z.string().optional(),
            requestedAt: z.string().datetime({ offset: true }),
            resolvedAt: z.union([z.string(), z.null()]).optional(),
            revealedPayload: z.object({}).partial().passthrough().optional(),
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
    path: '/v1/investigation/reveals/:revealRequestId/decide',
    alias: 'decideRevealRequest',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: decideRevealRequest_Body,
      },
      {
        name: 'revealRequestId',
        type: 'Path',
        schema: z.string().min(1),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().min(1),
            hitId: z.string().min(1),
            status: z.enum(['pending', 'approved', 'denied', 'expired']),
            requestedBy: z.string(),
            approverId: z.union([z.string(), z.null()]).optional(),
            reason: z.string().optional(),
            requestedAt: z.string().datetime({ offset: true }),
            resolvedAt: z.union([z.string(), z.null()]).optional(),
            revealedPayload: z.object({}).partial().passthrough().optional(),
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
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
