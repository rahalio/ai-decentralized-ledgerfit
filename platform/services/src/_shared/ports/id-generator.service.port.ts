/**
 * IdGeneratorService Port — starter prefixes (extend in consumer repos).
 */

import type { DomainCode } from '@ledgerfit/core/_shared/helpers';

export interface IdGeneratorService {
  tntId(): string;
  keyId(): string;
  idnId(): string;
  autId(): string;
  ldgId(): string;
  trnId(): string;
  mdlId(): string;
  trgId(): string;
  prvId(): string;
  invId(): string;
  govId(): string;
  generateIdForDomain(domainCode: DomainCode): string;
}
