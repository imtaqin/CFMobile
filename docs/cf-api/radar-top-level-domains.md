# Radar Top-Level Domains

4 endpoints.

## GET /radar/tlds

List TLDs

operationId: `radar-get-tlds` · query: `limit`, `offset`, `tldManager`, `tldType`, `tld`, `format`

## GET /radar/tlds/{tld}

Get TLD details

operationId: `radar-get-tld-details` · query: `format`

## GET /radar/tlds/performance/summary/{dimension}

Get TLD Performance Summary

operationId: `radar-get-tlds-performance-summary` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `location`, `continent`, `tld`, `nameserver`, `limitPerGroup`, `format`

## GET /radar/tlds/performance/timeseries_groups/{dimension}

Get TLD Performance Over Time

operationId: `radar-get-tlds-performance-timeseries-groups` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `location`, `continent`, `tld`, `nameserver`, `limitPerGroup`, `format`
