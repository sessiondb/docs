---
layout: ../../layouts/DocsLayout.astro
title: "Architecture"
---

# Architecture Overview

SessionDB operates as a highly specialized reverse-proxy and connection multiplexer. Its primary goal is to securely route SQL traffic from authenticated web clients to isolated backend database targets without exposing direct credentials.

## Component Flow

1. **Frontend UI:** The React-based dashboard where users configure connections, request permissions, and execute safe queries via API.
2. **SessionDB Gateway:** The Golang backend that intercepts all API requests.
3. **Identity & Access Layer (RBAC):** Validates the incoming JWT against cached Roles and specific data-level grants before any execution layer is reached.
4. **Target Databases:** MySQL or PostgreSQL instances connected securely via unified DSNs.

> **Important:**
> The SessionDB Gateway never caches raw target table data; it only caches structural metadata (schema names, column types) for discovery.
