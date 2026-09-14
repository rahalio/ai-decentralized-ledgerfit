/**
 * Ledgers Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/ledgers.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type EventRefId = components["schemas"]["EventRefId"];
export type FreezeOrder = components["schemas"]["FreezeOrder"];
export type FreezeOrderCreate = components["schemas"]["FreezeOrderCreate"];
export type FreezeOrderId = components["schemas"]["FreezeOrderId"];
export type FreezeOrderListData = components["schemas"]["FreezeOrderListData"];
export type LedgerId = components["schemas"]["LedgerId"];
export type LedgerNetwork = components["schemas"]["LedgerNetwork"];
export type LedgerNetworkCreate = components["schemas"]["LedgerNetworkCreate"];
export type LedgerNetworkListData = components["schemas"]["LedgerNetworkListData"];
export type MemberId = components["schemas"]["MemberId"];
export type PharmacyMember = components["schemas"]["PharmacyMember"];
export type PharmacyMemberCreate = components["schemas"]["PharmacyMemberCreate"];
export type PharmacyMemberListData = components["schemas"]["PharmacyMemberListData"];
export type PrescriptionEventRef = components["schemas"]["PrescriptionEventRef"];
export type PrescriptionEventRefCreate = components["schemas"]["PrescriptionEventRefCreate"];
export type PrescriptionEventRefListData = components["schemas"]["PrescriptionEventRefListData"];
export type Ledger = operations["listLedgers"]["responses"]["200"]["content"]["application/json"]["data"];
export type Member = operations["listPharmacyMembers"]["responses"]["200"]["content"]["application/json"]["data"];
export type Event = operations["listPrescriptionEventRefs"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type RegisterLedgerRequestInput = NonNullable<operations["registerLedger"]["requestBody"]>["content"]["application/json"];
export type AddPharmacyMemberRequestInput = NonNullable<operations["addPharmacyMember"]["requestBody"]>["content"]["application/json"];
export type AnchorPrescriptionEventRequestInput = NonNullable<operations["anchorPrescriptionEvent"]["requestBody"]>["content"]["application/json"];
export type FreezePharmacyMemberRequestInput = NonNullable<operations["freezePharmacyMember"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListLedgersParams = NonNullable<operations["listLedgers"]["parameters"]["query"]>;
export type GetLedgerParams = operations["getLedger"]["parameters"]["path"];
export type ListPharmacyMembersParams = NonNullable<operations["listPharmacyMembers"]["parameters"]["query"]>;
export type AddPharmacyMemberParams = operations["addPharmacyMember"]["parameters"]["path"];
export type ListPrescriptionEventRefsParams = NonNullable<operations["listPrescriptionEventRefs"]["parameters"]["query"]>;
export type AnchorPrescriptionEventParams = operations["anchorPrescriptionEvent"]["parameters"]["path"];
export type FreezePharmacyMemberParams = operations["freezePharmacyMember"]["parameters"]["path"];
export type ListFreezeOrdersParams = NonNullable<operations["listFreezeOrders"]["parameters"]["query"]>;
export type AcknowledgeFreezeOrderParams = operations["acknowledgeFreezeOrder"]["parameters"]["path"];
export type ReleaseFreezeOrderParams = operations["releaseFreezeOrder"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListLedgersResponse = operations["listLedgers"]["responses"]["200"]["content"]["application/json"];
export type RegisterLedgerResponse = operations["registerLedger"]["responses"]["201"]["content"]["application/json"];
export type GetLedgerResponse = operations["getLedger"]["responses"]["200"]["content"]["application/json"];
export type ListPharmacyMembersResponse = operations["listPharmacyMembers"]["responses"]["200"]["content"]["application/json"];
export type AddPharmacyMemberResponse = operations["addPharmacyMember"]["responses"]["201"]["content"]["application/json"];
export type ListPrescriptionEventRefsResponse = operations["listPrescriptionEventRefs"]["responses"]["200"]["content"]["application/json"];
export type AnchorPrescriptionEventResponse = operations["anchorPrescriptionEvent"]["responses"]["201"]["content"]["application/json"];
export type FreezePharmacyMemberResponse = operations["freezePharmacyMember"]["responses"]["201"]["content"]["application/json"];
export type ListFreezeOrdersResponse = operations["listFreezeOrders"]["responses"]["200"]["content"]["application/json"];
export type AcknowledgeFreezeOrderResponse = operations["acknowledgeFreezeOrder"]["responses"]["200"]["content"]["application/json"];
export type ReleaseFreezeOrderResponse = operations["releaseFreezeOrder"]["responses"]["200"]["content"]["application/json"];


