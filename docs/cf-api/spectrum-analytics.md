# Spectrum Analytics

3 endpoints.

## GET /zones/{zone_id}/spectrum/analytics/aggregate/current

Get current aggregated analytics

operationId: `spectrum-aggregate-analytics-get-current-aggregated-analytics` · query: `appID`, `colo_name`

## GET /zones/{zone_id}/spectrum/analytics/events/bytime

Get analytics by time

operationId: `spectrum-analytics-(-by-time)-get-analytics-by-time` · query: `dimensions`, `sort`, `until`, `metrics`, `filters`, `since`, `time_delta`

## GET /zones/{zone_id}/spectrum/analytics/events/summary

Get analytics summary

operationId: `spectrum-analytics-(-summary)-get-analytics-summary` · query: `dimensions`, `sort`, `until`, `metrics`, `filters`, `since`
