# Security Center Insights

19 endpoints.

## PUT /accounts/{account_id}/intel/attack-surface-report/{issue_id}/dismiss

Archives Security Center Insight

operationId: `archive-security-center-insight-deprecated`

## GET /accounts/{account_id}/intel/attack-surface-report/issue-types

Retrieves Security Center Issues Types

operationId: `get-security-center-issue-types`

## GET /accounts/{account_id}/intel/attack-surface-report/issues

Retrieves Security Center Issues

operationId: `get-security-center-issues` · query: `dismissed`, `issue_class`, `issue_type`, `product`, `severity`, `subject`, `issue_class~neq`, `issue_type~neq`, `product~neq`, `severity~neq`, `subject~neq`, `page`, `per_page`

## GET /accounts/{account_id}/intel/attack-surface-report/issues/class

Retrieves Security Center Issue Counts by Class

operationId: `get-security-center-issue-counts-by-class` · query: `dismissed`, `issue_class`, `issue_type`, `product`, `severity`, `subject`, `issue_class~neq`, `issue_type~neq`, `product~neq`, `severity~neq`, `subject~neq`

## GET /accounts/{account_id}/intel/attack-surface-report/issues/severity

Retrieves Security Center Issue Counts by Severity

operationId: `get-security-center-issue-counts-by-severity` · query: `dismissed`, `issue_class`, `issue_type`, `product`, `severity`, `subject`, `issue_class~neq`, `issue_type~neq`, `product~neq`, `severity~neq`, `subject~neq`

## GET /accounts/{account_id}/intel/attack-surface-report/issues/type

Retrieves Security Center Issue Counts by Type

operationId: `get-security-center-issue-counts-by-type` · query: `dismissed`, `issue_class`, `issue_type`, `product`, `severity`, `subject`, `issue_class~neq`, `issue_type~neq`, `product~neq`, `severity~neq`, `subject~neq`

## GET /accounts/{account_id}/security-center/insights

Retrieves Security Center Insights

operationId: `get-security-center-insights` · query: `dismissed`, `issue_class`, `issue_type`, `product`, `severity`, `subject`, `issue_class~neq`, `issue_type~neq`, `product~neq`, `severity~neq`, `subject~neq`, `page`, `per_page`

## PATCH /accounts/{account_id}/security-center/insights/{issue_id}/classification

Updates Security Center Insight Classification

operationId: `update-security-center-insight-classification`

## GET /accounts/{account_id}/security-center/insights/{issue_id}/context

Retrieves Security Center Insight Context

operationId: `get-security-center-insight-context`

## PUT /accounts/{account_id}/security-center/insights/{issue_id}/dismiss

Archives Security Center Insight

operationId: `archive-security-center-insight`

## GET /accounts/{account_id}/security-center/insights/class

Retrieves Security Center Insight Counts by Class

operationId: `get-security-center-insight-counts-by-class` · query: `dismissed`, `issue_class`, `issue_type`, `product`, `severity`, `subject`, `issue_class~neq`, `issue_type~neq`, `product~neq`, `severity~neq`, `subject~neq`

## GET /accounts/{account_id}/security-center/insights/severity

Retrieves Security Center Insight Counts by Severity

operationId: `get-security-center-insight-counts-by-severity` · query: `dismissed`, `issue_class`, `issue_type`, `product`, `severity`, `subject`, `issue_class~neq`, `issue_type~neq`, `product~neq`, `severity~neq`, `subject~neq`

## GET /accounts/{account_id}/security-center/insights/type

Retrieves Security Center Insight Counts by Type

operationId: `get-security-center-insight-counts-by-type` · query: `dismissed`, `issue_class`, `issue_type`, `product`, `severity`, `subject`, `issue_class~neq`, `issue_type~neq`, `product~neq`, `severity~neq`, `subject~neq`

## GET /zones/{zone_id}/security-center/insights

Retrieves Zone Security Center Insights

operationId: `get-zone-security-center-insights` · query: `dismissed`, `issue_class`, `issue_type`, `product`, `severity`, `subject`, `issue_class~neq`, `issue_type~neq`, `product~neq`, `severity~neq`, `subject~neq`, `page`, `per_page`

## PATCH /zones/{zone_id}/security-center/insights/{issue_id}/classification

Updates Zone Security Center Insight Classification

operationId: `update-zone-security-center-insight-classification`

## PUT /zones/{zone_id}/security-center/insights/{issue_id}/dismiss

Archives Zone Security Center Insight

operationId: `archive-zone-security-center-insight`

## GET /zones/{zone_id}/security-center/insights/class

Retrieves Zone Security Center Insight Counts by Class

operationId: `get-zone-security-center-insight-counts-by-class` · query: `dismissed`, `issue_class`, `issue_type`, `product`, `severity`, `subject`, `issue_class~neq`, `issue_type~neq`, `product~neq`, `severity~neq`, `subject~neq`

## GET /zones/{zone_id}/security-center/insights/severity

Retrieves Zone Security Center Insight Counts by Severity

operationId: `get-zone-security-center-insight-counts-by-severity` · query: `dismissed`, `issue_class`, `issue_type`, `product`, `severity`, `subject`, `issue_class~neq`, `issue_type~neq`, `product~neq`, `severity~neq`, `subject~neq`

## GET /zones/{zone_id}/security-center/insights/type

Retrieves Zone Security Center Insight Counts by Type

operationId: `get-zone-security-center-insight-counts-by-type` · query: `dismissed`, `issue_class`, `issue_type`, `product`, `severity`, `subject`, `issue_class~neq`, `issue_type~neq`, `product~neq`, `severity~neq`, `subject~neq`
