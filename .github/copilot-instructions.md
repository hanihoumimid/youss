# Copilot Instructions for YOUSS

## Project Overview

**YOUSS** is an AdonisJS fullstack application combining:
- **Backend**: TypeScript-based AdonisJS 6 server with authentication, database ORM (Lucid), and session management
- **Frontend**: Vue 3 with Inertia.js (Server-Side Rendering enabled)
- **Database**: PostgreSQL with Lucid migrations

## Architecture

### High-Level Data Flow
1. HTTP requests → AdonisJS middleware stack → authenticated routes → Inertia responses
2. Browser receives SSR-rendered Vue pages + Inertia props
3. Subsequent navigation handled client-side via Inertia
4. Database operations via Lucid ORM models (e.g., `User` model)

### Key Directories & Responsibilities

- **`app/`** - Application logic
  - `models/` - Lucid ORM models with Auth mixins (`User.ts`)
  - `middleware/` - HTTP middleware (auth, guest, container bindings)
  - `exceptions/` - Error handlers
- **`config/`** - Framework configuration files (app, auth, database, inertia, session, shield)
- **`start/`** - Bootstrap files
  - `kernel.ts` - Middleware registration & named middleware exports
  - `routes.ts` - HTTP route definitions
  - `env.ts` - Environment variable validation
- **`inertia/`** - Frontend code
  - `pages/` - Vue components rendered as pages (home, error pages)
  - `app/app.ts` - Client entry point
  - `app/ssr.ts` - Server-side rendering entry point
- **`database/migrations/`** - Lucid migrations for schema changes
- **`bin/server.ts`** - HTTP server entry point

### Middleware Pipeline (`start/kernel.ts`)

**Server middleware** (runs on all requests):
- `container_bindings_middleware` - Custom DI container setup
- `static_middleware` - Serves public assets
- `cors_middleware` - Cross-origin headers
- `vite_middleware` - Dev HMR & asset handling
- `inertia_middleware` - Inertia integration

**Router middleware** (only on registered routes):
- `bodyparser_middleware` - JSON/form parsing
- `session_middleware` - Session handling
- `shield_middleware` - CSRF protection
- `initialize_auth_middleware` - Auth context setup

**Named middleware** (opt-in per route):
- `auth` - Requires authentication, redirects to `/login`
- `guest` - Redirect authenticated users away

## Critical Patterns

### Models & Database
- User model at [app/models/user.ts](app/models/user.ts) uses `withAuthFinder` mixin
- Primary auth strategy: email/password with scrypt hashing
- Always add `@column()` decorators for Lucid properties
- Use `@column.dateTime({ autoCreate: true })` for timestamps

### Routes & Inertia
- Routes defined in [start/routes.ts](start/routes.ts) return Inertia responses
- Use `router.on('/path').renderInertia('ComponentName')` to render Vue components
- Inertia props passed automatically to Vue via context
- SSR enabled in [config/inertia.ts](config/inertia.ts)

### Authentication
- Access auth via `ctx.auth` in routes/middleware/controllers
- User model provides `authenticateUsing()` method
- Middleware redirects unauthenticated requests to `/login`

## Development Commands

```bash
npm run dev        # Start dev server with HMR
npm run build      # Compile TypeScript → build/
npm start          # Run production server
npm test           # Run test suite
npm run lint       # Check code style
npm run typecheck  # TypeScript validation without build
npm run format     # Auto-format with Prettier
```

**Key workflow**: Edit `.ts` files → hot reload via Vite + AdonisJS HMR → test in browser

## Import Path Conventions

Use aliases defined in [package.json](package.json) `imports` field:
- `#models/*` → `app/models/*.js`
- `#middleware/*` → `app/middleware/*.js`
- `#config/*` → `config/*.js`
- `#start/*` → `start/*.js`
- Similar patterns for controllers, services, validators, etc.

**Always use aliases** for imports to maintain decoupling.

## Frontend (Vue/Inertia)

- Components in [inertia/pages/](inertia/pages/) render as full pages
- Vite config at [vite.config.ts](vite.config.ts) with Vue plugin + Inertia plugin
- Shared data (e.g., authenticated user) configured in [config/inertia.ts](config/inertia.ts)
- Tailwind CSS available in [inertia/css/app.css](inertia/css/app.css)

## TypeScript & Compilation

- Source: `**/*.ts` (excludes `inertia/` and `node_modules`)
- Output: `build/` directory (compiled `.js`)
- `adonisrc.ts` defines app configuration, services, providers
- Frontend TypeScript at [inertia/tsconfig.json](inertia/tsconfig.json) separate from backend

## Testing

- Test setup in [bin/test.ts](bin/test.ts)
- Use `@japa/runner` + `@japa/plugin-adonisjs` for test framework
- Run: `npm test`

## Security Conventions

- CSRF protection via Shield middleware (enforced by default)
- Session cookies: `httpOnly=true`, `secure` in production, `sameSite=lax`
- Auth passwords never serialized (`serializeAs: null` on User model)
- Use environment variables for secrets (`.env` loaded via `start/env.ts`)

## File Generation Pattern

When creating new features:
1. **Model** → `app/models/NewModel.ts` with Lucid decorators
2. **Migration** → `database/migrations/timestamp_create_table.ts`
3. **Route** → Add to `start/routes.ts`
4. **Component** → `inertia/pages/NewPage.vue`
5. **Middleware** (if needed) → `app/middleware/NewMiddleware.ts`, register in `start/kernel.ts`

## Common Gotchas

- After migrations, run `node ace migrate` before testing
- Frontend type safety: Vue components receive Inertia props as objects; use TypeScript interfaces for type hints
- Middleware order matters in `kernel.ts`; don't skip CSRF/session middleware
- Build output goes to `build/`; don't edit compiled `.js` files directly
