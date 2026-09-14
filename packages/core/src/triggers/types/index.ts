/**
 * Triggers Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/triggers.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type ArmThresholds = components["schemas"]["ArmThresholds"];
export type ExecutionMode = components["schemas"]["ExecutionMode"];
export type LifecycleStep = components["schemas"]["LifecycleStep"];
export type SmartContractTrigger = components["schemas"]["SmartContractTrigger"];
export type SmartContractTriggerCreate = components["schemas"]["SmartContractTriggerCreate"];
export type SmartContractTriggerListData = components["schemas"]["SmartContractTriggerListData"];
export type SmartContractTriggerUpdate = components["schemas"]["SmartContractTriggerUpdate"];
export type TriggerCondition = components["schemas"]["TriggerCondition"];
export type TriggerFireResult = components["schemas"]["TriggerFireResult"];
export type TriggerId = components["schemas"]["TriggerId"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateSmartContractTriggerRequestInput = NonNullable<operations["createSmartContractTrigger"]["requestBody"]>["content"]["application/json"];
export type UpdateSmartContractTriggerRequestInput = NonNullable<operations["updateSmartContractTrigger"]["requestBody"]>["content"]["application/json"];
export type UpdateSmartContractTriggerRequest = UpdateSmartContractTriggerRequestInput;


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListSmartContractTriggersParams = NonNullable<operations["listSmartContractTriggers"]["parameters"]["query"]>;
export type GetSmartContractTriggerParams = operations["getSmartContractTrigger"]["parameters"]["path"];
export type UpdateSmartContractTriggerParams = operations["updateSmartContractTrigger"]["parameters"]["path"];
export type FireSmartContractTriggerParams = operations["fireSmartContractTrigger"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListSmartContractTriggersResponse = operations["listSmartContractTriggers"]["responses"]["200"]["content"]["application/json"];
export type CreateSmartContractTriggerResponse = operations["createSmartContractTrigger"]["responses"]["201"]["content"]["application/json"];
export type GetSmartContractTriggerResponse = operations["getSmartContractTrigger"]["responses"]["200"]["content"]["application/json"];
export type UpdateSmartContractTriggerResponse = operations["updateSmartContractTrigger"]["responses"]["200"]["content"]["application/json"];
export type FireSmartContractTriggerResponse = operations["fireSmartContractTrigger"]["responses"]["200"]["content"]["application/json"];


