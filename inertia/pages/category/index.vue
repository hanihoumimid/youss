<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3'
import { ArrowLeft } from 'lucide-vue-next'
import AppLayout from '../../layouts/app.vue'
import ArticleCard from '../../components/article-card.vue'

interface Category {
  id: number
  name: string
  slug: string
  color: string
  description: string | null
}

interface Post {
  id: number
  title: string
  slug: string
  excerpt: string
  coverImageUrl: string
  category: Category
  publishedAt: string
  viewsCount: number
}

interface Props {
  category: Category
  posts: Post[]
  allCategories: Category[]
}

defineProps<Props>()
</script>

<template>
  <Head :title="`${category.name} - Handball93`" />

  <AppLayout>
    <!-- Back Button -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
      <Link href="/" class="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors">
        <ArrowLeft class="w-4 h-4" />
        Retour
      </Link>
    </div>

    <!-- Category Header -->
    <section class="bg-gradient-to-r from-slate-800 to-slate-700 py-16 border-b border-white/10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center gap-4 mb-4">
          <div
            class="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center font-bold text-white text-xl"
          >
            {{ category.name.charAt(0).toUpperCase() }}
          </div>
          <span class="px-3 py-1 text-xs font-bold text-white rounded-full bg-gradient-to-r from-orange-500 to-red-500">
            {{ category.name }}
          </span>
        </div>

        <h1 class="text-4xl md:text-5xl font-bold text-white mb-3">{{ category.name }}</h1>
        <p v-if="category.description" class="text-gray-300 text-lg">{{ category.description }}</p>

        <div class="mt-6 text-sm text-gray-400">{{ posts.length }} article{{ posts.length !== 1 ? 's' : '' }}</div>
      </div>
    </section>

    <!-- Category Navigation -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex gap-2 overflow-x-auto pb-4">
        <Link
          href="/"
          class="px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap bg-white/10 text-gray-300 hover:bg-white/20 transition-all"
        >
          Tous les articles
        </Link>

        <Link
          v-for="cat in allCategories"
          :key="cat.id"
          :href="`/category/${cat.slug}`"
          :class="[
            'px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all',
            cat.id === category.id
              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
              : 'bg-white/10 text-gray-300 hover:bg-white/20',
          ]"
        >
          {{ cat.name }}
        </Link>
      </div>
    </div>

    <!-- Posts Grid -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div v-if="posts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ArticleCard v-for="post in posts" :key="post.id" :post="post" />
      </div>
      <div v-else class="text-center py-16">
        <p class="text-gray-400 text-lg">Aucun article dans cette catégorie pour le moment.</p>
        <Link
          href="/"
          class="inline-block mt-6 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all"
        >
          Retour à l'accueil
        </Link>
      </div>
    </section>
  </AppLayout>
</template>
