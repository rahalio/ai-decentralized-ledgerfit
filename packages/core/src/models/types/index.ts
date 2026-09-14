/**
 * Models Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/models.openapi.types";

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
export type ArtefactId = components["schemas"]["ArtefactId"];
export type AssociationRule = components["schemas"]["AssociationRule"];
export type AssociationRuleListData = components["schemas"]["AssociationRuleListData"];
export type ModelArtefact = components["schemas"]["ModelArtefact"];
export type ModelArtefactCreate = components["schemas"]["ModelArtefactCreate"];
export type ModelArtefactListData = components["schemas"]["ModelArtefactListData"];
export type PromotionState = components["schemas"]["PromotionState"];
export type RuleId = components["schemas"]["RuleId"];
export type ModelPromotionRequest = components["schemas"]["ModelPromotionRequest"];
export type Rule = operations["listAssociationRules"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type RegisterModelArtefactRequestInput = NonNullable<operations["registerModelArtefact"]["requestBody"]>["content"]["application/json"];
export type PromoteModelArtefactRequestInput = NonNullable<operations["promoteModelArtefact"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListModelArtefactsParams = NonNullable<operations["listModelArtefacts"]["parameters"]["query"]>;
export type GetModelArtefactParams = operations["getModelArtefact"]["parameters"]["path"];
export type PromoteModelArtefactParams = operations["promoteModelArtefact"]["parameters"]["path"];
export type ListAssociationRulesParams = NonNullable<operations["listAssociationRules"]["parameters"]["query"]>;


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListModelArtefactsResponse = operations["listModelArtefacts"]["responses"]["200"]["content"]["application/json"];
export type RegisterModelArtefactResponse = operations["registerModelArtefact"]["responses"]["201"]["content"]["application/json"];
export type GetModelArtefactResponse = operations["getModelArtefact"]["responses"]["200"]["content"]["application/json"];
export type PromoteModelArtefactResponse = operations["promoteModelArtefact"]["responses"]["200"]["content"]["application/json"];
export type ListAssociationRulesResponse = operations["listAssociationRules"]["responses"]["200"]["content"]["application/json"];


