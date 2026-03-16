---
layout: ../../layouts/DocsLayout.astro
title: "Database Connectivity"
---

# Database Connectivity

SessionDB supports multiple relational database dialects out-of-the-box. Connecting new targets is handled dynamically at runtime without needing to restart the gateway.

## Supported Engines

- **PostgreSQL** (v12 and higher recommended)
- **MySQL** (v8.0 and higher recommended)

## Adding a New Target Instance

When an Admin provisions a new Database Instance via the UI, SessionDB does the following:

1. Takes the provided credentials (Host, Port, User, Password).
2. Symmetrically encrypts the password using the system `DB_CREDENTIAL_ENCRYPTION_KEY`.
3. Validates the connection string using a fast Ping check.
4. Optionally triggers the asynchronous **Schema Discovery** job to crawl catalogs and tables.

```sql
-- Example Schema Discovery Internal Query (Postgres)
SELECT table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_schema = 'public';
```
