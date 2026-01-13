# Copilot Instructions for YOUSS - Handball93

## Project Overview

**YOUSS/Handball93** is an AdonisJS fullstack sports news application featuring:
- **Backend**: TypeScript-based AdonisJS 6 with PostgreSQL, ORM (Lucid), and session management
- **Frontend**: Vue 3 (Composition API) with Inertia.js (Server-Side Rendering enabled)
- **Database**: PostgreSQL (Lucid migrations)
- **Design**: Modern dark theme with Tailwind CSS, glassmorphism effects, and smooth animations

This is a sports news platform for local handball in Seine-Saint-Denis with article management, category filtering, and dynamic content display.

## Architecture

### High-Level Data Flow
1. HTTP requests → AdonisJS middleware stack → controllers → Inertia responses
2. Browser receives SSR-rendered Vue pages + Inertia props
3. Client-side navigation via Inertia (no full page reload)
4. Database operations via Lucid ORM models (Post, Category, Team)

### Key Directories & Responsibilities

- **`app/models/`** - Lucid ORM models:
  - `post.ts` - Articles with relationships to categories
  - `category.ts` - Content categories (Actualité, R1, R2, N3, Équipes, Joueurs, Matchs, Classements)
  - `team.ts` - Handball teams metadata
- **`app/controllers/`** - HTTP controllers:
  - `posts_controller.ts` - Index (home), show (article), category pages
- **`start/routes.ts`** - Route definitions:
  - `GET /` → `PostsController.index` (home with featured + all posts)
  - `GET /posts/:slug` → `PostsController.show` (article detail page)
  - `GET /category/:slug` → `PostsController.category` (filtered by category)
- **`inertia/pages/`** - Vue page components:
  - `home.vue` - Hero + Bento grid + category filter + articles grid
  - `post/show.vue` - Full article with sidebar (related posts, newsletter CTA)
  - `category/index.vue` - Category header + filtered articles
- **`inertia/components/`** - Reusable Vue components:
  - `navbar.vue` - Sticky blurred navbar with mobile menu
  - `footer.vue` - Newsletter signup + links + social
  - `article-card.vue` - Article preview card (used in grids)
  - `app.vue` (layout) - Root layout wrapping all pages
- **`inertia/css/app.css`** - Tailwind global styles
- **`database/migrations/`** - Schema:
  - `*_create_categories_table.ts` - Categories with color/slug
  - `*_create_posts_table.ts` - Articles with FK to categories
  - `*_create_teams_table.ts` - Team metadata
- **`database/seeders/`** - Initial data:
  - `01_category_seeder.ts` - 8 handball categories
  - `02_post_seeder.ts` - 8 realistic handball articles

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
- Post model at [app/models/post.ts](app/models/post.ts) has `belongsTo('category')` relationship
- Category model at [app/models/category.ts](app/models/category.ts) has `hasMany('posts')` relationship
- Always add `@column()` decorators for Lucid properties
- Use `@column.dateTime({ autoCreate: true })` for auto-timestamps
- Foreign keys use `@column()` (e.g., `categoryId`)

### Routes & Controllers
- Routes defined in [start/routes.ts](start/routes.ts) map to `PostsController` methods
- Controller methods return `inertia.render('ComponentName', { props })` with data for Vue
- Props automatically passed to Vue components via Inertia
- SSR enabled in [config/inertia.ts](config/inertia.ts) for fast initial page loads

### Vue Components & Layouts
- All pages use `AppLayout` wrapper component ([inertia/layouts/app.vue](inertia/layouts/app.vue))
- Components support dark theme with Tailwind's `dark:` utilities + inline `bg-slate-900` classes
- Hero section uses image background with gradient overlays (glassmorphism)
- Bento grids use asymmetric layouts with `lg:col-span-2 lg:row-span-2` for feature items
- Article cards use hover effects: `group-hover:scale-110` on images, gradient text on titles
- Mobile-first responsive design: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`

### Styling Conventions
- **Colors**: Orange accents (`from-orange-500 to-red-500`), slate backgrounds (`slate-900`)
- **Components**: Rounded corners (`rounded-2xl`), glassmorphic borders (`border-white/10`)
- **Effects**: Smooth transitions (`transition-all duration-300`), hover shadows (`hover:shadow-lg`)
- **Typography**: Bold headings (`font-bold`), accent links (`text-orange-400`)

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
