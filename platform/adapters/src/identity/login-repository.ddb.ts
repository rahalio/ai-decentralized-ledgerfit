/**
 * LoginRepository — sandbox auth (login only; me lives on MeRepository).
 */

import type { LoginRepository } from '@ledgerfit/services/identity';
import {
  generateAccessToken,
  generateRefreshToken,
} from '@ledgerfit/services/_shared';
import {
  listUsersForTenant,
  nowIso,
  responseMeta,
  usersById,
  type SandboxUser,
} from '../_shared/sandbox-store.js';

/** refreshToken → userId for sandbox refresh without jwt dep in adapters */
export const refreshSessions = new Map<string, string>();

function resolveTenantId(raw: Record<string, unknown>): string {
  const orgId = String(raw.orgId ?? 'tnt_demo');
  return !orgId || orgId === 'system' ? 'tnt_demo' : orgId;
}

function toSessionOperator(user: SandboxUser) {
  return {
    userId: user.userId,
    email: user.email,
    displayName: user.displayName,
    role: user.role,
  };
}

function issueTokens(user: SandboxUser, tenantId: string, correlationId: string) {
  const claims = {
    userId: user.userId,
    email: user.email,
    role: user.role,
    tenantId,
  };
  const accessToken = generateAccessToken(claims);
  const refreshToken = generateRefreshToken(claims);
  refreshSessions.set(refreshToken, user.userId);
  return {
    data: {
      accessToken,
      refreshToken,
      tokenType: 'Bearer' as const,
      expiresIn: 900,
      operator: toSessionOperator(user),
    },
    ...responseMeta(correlationId),
  };
}

export class LoginRepositoryDdb implements LoginRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async operatorLogin(
    input: Parameters<LoginRepository['operatorLogin']>[0]
  ): Promise<Awaited<ReturnType<LoginRepository['operatorLogin']>>> {
    const raw = input as Record<string, unknown>;
    const tenantId = resolveTenantId(raw);
    const correlationId = String(raw.correlationId ?? '');
    const email = String(raw.email ?? '')
      .trim()
      .toLowerCase();
    const password = String(raw.password ?? '');

    const user = listUsersForTenant(tenantId).find(
      (u) => u.email.toLowerCase() === email
    );
    if (!user || user.password !== password || user.status !== 'active') {
      const err = new Error('Invalid email or password') as Error & {
        statusCode?: number;
      };
      err.statusCode = 401;
      throw err;
    }

    user.lastLoginAt = nowIso();
    usersById.set(user.userId, user);

    return issueTokens(user, tenantId, correlationId);
  }
}
