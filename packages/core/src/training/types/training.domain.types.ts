/**
 * Training Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/training.openapi.types";

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
export type ExecutionMode = components["schemas"]["ExecutionMode"];
export type JobId = components["schemas"]["JobId"];
export type LedgerWindow = components["schemas"]["LedgerWindow"];
export type LifecycleStep = components["schemas"]["LifecycleStep"];
export type TrainingJob = components["schemas"]["TrainingJob"];
export type TrainingJobCreate = components["schemas"]["TrainingJobCreate"];
export type TrainingJobListData = components["schemas"]["TrainingJobListData"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateTrainingJobRequestInput = NonNullable<operations["createTrainingJob"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListTrainingJobsParams = NonNullable<operations["listTrainingJobs"]["parameters"]["query"]>;
export type GetTrainingJobParams = operations["getTrainingJob"]["parameters"]["path"];
export type CancelTrainingJobParams = operations["cancelTrainingJob"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListTrainingJobsResponse = operations["listTrainingJobs"]["responses"]["200"]["content"]["application/json"];
export type CreateTrainingJobResponse = operations["createTrainingJob"]["responses"]["201"]["content"]["application/json"];
export type GetTrainingJobResponse = operations["getTrainingJob"]["responses"]["200"]["content"]["application/json"];
export type CancelTrainingJobResponse = operations["cancelTrainingJob"]["responses"]["200"]["content"]["application/json"];


