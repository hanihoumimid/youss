# 🎨 Handball93 - Conventions de Codage

## Conventions TypeScript/JavaScript

### Imports & Aliases
```typescript
// ✅ CORRECT - Utilisez les aliases
import Post from '#models/post'
import PostsController from '#controllers/posts_controller'
import env from '#start/env'
import { defineConfig } from '@adonisjs/inertia'

// ❌ INCORRECT - Evitez les chemins relatifs
import Post from '../../app/models/post'
```

### Naming Conventions
```typescript
// Classes et Constructeurs
class PostsController { }
class Category extends BaseModel { }

// Fonctions et Méthodes
async fetchPosts() { }
async findBySlug(slug: string) { }

// Constants
const CATEGORIES_PER_PAGE = 12
const DEFAULT_SORT_ORDER = 'desc'

// Variables
const recentPosts = posts.slice(0, 5)
let selectedCategory = ref<string | null>(null)
```

### Types & Interfaces
```typescript
// Définir les interfaces pour les props Vue
interface Post {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  coverImageUrl: string
  category: Category
  publishedAt: string
  authorName: string
  viewsCount: number
}

interface Props {
  featured: Post[]
  recent: Post[]
  categories: Category[]
}

// Utiliser dans les composants
const props = defineProps<Props>()
```

---

## Conventions Vue 3

### Script Setup
```vue
<script setup lang="ts">
// Imports
import { ref, computed } from 'vue'
import { Link, Head } from '@inertiajs/vue3'

// Props avec types
interface Props {
  post: Post
}
const props = defineProps<Props>()

// Refs
const isOpen = ref(false)

// Computed
const featured = computed(() => props.posts.slice(0, 3))

// Methods
const handleClick = () => {
  isOpen.value = !isOpen.value
}
</script>
```

### Template
```vue
<template>
  <!-- Utilisez Link pour la navigation Inertia -->
  <Link href="/" class="...">Home</Link>

  <!-- Utilisez Head pour les métadonnées -->
  <Head :title="`${post.title} - Handball93`" />

  <!-- Tailwind classes -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Contenu -->
  </div>

  <!-- Transitions -->
  <transition enter-active-class="..." leave-active-class="...">
    <div v-if="isOpen">Content</div>
  </transition>

  <!-- Conditional Rendering -->
  <div v-if="posts.length > 0">
    <div v-for="post in posts" :key="post.id">{{ post.title }}</div>
  </div>
  <div v-else>No posts</div>
</template>
```

---

## Conventions Tailwind CSS

### Responsive Design
```html
<!-- Mobile-first: classe par défaut = mobile -->
<!-- Breakpoints: sm, md, lg, xl, 2xl -->
<div class="
  w-full                          <!-- Mobile: pleine largeur -->
  sm:w-1/2                        <!-- sm (640px+): moitié -->
  md:w-1/3 lg:w-1/4             <!-- md, lg, xl spécialisation -->
">
  Content
</div>

<!-- Grid responsive -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <article>Card</article>
</div>
```

### Spacing & Layout
```html
<!-- Padding & Margin -->
<div class="p-4 sm:p-6 lg:p-8">padding responsive</div>
<div class="mt-4 mb-8 mx-auto">margins</div>

<!-- Gaps in Flexbox/Grid -->
<div class="flex gap-4">items with 16px gap</div>
<div class="grid gap-6">grid with 24px gap</div>

<!-- Max Width -->
<div class="max-w-7xl mx-auto">max 80rem, centré</div>
<div class="max-w-4xl mx-auto">max 56rem, centré</div>
```

### Dark Mode & Colors
```html
<!-- Utilisez les couleurs sans dark: pour ce projet (dark mode par défaut) -->
<div class="bg-slate-900 text-white">Toujours dark</div>

<!-- Texte transparent pour glassmorphism -->
<div class="border-white/10 bg-white/5 hover:bg-white/10">
  Glassmorphic effect
</div>

<!-- Gradients -->
<div class="bg-gradient-to-r from-orange-500 to-red-500">gradient</div>
<div class="bg-gradient-to-b from-transparent to-slate-900">overlay</div>
```

### Transitions & Hover
```html
<!-- Standard transitions -->
<div class="transition-all duration-300 hover:scale-105">
  Smooth hover effect
</div>

<!-- Group hover (parent-child) -->
<div class="group">
  <img class="group-hover:scale-110 transition-transform duration-500" />
  <h3 class="group-hover:text-orange-400 transition-colors" />
</div>

<!-- Shadow effects -->
<div class="hover:shadow-lg hover:shadow-orange-500/50 transition-all">
  Card with shadow
</div>
```

