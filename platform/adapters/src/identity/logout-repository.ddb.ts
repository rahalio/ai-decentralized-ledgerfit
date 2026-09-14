/**
 * LogoutRepository — sandbox logout (clears refresh session when present).
 */

import type { LogoutRepository } from '@ledgerfit/services/identity';
import { responseMeta } from '../_shared/sandbox-store.js';
import { refreshSessions } from './login-repository.ddb.js';

export class LogoutRepositoryDdb implements LogoutRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async operatorLogout(
    input: Parameters<LogoutRepository['operatorLogout']>[0]
  ): Promise<Awaited<ReturnType<LogoutRepository['operatorLogout']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const refreshToken = raw.refreshToken ? String(raw.refreshToken) : '';
    if (refreshToken) refreshSessions.delete(refreshToken);
    return {
      data: { loggedOut: true },
      ...responseMeta(correlationId),
    };
  }
}
