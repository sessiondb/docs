---
layout: ../../layouts/DocsLayout.astro
title: "API Integration"
---

# System API Integration

SessionDB provides a comprehensive REST architecture to programmatically control resources, provision roles, and execute dynamic infrastructure changes.

## Authentication

All endpoints require a Bearer JWT issued by the `/v1/auth/login` endpoint.

```
Authorization: Bearer <your_jwt_token_here>
```

## Standard Response Format

SessionDB adheres to a strict predictable JSON response envelope.

```json
{
  "success": true,
  "data": { ... },
  "error": null,
  "timestamp": "2026-03-16T12:00:00Z"
}
```

## Execution Endpoint Example

Execute generic user queries:

```json
POST /v1/query/execute
Content-Type: application/json

{
  "instance_id": "uuid-v4-reference",
  "database": "public",
  "query": "SELECT * FROM users LIMIT 10;"
}
```
