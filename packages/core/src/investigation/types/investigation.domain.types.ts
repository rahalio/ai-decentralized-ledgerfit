/**
 * Investigation Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/investigation.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type CaseNote = components["schemas"]["CaseNote"];
export type CaseNoteCreate = components["schemas"]["CaseNoteCreate"];
export type CaseNoteId = components["schemas"]["CaseNoteId"];
export type CaseNoteListData = components["schemas"]["CaseNoteListData"];
export type MaskedHit = components["schemas"]["MaskedHit"];
export type MaskedHitId = components["schemas"]["MaskedHitId"];
export type MaskedHitListData = components["schemas"]["MaskedHitListData"];
export type RevealDecision = components["schemas"]["RevealDecision"];
export type RevealRequest = components["schemas"]["RevealRequest"];
export type RevealRequestCreate = components["schemas"]["RevealRequestCreate"];
export type RevealRequestId = components["schemas"]["RevealRequestId"];
export type RevealRequestListData = components["schemas"]["RevealRequestListData"];
export type RevealRequestListResponse = components["schemas"]["RevealRequestListResponse"];
export type RevealRequestResponse = components["schemas"]["RevealRequestResponse"];
export type Hit = operations["listMaskedHits"]["responses"]["200"]["content"]["application/json"]["data"];
export type Reveal = operations["listRevealRequests"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateRevealRequestRequestInput = NonNullable<operations["createRevealRequest"]["requestBody"]>["content"]["application/json"];
export type DecideRevealRequestRequestInput = NonNullable<operations["decideRevealRequest"]["requestBody"]>["content"]["application/json"];
export type CreateCaseNoteRequestInput = NonNullable<operations["createCaseNote"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListMaskedHitsParams = NonNullable<operations["listMaskedHits"]["parameters"]["query"]>;
export type ListRevealRequestsParams = NonNullable<operations["listRevealRequests"]["parameters"]["query"]>;
export type GetRevealRequestParams = operations["getRevealRequest"]["parameters"]["path"];
export type DecideRevealRequestParams = operations["decideRevealRequest"]["parameters"]["path"];
export type ListCaseNotesParams = NonNullable<operations["listCaseNotes"]["parameters"]["query"]>;


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListMaskedHitsResponse = operations["listMaskedHits"]["responses"]["200"]["content"]["application/json"];
export type ListRevealRequestsResponse = operations["listRevealRequests"]["responses"]["200"]["content"]["application/json"];
export type CreateRevealRequestResponse = operations["createRevealRequest"]["responses"]["201"]["content"]["application/json"];
export type GetRevealRequestResponse = operations["getRevealRequest"]["responses"]["200"]["content"]["application/json"];
export type DecideRevealRequestResponse = operations["decideRevealRequest"]["responses"]["200"]["content"]["application/json"];
export type ListCaseNotesResponse = operations["listCaseNotes"]["responses"]["200"]["content"]["application/json"];
export type CreateCaseNoteResponse = operations["createCaseNote"]["responses"]["201"]["content"]["application/json"];


