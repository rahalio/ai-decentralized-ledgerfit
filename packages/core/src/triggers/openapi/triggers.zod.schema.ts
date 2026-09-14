import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createSmartContractTrigger_Body = z
  .object({
    ledgerId: z.string(),
    name: z.string(),
    condition: z.enum([
      'newBlocksThreshold',
      'scheduleCron',
      'policyManual',
      'evaluationDrift',
    ]),
    lifecycleStep: z.enum([
      'modelInitialization',
      'modelTraining',
      'modelValidation',
      'modelScoring',
      'modelEvaluation',
      'modelSerialization',
      'modelCleanup',
    ]),
    executionMode: z.enum(['serverBatch', 'streaming']),
    algorithm: z.string(),
    armThresholds: z
      .object({
        minSupport: z.number(),
        minConfidence: z.number(),
        maxItems: z.number().int(),
      })
      .passthrough()
      .optional(),
    newBlocksThreshold: z.number().int().gte(1).optional(),
    cronExpression: z.string().optional(),
    enabled: z.boolean().optional().default(true),
  })
  .passthrough();
const updateSmartContractTrigger_Body = z
  .object({
    name: z.string(),
    enabled: z.boolean(),
    newBlocksThreshold: z.number().int().gte(1),
    cronExpression: z.string(),
    armThresholds: z
      .object({
        minSupport: z.number(),
        minConfidence: z.number(),
        maxItems: z.number().int(),
      })
      .passthrough(),
  })
  .partial()
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
const TriggerId = z.string();
const TriggerCondition = z.enum([
  'newBlocksThreshold',
  'scheduleCron',
  'policyManual',
  'evaluationDrift',
]);
const LifecycleStep = z.enum([
  'modelInitialization',
  'modelTraining',
  'modelValidation',
  'modelScoring',
  'modelEvaluation',
  'modelSerialization',
  'modelCleanup',
]);
const ExecutionMode = z.enum(['serverBatch', 'streaming']);
const ArmThresholds = z
  .object({
    minSupport: z.number(),
    minConfidence: z.number(),
    maxItems: z.number().int(),
  })
  .passthrough();
const SmartContractTrigger = z
  .object({
    id: z.string().min(1),
    ledgerId: z.string(),
    name: z.string(),
    condition: z.enum([
      'newBlocksThreshold',
      'scheduleCron',
      'policyManual',
      'evaluationDrift',
    ]),
    lifecycleStep: z.enum([
      'modelInitialization',
      'modelTraining',
      'modelValidation',
      'modelScoring',
      'modelEvaluation',
      'modelSerialization',
      'modelCleanup',
    ]),
    executionMode: z.enum(['serverBatch', 'streaming']).optional(),
    algorithm: z.string().optional(),
    armThresholds: z
      .object({
        minSupport: z.number(),
        minConfidence: z.number(),
        maxItems: z.number().int(),
      })
      .passthrough()
      .optional(),
    newBlocksThreshold: z.number().int().gte(1).optional(),
    cronExpression: z.string().optional(),
    enabled: z.boolean(),
    createdAt: z.string().datetime({ offset: true }),
    lastFiredAt: z.union([z.string(), z.null()]).optional(),
  })
  .passthrough();
const SmartContractTriggerListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().min(1),
          ledgerId: z.string(),
          name: z.string(),
          condition: z.enum([
            'newBlocksThreshold',
            'scheduleCron',
            'policyManual',
            'evaluationDrift',
          ]),
          lifecycleStep: z.enum([
            'modelInitialization',
            'modelTraining',
            'modelValidation',
            'modelScoring',
            'modelEvaluation',
            'modelSerialization',
            'modelCleanup',
          ]),
          executionMode: z.enum(['serverBatch', 'streaming']).optional(),
          algorithm: z.string().optional(),
          armThresholds: z
            .object({
              minSupport: z.number(),
              minConfidence: z.number(),
              maxItems: z.number().int(),
            })
            .passthrough()
            .optional(),
          newBlocksThreshold: z.number().int().gte(1).optional(),
          cronExpression: z.string().optional(),
          enabled: z.boolean(),
          createdAt: z.string().datetime({ offset: true }),
          lastFiredAt: z.union([z.string(), z.null()]).optional(),
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
const SmartContractTriggerListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().min(1),
              ledgerId: z.string(),
              name: z.string(),
              condition: z.enum([
                'newBlocksThreshold',
                'scheduleCron',
                'policyManual',
                'evaluationDrift',
              ]),
              lifecycleStep: z.enum([
                'modelInitialization',
                'modelTraining',
                'modelValidation',
                'modelScoring',
                'modelEvaluation',
                'modelSerialization',
                'modelCleanup',
              ]),
              executionMode: z.enum(['serverBatch', 'streaming']).optional(),
              algorithm: z.string().optional(),
              armThresholds: z
                .object({
                  minSupport: z.number(),
                  minConfidence: z.number(),
                  maxItems: z.number().int(),
                })
                .passthrough()
                .optional(),
              newBlocksThreshold: z.number().int().gte(1).optional(),
              cronExpression: z.string().optional(),
              enabled: z.boolean(),
              createdAt: z.string().datetime({ offset: true }),
              lastFiredAt: z.union([z.string(), z.null()]).optional(),
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
const SmartContractTriggerCreate = z
  .object({
    ledgerId: z.string(),
    name: z.string(),
    condition: z.enum([
      'newBlocksThreshold',
      'scheduleCron',
      'policyManual',
      'evaluationDrift',
    ]),
    lifecycleStep: z.enum([
      'modelInitialization',
      'modelTraining',
      'modelValidation',
      'modelScoring',
      'modelEvaluation',
      'modelSerialization',
      'modelCleanup',
    ]),
    executionMode: z.enum(['serverBatch', 'streaming']),
    algorithm: z.string(),
    armThresholds: z
      .object({
        minSupport: z.number(),
        minConfidence: z.number(),
        maxItems: z.number().int(),
      })
      .passthrough()
      .optional(),
    newBlocksThreshold: z.number().int().gte(1).optional(),
    cronExpression: z.string().optional(),
    enabled: z.boolean().optional().default(true),
  })
  .passthrough();
