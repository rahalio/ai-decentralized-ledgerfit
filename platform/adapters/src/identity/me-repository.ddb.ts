/**
 * MeRepository — sandbox current operator session (API-key or user).
 */

import type { MeRepository } from '@ledgerfit/services/identity';
import {
  getOrCreateTenantProfile,
  nowIso,
  responseMeta,
  usersById,
  type SandboxUser,
} from '../_shared/sandbox-store.js';

function resolveTenantId(raw: Record<string, unknown>): string {
  const orgId = String(raw.orgId ?? 'tnt_demo');
  return !orgId || orgId === 'system' ? 'tnt_demo' : orgId;
}

function syntheticApiKeyOperator() {
  return {
    userId: 'usr_api_key_demo',
    email: 'api-key@demo.local',
    displayName: 'Demo API key',
    role: 'admin' as const,
  };
}

function toSessionOperator(user: SandboxUser) {
  return {
    userId: user.userId,
    email: user.email,
    displayName: user.displayName,
    role: user.role,
  };
}

function tenantSummary(tenantId: string) {
  const profile = getOrCreateTenantProfile(tenantId);
  return {
    tenantId,
    displayNameEn: profile.displayNameEn,
    displayNameAr: profile.displayNameAr,
  };
}

export class MeRepositoryDdb implements MeRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async getOperatorMe(
    input: Parameters<MeRepository['getOperatorMe']>[0]
  ): Promise<Awaited<ReturnType<MeRepository['getOperatorMe']>>> {
    const raw = input as Record<string, unknown>;
    const tenantId = resolveTenantId(raw);
    const correlationId = String(raw.correlationId ?? '');
    const userId = raw.userId ? String(raw.userId) : '';

    if (!userId || userId === 'usr_api_key_demo') {
      return {
        data: {
          operator: syntheticApiKeyOperator(),
          tenant: tenantSummary(tenantId),
        },
        ...responseMeta(correlationId),
      };
    }

    const user = usersById.get(userId);
    if (!user || user.tenantId !== tenantId) {
      const err = new Error('Operator session not found') as Error & {
        statusCode?: number;
      };
      err.statusCode = 401;
      throw err;
    }

    return {
      data: {
        operator: toSessionOperator(user),
        tenant: tenantSummary(tenantId),
      },
      ...responseMeta(correlationId),
    };
  }

  async updateOperatorMe(
    input: Parameters<MeRepository['updateOperatorMe']>[0]
  ): Promise<Awaited<ReturnType<MeRepository['updateOperatorMe']>>> {
    const raw = input as Record<string, unknown>;
    const tenantId = resolveTenantId(raw);
    const correlationId = String(raw.correlationId ?? '');
    const userId = raw.userId ? String(raw.userId) : '';
    const displayName = raw.displayName ? String(raw.displayName) : undefined;

    if (!userId || userId === 'usr_api_key_demo') {
      return {
        data: {
          operator: {
            ...syntheticApiKeyOperator(),
            displayName: displayName ?? 'Demo API key',
          },
          tenant: tenantSummary(tenantId),
        },
        ...responseMeta(correlationId),
      };
    }

    const user = usersById.get(userId);
    if (!user || user.tenantId !== tenantId) {
      const err = new Error('Operator session not found') as Error & {
        statusCode?: number;
      };
      err.statusCode = 401;
      throw err;
    }

    if (displayName) {
      user.displayName = displayName;
      user.updatedAt = nowIso();
      usersById.set(userId, user);
    }

    return {
      data: {
        operator: toSessionOperator(user),
        tenant: tenantSummary(tenantId),
      },
      ...responseMeta(correlationId),
    };
  }
}
