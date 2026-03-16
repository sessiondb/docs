---
layout: ../../layouts/DocsLayout.astro
title: "Deployment"
---

# Production Deployment Strategies

While `scli run` is perfect for local development, production instances of SessionDB should be deployed for high-availability.

## Systemd (Bare Metal / VM)

The fastest native deployment path provided by `scli`.

```bash
scli deploy --platform baremetal --output sessiondb.service
sudo systemctl enable --now sessiondb
```

## Docker & Containerization

SessionDB provides official lightweight Docker images. It is recommended to deploy alongside a dedicated Redis instance and a backing PostgreSQL metadata database.

### Example `docker-compose.yml`

```yaml
version: '3.8'
services:
  sessiondb:
    image: sessiondb/server:latest
    ports:
      - "8080:8080"
    environment:
      - SDB_REDIS_ADDR=redis:6379
      - SDB_DB_DSN=postgres://user:pass@db:5432/sessiondb
    depends_on:
      - redis
      - db

  redis:
    image: redis:7-alpine

  db:
    image: postgres:15
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: sessiondb
```
