# NodeOps Fullstack Lab

This is the expanded version of the NodeOps/NestOps project:

- `server/` = NestJS + TypeScript backend
- `client/` = React + Vite frontend

The frontend is designed to teach the same production-style backend concepts through a UI:

- login/auth state
- protected pages
- CSV upload
- job dashboard
- job details
- backend health check
- event loop / blocking / worker thread debug panel

## Run backend

```bash
cd server
npm install
npm run start:dev
```

Backend runs on `http://localhost:3000`.

## Run frontend

```bash
cd client
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`.

## Why this project is useful for interviews

It compares:

- Express/JavaScript mental model: routes, controllers, middleware, services
- NestJS/TypeScript mental model: modules, controllers, services, DTOs, guards, processors
- React frontend mental model: components, hooks, context, routing, forms, API integration, testing

