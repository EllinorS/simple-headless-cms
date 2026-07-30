# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Préférences

- Code propre et maintenable plutôt que malin. Suivre les patterns existants du projet avant d'en introduire de nouveaux.
- Toujours inclure la gestion d'erreur.
- Ne jamais proposer d'API dépréciée sans le signaler.
- Implémentation : le code d'abord, puis expliquer seulement les parties non évidentes.
- Débogage : demander le message d'erreur et le code concerné avant de proposer un fix. Ne pas deviner.
- Vérifier qu'une lib ou un outil est activement maintenu avant de le recommander.
- Concis, pas de sur-explication des bases.

## Commands

Backend (`cd backend`):
- `yarn dev` — nodemon
- `yarn start` — node
- `yarn lint` — eslint
- No test suite in this repo.
- Needs MySQL DB + `backend/.env` (copy `.env.example`). Default port `3005`.

Frontend (`cd frontend`):
- `yarn dev` — port `3002` (hardcoded in package.json)
- `yarn build` / `yarn start`
- `yarn lint` — eslint
- No test suite in this repo.
- Needs `frontend/.env.local` (copy `.env.example`).

## Architecture

Two independent apps, separate `yarn install`/lockfile each: `backend/` (Express 5, ESM) and `frontend/` (Next.js 15, App Router). No shared package.

**Backend flow**: `routes/ → middlewares/ (validate zod, authMiddleware, roleMiddleware) → controllers/ → models/ → utils/`, with `services/` for multi-step logic spanning several models (e.g. booking creation/cancellation/reschedule).

**MySQL access**: raw SQL via `mysql2/promise`, pool exported as `db` from `src/config/db.js` — no ORM. Multi-statement writes go through `src/utils/transactionHelper.js`'s `withTransaction(callback)`, which passes one connection through the callback for commit/rollback.

**Error handling**: controllers/services throw `Error` with a `.status`; every route is wrapped in `asyncHandler` (`src/utils/asyncHandler.js`) which forwards thrown errors to the single `errorHandler` middleware in `src/app.js`. `errorHandler` only exposes `err.message` to the client when `.status` is set, otherwise returns a generic 500.

**Rate limiting**: all limiters are defined in `src/app.js`, not in route files — new limiters go there too.

**Env vars**: backend reads from `backend/.env` via `dotenv/config`, referenced through `process.env.*` in `config/`, `app.js`, `jobs/`. Frontend reads from `frontend/.env.local`; `NEXT_PUBLIC_*` vars are exposed client-side, others (e.g. `BACKEND_URL`) are server-only and read in `lib/api-client.ts` to pick the right backend URL depending on server vs. client context.

**`backend/db.sql`**: not authoritative for the full current schema (some tables used by models aren't in it). Never edit it directly — schema changes are given as SQL in chat only.
