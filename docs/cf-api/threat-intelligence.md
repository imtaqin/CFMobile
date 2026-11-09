# Threat Intelligence

1 endpoints.

## POST /accounts/{account_id}/cloudforce-one/v2/search

Search threat intelligence

operationId: `searchThreatIntelligence`

**Request** (application/json)

- `entity_types`: string[] default: `article,actor,tag,event,indicator` — Entity types to search. Omit to search articles, actors, tags, events, and indicators.
  [array]
- `include_analytics_datasets`: boolean default: `false` — Whether to include Event and Indicator matches from analytics datasets. Defaults to false because these datasets can take longer to search. 
- `limit`: integer default: `20` — Maximum number of results to return. Defaults to 20.
- `query`: string **required** — Search text, from 1 to 1000 characters after trimming.

**Response** 200 → `result`

- `count`: integer **required**
- `items`: object[] **required**
  [array of]
  - `article_id`: string **required**
  - `feed_id`: string **required**
  - `published_at`: string **required**
  - `title`: string **required**
  - `type`: string **required** enum: `article`
- `partial`: boolean **required**
- `sources`: object[] **required**
  [array of]
  - `source`: string **required** enum: `article`, `actor`, `tag`, `event`, `indicator`
  - `status`: string **required** enum: `complete`, `degraded`, `unavailable` — Completeness of the enabled backends for this entity type. Intentionally excluded analytics datasets do not make the source degraded or the 
