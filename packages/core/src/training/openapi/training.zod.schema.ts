import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createTrainingJob_Body = z
  .object({
    ledgerId: z.string(),
    executionMode: z.enum(['serverBatch', 'streaming']),
    lifecycleStep: z.enum([
      'modelInitialization',
      'modelTraining',
      'modelValidation',
      'modelScoring',
      'modelEvaluation',
      'modelSerialization',
      'modelCleanup',
    ]),
    algorithm: z.enum(['associationRuleMining', 'riskScore', 'custom']),
    armThresholds: z
      .object({
        minSupport: z.number().gte(0).lte(1).default(0.2),
        minConfidence: z.number().gte(0).lte(1).default(0.7),
        maxItems: z.number().int().gte(1).lte(10).default(3),
      })
      .passthrough()
      .optional(),
    ledgerWindow: z
      .object({
        ledgerId: z.string(),
        fromBlock: z.number().int().gte(0).optional(),
        toBlock: z.number().int().gte(0).optional(),
        fromTime: z.string().datetime({ offset: true }).optional(),
        toTime: z.string().datetime({ offset: true }).optional(),
      })
      .passthrough()
      .optional(),
    triggerId: z.string().optional(),
    thresholdPolicyId: z.string().optional(),
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
const JobId = z.string();
const ExecutionMode = z.enum(['serverBatch', 'streaming']);
const LifecycleStep = z.enum([
  'modelInitialization',
  'modelTraining',
  'modelValidation',
  'modelScoring',
  'modelEvaluation',
  'modelSerialization',
  'modelCleanup',
]);
const ArmThresholds = z
  .object({
    minSupport: z.number().gte(0).lte(1).default(0.2),
    minConfidence: z.number().gte(0).lte(1).default(0.7),
    maxItems: z.number().int().gte(1).lte(10).default(3),
  })
  .passthrough();
const LedgerWindow = z
  .object({
    ledgerId: z.string(),
    fromBlock: z.number().int().gte(0).optional(),
    toBlock: z.number().int().gte(0).optional(),
    fromTime: z.string().datetime({ offset: true }).optional(),
    toTime: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const JobStatus = z.enum([
  'queued',
  'running',
  'succeeded',
  'failed',
  'cancelled',
]);
const TrainingJob = z
  .object({
    id: z.string().min(1),
    ledgerId: z.string(),
    executionMode: z.enum(['serverBatch', 'streaming']),
    lifecycleStep: z.enum([
      'modelInitialization',
      'modelTraining',
      'modelValidation',
      'modelScoring',
      'modelEvaluation',
      'modelSerialization',
      'modelCleanup',
    ]),
    algorithm: z
      .enum(['associationRuleMining', 'riskScore', 'custom'])
      .optional(),
    armThresholds: z
      .object({
        minSupport: z.number().gte(0).lte(1).default(0.2),
        minConfidence: z.number().gte(0).lte(1).default(0.7),
        maxItems: z.number().int().gte(1).lte(10).default(3),
      })
      .passthrough()
      .optional(),
    ledgerWindow: z
      .object({
        ledgerId: z.string(),
        fromBlock: z.number().int().gte(0).optional(),
        toBlock: z.number().int().gte(0).optional(),
        fromTime: z.string().datetime({ offset: true }).optional(),
        toTime: z.string().datetime({ offset: true }).optional(),
      })
      .passthrough()
      .optional(),
    triggerId: z.union([z.string(), z.null()]).optional(),
    thresholdPolicyId: z.union([z.string(), z.null()]).optional(),
    status: z.enum(['queued', 'running', 'succeeded', 'failed', 'cancelled']),
    artefactId: z.union([z.string(), z.null()]).optional(),
    errorDetail: z.union([z.string(), z.null()]).optional(),
    createdAt: z.string().datetime({ offset: true }),
    completedAt: z.union([z.string(), z.null()]).optional(),
  })
  .passthrough();
const TrainingJobListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().min(1),
          ledgerId: z.string(),
          executionMode: z.enum(['serverBatch', 'streaming']),
          lifecycleStep: z.enum([
            'modelInitialization',
            'modelTraining',
            'modelValidation',
            'modelScoring',
            'modelEvaluation',
            'modelSerialization',
            'modelCleanup',
          ]),
          algorithm: z
            .enum(['associationRuleMining', 'riskScore', 'custom'])
            .optional(),
          armThresholds: z
            .object({
              minSupport: z.number().gte(0).lte(1).default(0.2),
              minConfidence: z.number().gte(0).lte(1).default(0.7),
              maxItems: z.number().int().gte(1).lte(10).default(3),
            })
            .passthrough()
            .optional(),
          ledgerWindow: z
            .object({
              ledgerId: z.string(),
              fromBlock: z.number().int().gte(0).optional(),
              toBlock: z.number().int().gte(0).optional(),
              fromTime: z.string().datetime({ offset: true }).optional(),
              toTime: z.string().datetime({ offset: true }).optional(),
            })
            .passthrough()
            .optional(),
          triggerId: z.union([z.string(), z.null()]).optional(),
          thresholdPolicyId: z.union([z.string(), z.null()]).optional(),
          status: z.enum([
            'queued',
            'running',
            'succeeded',
            'failed',
            'cancelled',
          ]),
          artefactId: z.union([z.string(), z.null()]).optional(),
          errorDetail: z.union([z.string(), z.null()]).optional(),
          createdAt: z.string().datetime({ offset: true }),
          completedAt: z.union([z.string(), z.null()]).optional(),
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
const TrainingJobListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().min(1),
              ledgerId: z.string(),
              executionMode: z.enum(['serverBatch', 'streaming']),
              lifecycleStep: z.enum([
                'modelInitialization',
                'modelTraining',
                'modelValidation',
                'modelScoring',
                'modelEvaluation',
                'modelSerialization',
                'modelCleanup',
              ]),
              algorithm: z
                .enum(['associationRuleMining', 'riskScore', 'custom'])
                .optional(),
              armThresholds: z
                .object({
                  minSupport: z.number().gte(0).lte(1).default(0.2),
                  minConfidence: z.number().gte(0).lte(1).default(0.7),
                  maxItems: z.number().int().gte(1).lte(10).default(3),
                })
                .passthrough()
                .optional(),
              ledgerWindow: z
                .object({
                  ledgerId: z.string(),
                  fromBlock: z.number().int().gte(0).optional(),
                  toBlock: z.number().int().gte(0).optional(),
                  fromTime: z.string().datetime({ offset: true }).optional(),
                  toTime: z.string().datetime({ offset: true }).optional(),
                })
                .passthrough()
                .optional(),
              triggerId: z.union([z.string(), z.null()]).optional(),
              thresholdPolicyId: z.union([z.string(), z.null()]).optional(),
              status: z.enum([
                'queued',
                'running',
                'succeeded',
                'failed',
                'cancelled',
              ]),
              artefactId: z.union([z.string(), z.null()]).optional(),
              errorDetail: z.union([z.string(), z.null()]).optional(),
              createdAt: z.string().datetime({ offset: true }),
              completedAt: z.union([z.string(), z.null()]).optional(),
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
const TrainingJobCreate = z
  .object({
    ledgerId: z.string(),
    executionMode: z.enum(['serverBatch', 'streaming']),
    lifecycleStep: z.enum([
      'modelInitialization',
      'modelTraining',
      'modelValidation',
      'modelScoring',
      'modelEvaluation',
      'modelSerialization',
      'modelCleanup',
    ]),
    algorithm: z.enum(['associationRuleMining', 'riskScore', 'custom']),
    armThresholds: z
      .object({
        minSupport: z.number().gte(0).lte(1).default(0.2),
        minConfidence: z.number().gte(0).lte(1).default(0.7),
        maxItems: z.number().int().gte(1).lte(10).default(3),
      })
      .passthrough()
      .optional(),
    ledgerWindow: z
      .object({
        ledgerId: z.string(),
        fromBlock: z.number().int().gte(0).optional(),
        toBlock: z.number().int().gte(0).optional(),
        fromTime: z.string().datetime({ offset: true }).optional(),
        toTime: z.string().datetime({ offset: true }).optional(),
      })
      .passthrough()
      .optional(),
    triggerId: z.string().optional(),
    thresholdPolicyId: z.string().optional(),
  })
  .passthrough();
const TrainingJobResponse = z
  .object({
    data: z
      .object({
        id: z.string().min(1),
        ledgerId: z.string(),
        executionMode: z.enum(['serverBatch', 'streaming']),
        lifecycleStep: z.enum([
          'modelInitialization',
          'modelTraining',
          'modelValidation',
          'modelScoring',
          'modelEvaluation',
          'modelSerialization',
          'modelCleanup',
        ]),
        algorithm: z
          .enum(['associationRuleMining', 'riskScore', 'custom'])
          .optional(),
        armThresholds: z
          .object({
            minSupport: z.number().gte(0).lte(1).default(0.2),
            minConfidence: z.number().gte(0).lte(1).default(0.7),
            maxItems: z.number().int().gte(1).lte(10).default(3),
          })
          .passthrough()
          .optional(),
        ledgerWindow: z
          .object({
            ledgerId: z.string(),
            fromBlock: z.number().int().gte(0).optional(),
            toBlock: z.number().int().gte(0).optional(),
            fromTime: z.string().datetime({ offset: true }).optional(),
            toTime: z.string().datetime({ offset: true }).optional(),
          })
          .passthrough()
          .optional(),
        triggerId: z.union([z.string(), z.null()]).optional(),
        thresholdPolicyId: z.union([z.string(), z.null()]).optional(),
        status: z.enum([
          'queued',
          'running',
          'succeeded',
          'failed',
          'cancelled',
        ]),
        artefactId: z.union([z.string(), z.null()]).optional(),
        errorDetail: z.union([z.string(), z.null()]).optional(),
        createdAt: z.string().datetime({ offset: true }),
        completedAt: z.union([z.string(), z.null()]).optional(),
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
  createTrainingJob_Body,
  Problem,
  JobId,
  ExecutionMode,
  LifecycleStep,
  ArmThresholds,
  LedgerWindow,
  JobStatus,
  TrainingJob,
  TrainingJobListData,
  ResponseMeta,
  TrainingJobListResponse,
  TrainingJobCreate,
  TrainingJobResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/training-jobs',
    alias: 'listTrainingJobs',
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
                  executionMode: z.enum(['serverBatch', 'streaming']),
                  lifecycleStep: z.enum([
                    'modelInitialization',
                    'modelTraining',
                    'modelValidation',
                    'modelScoring',
                    'modelEvaluation',
                    'modelSerialization',
                    'modelCleanup',
                  ]),
                  algorithm: z
                    .enum(['associationRuleMining', 'riskScore', 'custom'])
                    .optional(),
                  armThresholds: z
                    .object({
                      minSupport: z.number().gte(0).lte(1).default(0.2),
                      minConfidence: z.number().gte(0).lte(1).default(0.7),
                      maxItems: z.number().int().gte(1).lte(10).default(3),
                    })
                    .passthrough()
                    .optional(),
                  ledgerWindow: z
                    .object({
                      ledgerId: z.string(),
                      fromBlock: z.number().int().gte(0).optional(),
                      toBlock: z.number().int().gte(0).optional(),
                      fromTime: z
                        .string()
                        .datetime({ offset: true })
                        .optional(),
                      toTime: z.string().datetime({ offset: true }).optional(),
                    })
                    .passthrough()
                    .optional(),
                  triggerId: z.union([z.string(), z.null()]).optional(),
                  thresholdPolicyId: z.union([z.string(), z.null()]).optional(),
                  status: z.enum([
                    'queued',
                    'running',
                    'succeeded',
                    'failed',
                    'cancelled',
                  ]),
                  artefactId: z.union([z.string(), z.null()]).optional(),
                  errorDetail: z.union([z.string(), z.null()]).optional(),
                  createdAt: z.string().datetime({ offset: true }),
                  completedAt: z.union([z.string(), z.null()]).optional(),
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
    path: '/v1/training-jobs',
    alias: 'createTrainingJob',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createTrainingJob_Body,
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
            executionMode: z.enum(['serverBatch', 'streaming']),
            lifecycleStep: z.enum([
              'modelInitialization',
              'modelTraining',
              'modelValidation',
              'modelScoring',
              'modelEvaluation',
              'modelSerialization',
              'modelCleanup',
            ]),
            algorithm: z
              .enum(['associationRuleMining', 'riskScore', 'custom'])
              .optional(),
            armThresholds: z
              .object({
                minSupport: z.number().gte(0).lte(1).default(0.2),
                minConfidence: z.number().gte(0).lte(1).default(0.7),
                maxItems: z.number().int().gte(1).lte(10).default(3),
              })
              .passthrough()
              .optional(),
            ledgerWindow: z
              .object({
                ledgerId: z.string(),
                fromBlock: z.number().int().gte(0).optional(),
                toBlock: z.number().int().gte(0).optional(),
                fromTime: z.string().datetime({ offset: true }).optional(),
                toTime: z.string().datetime({ offset: true }).optional(),
              })
              .passthrough()
              .optional(),
            triggerId: z.union([z.string(), z.null()]).optional(),
            thresholdPolicyId: z.union([z.string(), z.null()]).optional(),
            status: z.enum([
              'queued',
              'running',
              'succeeded',
              'failed',
              'cancelled',
            ]),
            artefactId: z.union([z.string(), z.null()]).optional(),
            errorDetail: z.union([z.string(), z.null()]).optional(),
            createdAt: z.string().datetime({ offset: true }),
            completedAt: z.union([z.string(), z.null()]).optional(),
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
    path: '/v1/training-jobs/:jobId',
    alias: 'getTrainingJob',
    requestFormat: 'json',
    parameters: [
      {
        name: 'jobId',
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
            executionMode: z.enum(['serverBatch', 'streaming']),
            lifecycleStep: z.enum([
              'modelInitialization',
              'modelTraining',
              'modelValidation',
              'modelScoring',
              'modelEvaluation',
              'modelSerialization',
              'modelCleanup',
            ]),
            algorithm: z
              .enum(['associationRuleMining', 'riskScore', 'custom'])
              .optional(),
            armThresholds: z
              .object({
                minSupport: z.number().gte(0).lte(1).default(0.2),
                minConfidence: z.number().gte(0).lte(1).default(0.7),
                maxItems: z.number().int().gte(1).lte(10).default(3),
              })
              .passthrough()
              .optional(),
            ledgerWindow: z
              .object({
                ledgerId: z.string(),
                fromBlock: z.number().int().gte(0).optional(),
                toBlock: z.number().int().gte(0).optional(),
                fromTime: z.string().datetime({ offset: true }).optional(),
                toTime: z.string().datetime({ offset: true }).optional(),
              })
              .passthrough()
              .optional(),
            triggerId: z.union([z.string(), z.null()]).optional(),
            thresholdPolicyId: z.union([z.string(), z.null()]).optional(),
            status: z.enum([
              'queued',
              'running',
              'succeeded',
              'failed',
              'cancelled',
            ]),
            artefactId: z.union([z.string(), z.null()]).optional(),
            errorDetail: z.union([z.string(), z.null()]).optional(),
            createdAt: z.string().datetime({ offset: true }),
            completedAt: z.union([z.string(), z.null()]).optional(),
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
    path: '/v1/training-jobs/:jobId/cancel',
    alias: 'cancelTrainingJob',
    requestFormat: 'json',
    parameters: [
      {
        name: 'jobId',
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
            executionMode: z.enum(['serverBatch', 'streaming']),
            lifecycleStep: z.enum([
              'modelInitialization',
              'modelTraining',
              'modelValidation',
              'modelScoring',
              'modelEvaluation',
              'modelSerialization',
              'modelCleanup',
            ]),
            algorithm: z
              .enum(['associationRuleMining', 'riskScore', 'custom'])
              .optional(),
            armThresholds: z
              .object({
                minSupport: z.number().gte(0).lte(1).default(0.2),
                minConfidence: z.number().gte(0).lte(1).default(0.7),
                maxItems: z.number().int().gte(1).lte(10).default(3),
              })
              .passthrough()
              .optional(),
            ledgerWindow: z
              .object({
                ledgerId: z.string(),
                fromBlock: z.number().int().gte(0).optional(),
                toBlock: z.number().int().gte(0).optional(),
                fromTime: z.string().datetime({ offset: true }).optional(),
                toTime: z.string().datetime({ offset: true }).optional(),
              })
              .passthrough()
              .optional(),
            triggerId: z.union([z.string(), z.null()]).optional(),
            thresholdPolicyId: z.union([z.string(), z.null()]).optional(),
            status: z.enum([
              'queued',
              'running',
              'succeeded',
              'failed',
              'cancelled',
            ]),
            artefactId: z.union([z.string(), z.null()]).optional(),
            errorDetail: z.union([z.string(), z.null()]).optional(),
            createdAt: z.string().datetime({ offset: true }),
            completedAt: z.union([z.string(), z.null()]).optional(),
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