const SmartContractTriggerResponse = z
  .object({
    data: z
      .object({
        id: z.string().min(1),
        ledgerId: z.string(),
        name: z.string(),
        condition: z.enum([
          'newBlocksThreshold',
          'scheduleCron',
          'policyManual',
          'evaluationDrift',
        ]),
        lifecycleStep: z.enum([
          'modelInitialization',
          'modelTraining',
          'modelValidation',
          'modelScoring',
          'modelEvaluation',
          'modelSerialization',
          'modelCleanup',
        ]),
        executionMode: z.enum(['serverBatch', 'streaming']).optional(),
        algorithm: z.string().optional(),
        armThresholds: z
          .object({
            minSupport: z.number(),
            minConfidence: z.number(),
            maxItems: z.number().int(),
          })
          .passthrough()
          .optional(),
        newBlocksThreshold: z.number().int().gte(1).optional(),
        cronExpression: z.string().optional(),
        enabled: z.boolean(),
        createdAt: z.string().datetime({ offset: true }),
        lastFiredAt: z.union([z.string(), z.null()]).optional(),
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
const SmartContractTriggerUpdate = z
  .object({
    name: z.string(),
    enabled: z.boolean(),
    newBlocksThreshold: z.number().int().gte(1),
    cronExpression: z.string(),
    armThresholds: z
      .object({
        minSupport: z.number(),
        minConfidence: z.number(),
        maxItems: z.number().int(),
      })
      .passthrough(),
  })
  .partial()
  .passthrough();
const TriggerFireResult = z
  .object({
    triggerId: z.string().min(1),
    jobId: z.string(),
    firedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const TriggerFireResultResponse = z
  .object({
    data: z
      .object({
        triggerId: z.string().min(1),
        jobId: z.string(),
        firedAt: z.string().datetime({ offset: true }),
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
  createSmartContractTrigger_Body,
  updateSmartContractTrigger_Body,
  Problem,
  TriggerId,
  TriggerCondition,
  LifecycleStep,
  ExecutionMode,
  ArmThresholds,
  SmartContractTrigger,
  SmartContractTriggerListData,
  ResponseMeta,
  SmartContractTriggerListResponse,
  SmartContractTriggerCreate,
  SmartContractTriggerResponse,
  SmartContractTriggerUpdate,
  TriggerFireResult,
  TriggerFireResultResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/smart-contract-triggers',
    alias: 'listSmartContractTriggers',
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
                  ledgerId: z.string(),
                  name: z.string(),
                  condition: z.enum([
                    'newBlocksThreshold',
                    'scheduleCron',
                    'policyManual',
                    'evaluationDrift',
                  ]),
                  lifecycleStep: z.enum([
                    'modelInitialization',
                    'modelTraining',
                    'modelValidation',
                    'modelScoring',
                    'modelEvaluation',
                    'modelSerialization',
                    'modelCleanup',
                  ]),
                  executionMode: z
                    .enum(['serverBatch', 'streaming'])
                    .optional(),
                  algorithm: z.string().optional(),
                  armThresholds: z
                    .object({
                      minSupport: z.number(),
                      minConfidence: z.number(),
                      maxItems: z.number().int(),
                    })
                    .passthrough()
                    .optional(),
                  newBlocksThreshold: z.number().int().gte(1).optional(),
                  cronExpression: z.string().optional(),
                  enabled: z.boolean(),
                  createdAt: z.string().datetime({ offset: true }),
                  lastFiredAt: z.union([z.string(), z.null()]).optional(),
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
    path: '/v1/smart-contract-triggers',
    alias: 'createSmartContractTrigger',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createSmartContractTrigger_Body,
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
            ledgerId: z.string(),
            name: z.string(),
            condition: z.enum([
              'newBlocksThreshold',
              'scheduleCron',
              'policyManual',
              'evaluationDrift',
            ]),
            lifecycleStep: z.enum([
              'modelInitialization',
              'modelTraining',
              'modelValidation',
              'modelScoring',
              'modelEvaluation',
              'modelSerialization',
              'modelCleanup',
            ]),
            executionMode: z.enum(['serverBatch', 'streaming']).optional(),
            algorithm: z.string().optional(),
            armThresholds: z
              .object({
                minSupport: z.number(),
                minConfidence: z.number(),
                maxItems: z.number().int(),
              })
              .passthrough()
              .optional(),
            newBlocksThreshold: z.number().int().gte(1).optional(),
            cronExpression: z.string().optional(),
            enabled: z.boolean(),
            createdAt: z.string().datetime({ offset: true }),
            lastFiredAt: z.union([z.string(), z.null()]).optional(),
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
    path: '/v1/smart-contract-triggers/:triggerId',
    alias: 'getSmartContractTrigger',
    requestFormat: 'json',
    parameters: [
      {
        name: 'triggerId',
        type: 'Path',
        schema: z.string().min(1),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().min(1),
            ledgerId: z.string(),
            name: z.string(),
            condition: z.enum([
              'newBlocksThreshold',
              'scheduleCron',
              'policyManual',
              'evaluationDrift',
            ]),
            lifecycleStep: z.enum([
              'modelInitialization',
              'modelTraining',
              'modelValidation',
              'modelScoring',
              'modelEvaluation',
              'modelSerialization',
              'modelCleanup',
            ]),
            executionMode: z.enum(['serverBatch', 'streaming']).optional(),
            algorithm: z.string().optional(),
            armThresholds: z
              .object({
                minSupport: z.number(),
                minConfidence: z.number(),
                maxItems: z.number().int(),
              })
              .passthrough()
              .optional(),
            newBlocksThreshold: z.number().int().gte(1).optional(),
            cronExpression: z.string().optional(),
            enabled: z.boolean(),
            createdAt: z.string().datetime({ offset: true }),
            lastFiredAt: z.union([z.string(), z.null()]).optional(),
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
    method: 'patch',
    path: '/v1/smart-contract-triggers/:triggerId',
    alias: 'updateSmartContractTrigger',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: updateSmartContractTrigger_Body,
      },
      {
        name: 'triggerId',
        type: 'Path',
        schema: z.string().min(1),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().min(1),
            ledgerId: z.string(),
            name: z.string(),
            condition: z.enum([
              'newBlocksThreshold',
              'scheduleCron',
              'policyManual',
              'evaluationDrift',
            ]),
            lifecycleStep: z.enum([
              'modelInitialization',
              'modelTraining',
              'modelValidation',
              'modelScoring',
              'modelEvaluation',
              'modelSerialization',
              'modelCleanup',
            ]),
            executionMode: z.enum(['serverBatch', 'streaming']).optional(),
            algorithm: z.string().optional(),
            armThresholds: z
              .object({
                minSupport: z.number(),
                minConfidence: z.number(),
                maxItems: z.number().int(),
              })
              .passthrough()
              .optional(),
            newBlocksThreshold: z.number().int().gte(1).optional(),
            cronExpression: z.string().optional(),
            enabled: z.boolean(),
            createdAt: z.string().datetime({ offset: true }),
            lastFiredAt: z.union([z.string(), z.null()]).optional(),
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
    path: '/v1/smart-contract-triggers/:triggerId/fire',
    alias: 'fireSmartContractTrigger',
    requestFormat: 'json',
    parameters: [
      {
        name: 'triggerId',
        type: 'Path',
        schema: z.string().min(1),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            triggerId: z.string().min(1),
            jobId: z.string(),
            firedAt: z.string().datetime({ offset: true }),
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
