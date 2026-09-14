/**
 * Hand-maintained types for the generated integration-event registry.
 */
export type IntegrationEventDeliveryMode = 'sync' | 'async';

export interface IntegrationEventTypeDefinition {
  type: string;
  domain: string;
  aggregateType: string;
  description: string;
  defaultDeliveryMode: IntegrationEventDeliveryMode;
}
