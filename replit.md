# Noir Restaurant Website

## Overview

A luxury dark-themed restaurant website built as a coursework project. Features a React frontend with Framer Motion animations, Express backend with REST API, and PostgreSQL database with Drizzle ORM.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite + Tailwind CSS + Framer Motion
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Database Schema

- **users** — restaurant customers (id, name, email, phone, created_at)
- **menu** — menu items (id, name, description, price, category, image_url)
- **reservations** — table reservations (id, user_id FK→users, date, time, guests, special_requests, status, created_at)

## API Endpoints

- `GET /api/menu` — list all menu items
- `GET /api/menu/categories` — list distinct categories
- `POST /api/reservations` — create reservation (auto-creates user if new)
- `GET /api/reservations/check` — check table availability
- `GET /api/healthz` — health check

## Frontend Sections

- Hero with parallax background
- Menu with category filtering (data from API)
- About the restaurant
- Reservation form with validation (submits to API)
- Contact information

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
