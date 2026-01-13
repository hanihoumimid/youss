# 🏐 Handball93 - Guide d'Implémentation

Ce guide détaille les étapes pour construire et comprendre l'application Handball93.

## 📋 Table des Matières

1. [Architecture](#architecture)
2. [Base de Données](#base-de-données)
3. [Backend (AdonisJS)](#backend-adonisjs)
4. [Frontend (Vue 3 + Inertia)](#frontend-vue-3--inertia)
5. [Styling](#styling)
6. [Points Clés](#points-clés)

---

## Architecture

### Stack Technique

```
┌─────────────────────────────────────────┐
│         Vue 3 (Client-side)             │
│    Inertia.js (SSR + SPA)               │
└─────────────────────────────────────────┘
           ↕ HTTP / Props
┌─────────────────────────────────────────┐
│      AdonisJS 6 (Backend)               │
│   Controllers → Models → Database        │
└─────────────────────────────────────────┘
           ↕
┌─────────────────────────────────────────┐
│    PostgreSQL (Database)                │
│   Posts, Categories, Teams              │
└─────────────────────────────────────────┘
```

---

## Base de Données

### Migrations

#### 1. Categories Table
```typescript
// database/migrations/1767332342760_create_categories_table.ts
- id (PK)
- name (string, unique)
- slug (string, unique)
- color (string, Tailwind class)
- description (text)
- timestamps
```

#### 2. Posts Table
```typescript
// database/migrations/1767332342761_create_posts_table.ts
- id (PK)
- title (string)
- slug (string, unique)
- excerpt (text)
- content (text)
- cover_image_url (string)
- published_at (datetime, nullable)
- category_id (FK → categories)
- author_name (string)
- views_count (integer)
- timestamps
```

#### 3. Teams Table (Optionnel)
```typescript
// database/migrations/1767332342762_create_teams_table.ts
- id (PK)
- name (string, unique)
- slug (string, unique)
- logo_url (string, nullable)
- division (string)
- description (text, nullable)
- timestamps
```

### Seeders

#### Category Seeder
- 8 catégories prédéfinies
- Chacune a une couleur d'accentuation
- Exemples: Actualité, Matchs, R1, R2, N3, Équipes, Joueurs, Classements

#### Post Seeder
- 8 articles de test réalistes
- Données basées sur le handball en Seine-Saint-Denis
- Images via Unsplash
- Distribution par catégories

---

## Backend (AdonisJS)

### Models

#### Post Model
```typescript
// app/models/post.ts
- Lucid BaseModel
- Relationships:
  - belongsTo(Category)
  - Timestamps auto-gérés
- Colonnes:
  - id, title, slug, excerpt, content, coverImageUrl
  - publishedAt, categoryId, authorName, viewsCount
  - createdAt, updatedAt
```

#### Category Model
```typescript
// app/models/category.ts
- Lucid BaseModel
- Relationships:
  - hasMany(Post)
- Colonnes:
  - id, name, slug, color, description
  - timestamps
```

#### Team Model
```typescript
// app/models/team.ts
- Lucid BaseModel
- Colonnes:
  - id, name, slug, logoUrl, division, description
  - timestamps
```

### Controllers

#### PostsController
```typescript
// app/controllers/posts_controller.ts

async index({ inertia })
  - Récupère 12 posts récents avec catégories
  - Retourne: featured (3 posts), recent (tous), categories
  - Render: home.vue

async show({ params, inertia })
  - Récupère 1 post par slug
  - Récupère 3 posts similaires (même catégorie)
  - Render: post/show.vue

async category({ params, inertia })
  - Récupère tous posts d'une catégorie par slug
  - Récupère la catégorie complète
  - Render: category/index.vue
```

### Routes

```typescript
// start/routes.ts
GET /                     → PostsController.index
GET /posts/:slug          → PostsController.show
GET /category/:slug       → PostsController.category
```

---

## Frontend (Vue 3 + Inertia)

### Layout Hierarchy

```
app.vue (Root Layout)
├── navbar.vue
├── <slot> (Page content)
└── footer.vue
```

### Pages

#### home.vue
**Sections**:
1. **Hero Section**
   - Main featured article (mainPost)
   - 2 sidebar articles (sidebarPosts)
   - Large image with gradient overlay

2. **"À ne pas manquer"**
   - Bento grid (asymétrique)
   - Premier article: lg:col-span-2 lg:row-span-2
   - Hover effects avec zoom

3. **"Derniers articles"**
   - Catégorie filter pills (reactive)
   - Grid 3 colonnes avec ArticleCard

**Props**:
```typescript
featured: Post[]       // 3 articles à la une
recent: Post[]        // Tous les articles
categories: Category[] // Pour le filtre
```

#### post/show.vue
**Sections**:
1. **Back Button**
   - Lien retour vers accueil

2. **Hero Image**
   - Full-width cover image
   - Overlay avec titre, catégorie, métadonnées

3. **Content Flex Layout**
   - Main content (lg:col-span-2)
     - Article prose
     - Share buttons
   - Sidebar (sticky lg:top-24)
     - Related posts
     - Newsletter CTA

**Props**:
```typescript
post: Post
relatedPosts: Post[]
```

#### category/index.vue
**Sections**:
1. **Category Header**
   - Grand titre + couleur
   - Description
   - Compteur d'articles

2. **Category Navigation**
   - Tous les articles
   - Filtres par catégorie

3. **Articles Grid**
   - Grid 3 colonnes
   - ArticleCard pour chaque post

**Props**:
```typescript
category: Category
posts: Post[]
allCategories: Category[]
```

### Components

#### navbar.vue
- Sticky + backdrop-blur
- Logo avec gradient
- Desktop nav (links centrés)
- Mobile menu (toggle via menu icon)
- Newsletter button CTA

#### footer.vue
- Newsletter section (gradient + input)
- 4 colonnes: Brand, Links, Categories, Social
- Bottom: Copyright + Legal links
- Social icons: Facebook, Twitter, Instagram

#### article-card.vue
- Image avec hover scale
- Category badge
- Title + excerpt (line-clamp)
- Footer: views count + date + arrow icon
- Transitions fluides

---

## Styling

### Couleurs Principales

```css
/* Primaire */
from-orange-500 to-red-500  /* Gradient orange-red */

/* Backgrounds */
bg-slate-900   /* Main background */
bg-slate-800   /* Secondary */
bg-slate-950   /* Footer */

/* Text */
text-white     /* Primary text */
text-gray-300  /* Secondary text */
text-gray-400  /* Tertiary text */
text-gray-500  /* Disabled text */

/* Accents */
text-orange-400
text-orange-500

/* Borders */
border-white/10
border-white/20
border-orange-500/30
```

### Composants Réutilisables

#### Glass Effect
```html
<div class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
  Contenu avec glassmorphism
</div>
```

#### Gradient Button
```html
<button class="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all">
  Action
</button>
```

#### Card Hover
```html
<div class="group rounded-2xl overflow-hidden hover:shadow-2xl transition-all">
  <img class="group-hover:scale-110 transition-transform duration-500" />
</div>
```

---

## Points Clés

### 1. Migrations & Seeders
```bash
node ace migrate      # Crée les tables
node ace seed:run     # Remplit avec données
```

### 2. Image URLs
- Utilisez Unsplash pour les images de test
- Format: `https://images.unsplash.com/photo-XXX?w=1000&q=80`
- Remplacez par un bucket S3/Supabase en production

### 3. Formats de Date
```typescript
new Date(date).toLocaleDateString('fr-FR')         // 13 janvier 2024
new Date(date).toLocaleDateString('fr-FR', {...})  // Customisé
```

### 4. Texte Tronqué
```tailwind
line-clamp-2    /* Max 2 lignes */
line-clamp-3    /* Max 3 lignes */
```

### 5. Transitions Vue
```vue
<transition
  enter-active-class="transition-all duration-300"
  leave-active-class="transition-all duration-300"
  enter-from-class="opacity-0 -translate-y-4"
  leave-to-class="opacity-0 -translate-y-4"
>
  <div v-if="isOpen">Content</div>
</transition>
```

### 6. Imports Alias
```typescript
import Post from '#models/post'
import PostsController from '#controllers/posts_controller'
```

### 7. SSR Considérations
- Pas d'accès à `window` dans les composants côté serveur
- Utilisez `onMounted()` pour le code côté client uniquement
- Inertia gère l'hydratation automatiquement

---

## Prochaines Étapes

### Court Terme
- [ ] Implémenter recherche par titre
- [ ] Ajouter pagination
- [ ] Système de commentaires
- [ ] Vues d'articles (tracking)

### Moyen Terme
- [ ] Authentification admin
- [ ] CMS pour créer/éditer articles
- [ ] Newsletter subscription
- [ ] Social sharing optimisé

### Long Terme
- [ ] API REST publique
- [ ] Mobile app
- [ ] Notifications push
- [ ] Analytics avancées

---

**Bon développement ! 🏐**