---

## Conventions AdonisJS

### Controllers
```typescript
import type { HttpContext } from '@adonisjs/core/http'
import Post from '#models/post'

export default class PostsController {
  // GET / - Rendre Inertia
  async index({ inertia }: HttpContext) {
    const posts = await Post.query()
      .preload('category')           // Eager load
      .orderBy('publishedAt', 'desc')
      .limit(12)

    return inertia.render('home', {
      featured: posts.slice(0, 3),
      recent: posts,
    })
  }

  // GET /posts/:slug - Affichage avec données connexes
  async show({ params, inertia }: HttpContext) {
    const post = await Post.query()
      .where('slug', params.slug)
      .preload('category')
      .firstOrFail()  // Throw 404 if not found

    const relatedPosts = await Post.query()
      .where('categoryId', post.categoryId)
      .where('id', '!=', post.id)
      .orderBy('publishedAt', 'desc')
      .limit(3)

    return inertia.render('post/show', { post, relatedPosts })
  }
}
```

### Models
```typescript
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class Post extends BaseModel {
  // Déclarations de colonnes
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare slug: string

  // Timestamps auto-gérés
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relations
  @belongsTo(() => Category)
  declare category: BelongsTo<typeof Category>
}
```

### Migrations
```typescript
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'posts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('title').notNullable()
      table.string('slug').notNullable().unique()
      table.text('content').notNullable()
      table.timestamp('published_at').nullable()
      table.integer('category_id').unsigned().notNullable()
        .references('id').inTable('categories').onDelete('CASCADE')
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
```

### Seeders
```typescript
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Post from '#models/post'

export default class extends BaseSeeder {
  async run() {
    await Post.createMany([
      {
        title: 'Article Title',
        slug: 'article-title',
        // ... autres propriétés
      },
    ])
  }
}
```

---

## Conventions Routes

### Route Structure
```typescript
// start/routes.ts

// Routes publiques
router.get('/', [PostsController, 'index'])
router.get('/posts/:slug', [PostsController, 'show'])
router.get('/category/:slug', [PostsController, 'category'])

// Routes protégées
router.group(() => {
  router.get('/dashboard', [DashboardController, 'show'])
  router.post('/posts', [PostsController, 'store'])
}).middleware(['auth'])

// Routes API (optionnel)
router.group(() => {
  router.get('/posts', [ApiPostsController, 'index'])
}).prefix('/api')
```

---

## Git Conventions

### Commit Messages
```
feat: add article filtering by category
fix: resolve navbar mobile menu toggle
refactor: simplify post query logic
docs: update implementation guide
style: improve article card styling
chore: update dependencies
```

### Branch Names
```
feature/article-search
bugfix/navbar-layout
refactor/database-queries
docs/api-documentation
```

---

## Performance Tips

### Database Optimization
```typescript
// ❌ N+1 Query Problem
const posts = await Post.all()
posts.forEach(post => {
  const category = await Category.find(post.categoryId) // BAD!
})

// ✅ Eager Load
const posts = await Post.query().preload('category')
```

### Vue Optimization
```vue
<!-- ❌ Avoid unnecessary re-renders -->
<div :key="Math.random()">Item</div>

<!-- ✅ Use unique, stable keys -->
<div v-for="post in posts" :key="post.id">{{ post.title }}</div>

<!-- ✅ Use computed for expensive calculations -->
<div>{{ expensiveComputation }}</div> <!-- Recalculated when deps change -->

<!-- ❌ Instead of -->
<div>{{ posts.map(...).filter(...).sort(...) }}</div>
```

### Image Optimization
```html
<!-- ✅ Specify width for layout shift prevention -->
<img 
  src="image.jpg" 
  alt="Description"
  width="400" 
  height="300"
  class="w-full h-auto"
/>

<!-- ✅ Use modern formats with fallback -->
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="..." />
</picture>
```

---

## ESLint & Prettier

Configurés automatiquement par AdonisJS. Commandes:
```bash
npm run lint      # Vérifier les erreurs
npm run format    # Auto-formater le code
```

## Testing

Utilisez `@japa/runner` + `@japa/plugin-adonisjs`:
```typescript
// tests/posts.spec.ts
test('should fetch all posts', async ({ client }) => {
  const response = await client.get('/')
  response.assertStatus(200)
})
```

---

**Merci de suivre ces conventions pour la cohérence du projet ! 🎯**
