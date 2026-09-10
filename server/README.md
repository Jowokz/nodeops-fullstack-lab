# NestOps Lab

A NestJS + TypeScript backend project for learning production-style Node concepts:

- Modules, controllers, services
- DTO validation
- JWT guards
- CSV uploads
- BullMQ + Redis background jobs
- Worker threads for CPU-heavy tasks
- Health checks
- Event loop/debug endpoints

## Setup

```bash
npm install
cp .env.example .env
npm run start:dev
```

Redis must be running locally for queue features.

```bash
docker run -p 6379:6379 redis:7
```

## Endpoints

```txt
POST   /auth/register
POST   /auth/login
POST   /uploads/csv
GET    /jobs
GET    /jobs/:id
GET    /debug/event-loop
GET    /debug/blocking
GET    /debug/worker-thread
GET    /health
```

## Learning comparison

Express gives manual control. NestJS gives enterprise structure through controllers, services, modules, DTOs, guards, interceptors, and dependency injection.
