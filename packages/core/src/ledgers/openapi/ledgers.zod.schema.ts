import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const registerLedger_Body = z
  .object({
    name: z.string(),
    fabricType: z.string(),
    consensusHint: z.string().optional(),
    endpointRef: z.string().optional(),
  })
  .passthrough();
const addPharmacyMember_Body = z
  .object({ displayName: z.string(), externalSiteCode: z.string().optional() })
  .passthrough();
const anchorPrescriptionEvent_Body = z
  .object({
    pharmacyMemberId: z.string().min(1),
    contentHash: z.string(),
    drugClassHints: z.array(z.string()).optional(),
    occurredAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const freezePharmacyMember_Body = z
  .object({
    reason: z.string(),
    freezeAnchoring: z.boolean().optional().default(true),
    freezeScoring: z.boolean().optional().default(true),
    slaHours: z.number().int().gte(1).optional().default(24),
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
const LedgerId = z.string();
const LedgerNetwork = z
  .object({
    id: z.string().min(1),
    name: z.string(),
    fabricType: z.string(),
    permissioned: z.literal(true),
    consensusHint: z.string().optional(),
    status: z.enum(['active', 'suspended', 'retired']),
    createdAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const LedgerNetworkListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().min(1),
          name: z.string(),
          fabricType: z.string(),
          permissioned: z.literal(true),
          consensusHint: z.string().optional(),
          status: z.enum(['active', 'suspended', 'retired']),
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
const LedgerNetworkListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().min(1),
              name: z.string(),
              fabricType: z.string(),
              permissioned: z.literal(true),
              consensusHint: z.string().optional(),
              status: z.enum(['active', 'suspended', 'retired']),
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
const LedgerNetworkCreate = z
  .object({
    name: z.string(),
    fabricType: z.string(),
    consensusHint: z.string().optional(),
    endpointRef: z.string().optional(),
  })
  .passthrough();
const LedgerNetworkResponse = z
  .object({
    data: z
      .object({
        id: z.string().min(1),
        name: z.string(),
        fabricType: z.string(),
        permissioned: z.literal(true),
        consensusHint: z.string().optional(),
        status: z.enum(['active', 'suspended', 'retired']),
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
const MemberId = z.string();
const PharmacyMember = z
  .object({
    id: z.string().min(1),
    ledgerId: z.string().min(1),
    displayName: z.string(),
    externalSiteCode: z.string().optional(),
    status: z.enum(['pending', 'active', 'frozen', 'revoked']),
    frozenAt: z.union([z.string(), z.null()]).optional(),
  })
  .passthrough();
const PharmacyMemberListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().min(1),
          ledgerId: z.string().min(1),
          displayName: z.string(),
          externalSiteCode: z.string().optional(),
          status: z.enum(['pending', 'active', 'frozen', 'revoked']),
          frozenAt: z.union([z.string(), z.null()]).optional(),
        })
        .passthrough()
    ),
  })
  .passthrough();
const PharmacyMemberListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().min(1),
              ledgerId: z.string().min(1),
              displayName: z.string(),
              externalSiteCode: z.string().optional(),
              status: z.enum(['pending', 'active', 'frozen', 'revoked']),
              frozenAt: z.union([z.string(), z.null()]).optional(),
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
const PharmacyMemberCreate = z
  .object({ displayName: z.string(), externalSiteCode: z.string().optional() })
  .passthrough();
const PharmacyMemberResponse = z
  .object({
    data: z
      .object({
        id: z.string().min(1),
        ledgerId: z.string().min(1),
        displayName: z.string(),
        externalSiteCode: z.string().optional(),
        status: z.enum(['pending', 'active', 'frozen', 'revoked']),
        frozenAt: z.union([z.string(), z.null()]).optional(),
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
const EventRefId = z.string();
const PrescriptionEventRef = z
  .object({
    id: z.string().min(1),
    ledgerId: z.string().min(1),
    pharmacyMemberId: z.string().min(1),
    blockHeight: z.number().int().gte(0).optional(),
    txId: z.string().optional(),
    contentHash: z.string(),
    drugClassHints: z.array(z.string()).optional(),
    anchoredAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const PrescriptionEventRefListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().min(1),
          ledgerId: z.string().min(1),
          pharmacyMemberId: z.string().min(1),
          blockHeight: z.number().int().gte(0).optional(),
          txId: z.string().optional(),
          contentHash: z.string(),
          drugClassHints: z.array(z.string()).optional(),
          anchoredAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
  })
  .passthrough();
const PrescriptionEventRefListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().min(1),
              ledgerId: z.string().min(1),
              pharmacyMemberId: z.string().min(1),
              blockHeight: z.number().int().gte(0).optional(),
              txId: z.string().optional(),
              contentHash: z.string(),
              drugClassHints: z.array(z.string()).optional(),
              anchoredAt: z.string().datetime({ offset: true }),
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
const PrescriptionEventRefCreate = z
  .object({
    pharmacyMemberId: z.string().min(1),
    contentHash: z.string(),
    drugClassHints: z.array(z.string()).optional(),
    occurredAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const PrescriptionEventRefResponse = z
  .object({
    data: z
      .object({
        id: z.string().min(1),
        ledgerId: z.string().min(1),
        pharmacyMemberId: z.string().min(1),
        blockHeight: z.number().int().gte(0).optional(),
        txId: z.string().optional(),
        contentHash: z.string(),
        drugClassHints: z.array(z.string()).optional(),
        anchoredAt: z.string().datetime({ offset: true }),
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
const FreezeOrderCreate = z
  .object({
    reason: z.string(),
    freezeAnchoring: z.boolean().optional().default(true),
    freezeScoring: z.boolean().optional().default(true),
    slaHours: z.number().int().gte(1).optional().default(24),
  })
  .passthrough();
const FreezeOrderId = z.string();
const FreezeOrder = z
  .object({
    id: z.string().min(1),
    memberId: z.string().min(1),
    ledgerId: z.string().min(1),
    reason: z.string(),
    status: z.enum(['active', 'acknowledged', 'released']),
    issuedAt: z.string().datetime({ offset: true }),
    slaDeadline: z.string().datetime({ offset: true }),
    acknowledgedAt: z.union([z.string(), z.null()]).optional(),
    releasedAt: z.union([z.string(), z.null()]).optional(),
  })
  .passthrough();
const FreezeOrderResponse = z
  .object({
    data: z
      .object({
        id: z.string().min(1),
        memberId: z.string().min(1),
        ledgerId: z.string().min(1),
        reason: z.string(),
        status: z.enum(['active', 'acknowledged', 'released']),
        issuedAt: z.string().datetime({ offset: true }),
        slaDeadline: z.string().datetime({ offset: true }),
        acknowledgedAt: z.union([z.string(), z.null()]).optional(),
        releasedAt: z.union([z.string(), z.null()]).optional(),
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
const FreezeOrderListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().min(1),
          memberId: z.string().min(1),
          ledgerId: z.string().min(1),
          reason: z.string(),
          status: z.enum(['active', 'acknowledged', 'released']),
          issuedAt: z.string().datetime({ offset: true }),
          slaDeadline: z.string().datetime({ offset: true }),
          acknowledgedAt: z.union([z.string(), z.null()]).optional(),
          releasedAt: z.union([z.string(), z.null()]).optional(),
        })
        .passthrough()
    ),
  })
  .passthrough();
const FreezeOrderListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().min(1),
              memberId: z.string().min(1),
              ledgerId: z.string().min(1),
              reason: z.string(),
              status: z.enum(['active', 'acknowledged', 'released']),
              issuedAt: z.string().datetime({ offset: true }),
              slaDeadline: z.string().datetime({ offset: true }),
              acknowledgedAt: z.union([z.string(), z.null()]).optional(),
              releasedAt: z.union([z.string(), z.null()]).optional(),
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

export const schemas: any = {
  registerLedger_Body,
  addPharmacyMember_Body,
  anchorPrescriptionEvent_Body,
  freezePharmacyMember_Body,
  Problem,
  LedgerId,
  LedgerNetwork,
  LedgerNetworkListData,
  ResponseMeta,
  LedgerNetworkListResponse,
  LedgerNetworkCreate,
  LedgerNetworkResponse,
  MemberId,
  PharmacyMember,
  PharmacyMemberListData,
  PharmacyMemberListResponse,
  PharmacyMemberCreate,
  PharmacyMemberResponse,
  EventRefId,
  PrescriptionEventRef,
  PrescriptionEventRefListData,
  PrescriptionEventRefListResponse,
  PrescriptionEventRefCreate,
  PrescriptionEventRefResponse,
  FreezeOrderCreate,
  FreezeOrderId,
  FreezeOrder,
  FreezeOrderResponse,
  FreezeOrderListData,
  FreezeOrderListResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/freeze-orders',
    alias: 'listFreezeOrders',
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
                  memberId: z.string().min(1),
                  ledgerId: z.string().min(1),
                  reason: z.string(),
                  status: z.enum(['active', 'acknowledged', 'released']),
                  issuedAt: z.string().datetime({ offset: true }),
                  slaDeadline: z.string().datetime({ offset: true }),
                  acknowledgedAt: z.union([z.string(), z.null()]).optional(),
                  releasedAt: z.union([z.string(), z.null()]).optional(),
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
    path: '/v1/freeze-orders/:freezeOrderId/acknowledge',
    alias: 'acknowledgeFreezeOrder',
    requestFormat: 'json',
    parameters: [
      {
        name: 'freezeOrderId',
        type: 'Path',
        schema: z.string().min(1),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().min(1),
            memberId: z.string().min(1),
            ledgerId: z.string().min(1),
            reason: z.string(),
            status: z.enum(['active', 'acknowledged', 'released']),
            issuedAt: z.string().datetime({ offset: true }),
            slaDeadline: z.string().datetime({ offset: true }),
            acknowledgedAt: z.union([z.string(), z.null()]).optional(),
            releasedAt: z.union([z.string(), z.null()]).optional(),
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
    path: '/v1/freeze-orders/:freezeOrderId/release',
    alias: 'releaseFreezeOrder',
    requestFormat: 'json',
    parameters: [
      {
        name: 'freezeOrderId',
        type: 'Path',
        schema: z.string().min(1),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().min(1),
            memberId: z.string().min(1),
            ledgerId: z.string().min(1),
            reason: z.string(),
            status: z.enum(['active', 'acknowledged', 'released']),
            issuedAt: z.string().datetime({ offset: true }),
            slaDeadline: z.string().datetime({ offset: true }),
            acknowledgedAt: z.union([z.string(), z.null()]).optional(),
            releasedAt: z.union([z.string(), z.null()]).optional(),
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
    method: 'get',
    path: '/v1/ledgers',
    alias: 'listLedgers',
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
                  name: z.string(),
                  fabricType: z.string(),
                  permissioned: z.literal(true),
                  consensusHint: z.string().optional(),
                  status: z.enum(['active', 'suspended', 'retired']),
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
    path: '/v1/ledgers',
    alias: 'registerLedger',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: registerLedger_Body,
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
            name: z.string(),
            fabricType: z.string(),
            permissioned: z.literal(true),
            consensusHint: z.string().optional(),
            status: z.enum(['active', 'suspended', 'retired']),
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
    path: '/v1/ledgers/:ledgerId',
    alias: 'getLedger',
    requestFormat: 'json',
    parameters: [
      {
        name: 'ledgerId',
        type: 'Path',
        schema: z.string().min(1),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().min(1),
            name: z.string(),
            fabricType: z.string(),
            permissioned: z.literal(true),
            consensusHint: z.string().optional(),
            status: z.enum(['active', 'suspended', 'retired']),
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
    method: 'get',
    path: '/v1/ledgers/:ledgerId/events',
    alias: 'listPrescriptionEventRefs',
    requestFormat: 'json',
    parameters: [
      {
        name: 'ledgerId',
        type: 'Path',
        schema: z.string().min(1),
      },
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
                  ledgerId: z.string().min(1),
                  pharmacyMemberId: z.string().min(1),
                  blockHeight: z.number().int().gte(0).optional(),
                  txId: z.string().optional(),
                  contentHash: z.string(),
                  drugClassHints: z.array(z.string()).optional(),
                  anchoredAt: z.string().datetime({ offset: true }),
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
    path: '/v1/ledgers/:ledgerId/events',
    alias: 'anchorPrescriptionEvent',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: anchorPrescriptionEvent_Body,
      },
      {
        name: 'ledgerId',
        type: 'Path',
        schema: z.string().min(1),
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
            ledgerId: z.string().min(1),
            pharmacyMemberId: z.string().min(1),
            blockHeight: z.number().int().gte(0).optional(),
            txId: z.string().optional(),
            contentHash: z.string(),
            drugClassHints: z.array(z.string()).optional(),
            anchoredAt: z.string().datetime({ offset: true }),
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
    method: 'get',
    path: '/v1/ledgers/:ledgerId/members',
    alias: 'listPharmacyMembers',
    requestFormat: 'json',
    parameters: [
      {
        name: 'ledgerId',
        type: 'Path',
        schema: z.string().min(1),
      },
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
                  ledgerId: z.string().min(1),
                  displayName: z.string(),
                  externalSiteCode: z.string().optional(),
                  status: z.enum(['pending', 'active', 'frozen', 'revoked']),
                  frozenAt: z.union([z.string(), z.null()]).optional(),
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
    path: '/v1/ledgers/:ledgerId/members',
    alias: 'addPharmacyMember',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: addPharmacyMember_Body,
      },
      {
        name: 'ledgerId',
        type: 'Path',
        schema: z.string().min(1),
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
            ledgerId: z.string().min(1),
            displayName: z.string(),
            externalSiteCode: z.string().optional(),
            status: z.enum(['pending', 'active', 'frozen', 'revoked']),
            frozenAt: z.union([z.string(), z.null()]).optional(),
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
    path: '/v1/members/:memberId/freeze',
    alias: 'freezePharmacyMember',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: freezePharmacyMember_Body,
      },
      {
        name: 'memberId',
        type: 'Path',
        schema: z.string().min(1),
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
            memberId: z.string().min(1),
            ledgerId: z.string().min(1),
            reason: z.string(),
            status: z.enum(['active', 'acknowledged', 'released']),
            issuedAt: z.string().datetime({ offset: true }),
            slaDeadline: z.string().datetime({ offset: true }),
            acknowledgedAt: z.union([z.string(), z.null()]).optional(),
            releasedAt: z.union([z.string(), z.null()]).optional(),
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
