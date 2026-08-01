# Radar Post-Quantum

3 endpoints.

## GET /radar/post_quantum/origin/summary/{dimension}

Get Origin Post-Quantum Data Summary

operationId: `radar-get-origin-post-quantum-summary` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `format`

## GET /radar/post_quantum/origin/timeseries_groups/{dimension}

Get Origin Post-Quantum Data Over Time

operationId: `radar-get-origin-post-quantum-timeseries-groups` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `format`

## GET /radar/post_quantum/tls/support

Check Post-Quantum TLS support

operationId: `radar-get-post-quantum-tls-support` · query: `host`
