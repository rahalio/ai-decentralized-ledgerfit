/**
 * Governance Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/governance.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type ArmThresholds = components["schemas"]["ArmThresholds"];
export type DataSourcePolicy = components["schemas"]["DataSourcePolicy"];
export type DataSourcePolicyCreate = components["schemas"]["DataSourcePolicyCreate"];
export type DataSourcePolicyId = components["schemas"]["DataSourcePolicyId"];
export type DataSourcePolicyListData = components["schemas"]["DataSourcePolicyListData"];
export type PolicyId = components["schemas"]["PolicyId"];
export type ThresholdPolicy = components["schemas"]["ThresholdPolicy"];
export type ThresholdPolicyApprove = components["schemas"]["ThresholdPolicyApprove"];
export type ThresholdPolicyCreate = components["schemas"]["ThresholdPolicyCreate"];
export type ThresholdPolicyListData = components["schemas"]["ThresholdPolicyListData"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateThresholdPolicyRequestInput = NonNullable<operations["createThresholdPolicy"]["requestBody"]>["content"]["application/json"];
export type ApproveThresholdPolicyRequestInput = NonNullable<operations["approveThresholdPolicy"]["requestBody"]>["content"]["application/json"];
export type CreateDataSourcePolicyRequestInput = NonNullable<operations["createDataSourcePolicy"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListThresholdPoliciesParams = NonNullable<operations["listThresholdPolicies"]["parameters"]["query"]>;
export type GetThresholdPolicyParams = operations["getThresholdPolicy"]["parameters"]["path"];
export type ApproveThresholdPolicyParams = operations["approveThresholdPolicy"]["parameters"]["path"];
export type ListDataSourcePoliciesParams = NonNullable<operations["listDataSourcePolicies"]["parameters"]["query"]>;
export type GetDataSourcePolicyParams = operations["getDataSourcePolicy"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListThresholdPoliciesResponse = operations["listThresholdPolicies"]["responses"]["200"]["content"]["application/json"];
export type CreateThresholdPolicyResponse = operations["createThresholdPolicy"]["responses"]["201"]["content"]["application/json"];
export type GetThresholdPolicyResponse = operations["getThresholdPolicy"]["responses"]["200"]["content"]["application/json"];
export type ApproveThresholdPolicyResponse = operations["approveThresholdPolicy"]["responses"]["200"]["content"]["application/json"];
export type ListDataSourcePoliciesResponse = operations["listDataSourcePolicies"]["responses"]["200"]["content"]["application/json"];
export type CreateDataSourcePolicyResponse = operations["createDataSourcePolicy"]["responses"]["201"]["content"]["application/json"];
export type GetDataSourcePolicyResponse = operations["getDataSourcePolicy"]["responses"]["200"]["content"]["application/json"];


