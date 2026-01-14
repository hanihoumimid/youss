<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3'
import { Clock, Eye, Share2, ArrowLeft } from 'lucide-vue-next'
import AppLayout from '~/layouts/app.vue'
import ArticleCard from '~/components/article-card.vue'

interface Category {
  id: number
  name: string
  slug: string
  color: string
}

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
  post: Post
  relatedPosts: Post[]
}

defineProps<Props>()

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const readingTime = (content: string) => {
  const words = content.split(/\s+/).length
  const minutes = Math.ceil(words / 200)
  return `${minutes} min`
}
</script>

<template>
  <Head :title="`${post.title} - Handball93`" />

  <AppLayout>
    <!-- Back Button -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
      <Link href="/" class="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors">
        <ArrowLeft class="w-4 h-4" />
        Retour
      </Link>
    </div>

    <!-- Hero Section -->
    <section class="relative h-96 overflow-hidden">
      <img :src="post.coverImageUrl" :alt="post.title" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

      <!-- Overlay Content -->
      <div class="absolute bottom-0 left-0 right-0 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="flex items-center gap-3 mb-4">
          <span class="px-3 py-1 text-xs font-bold text-white rounded-full bg-gradient-to-r from-orange-500 to-red-500">
            {{ post.category.name }}
          </span>
        </div>
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
          {{ post.title }}
        </h1>
        <div class="flex items-center gap-6 text-gray-300 text-sm">
          <div class="flex items-center gap-2">
            <Clock class="w-4 h-4" />
            {{ readingTime(post.content) }}
          </div>
          <div>{{ formatDate(post.publishedAt) }}</div>
          <div class="flex items-center gap-2">
            <Eye class="w-4 h-4" />
            {{ post.viewsCount }}
          </div>
          <div class="text-gray-400">par {{ post.authorName }}</div>
        </div>
      </div>
    </section>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <!-- Main Content -->
        <div class="lg:col-span-2">
          <div class="prose prose-invert max-w-none mb-12">
            <p class="text-lg text-gray-300 leading-relaxed whitespace-pre-wrap">{{ post.content }}</p>
          </div>

          <!-- Share Section -->
          <div class="border-t border-white/10 pt-8 flex items-center gap-4">
            <span class="text-gray-400 flex items-center gap-2">
              <Share2 class="w-5 h-5" />
              Partager
            </span>
            <a
              href="#"
              class="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm font-medium"
            >
              Facebook
            </a>
            <a
              href="#"
              class="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm font-medium"
            >
              Twitter
            </a>
            <a
              href="#"
              class="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm font-medium"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <!-- Sidebar -->
        <aside class="lg:sticky lg:top-24 lg:self-start">
          <!-- Related Articles -->
          <div class="bg-gradient-to-br from-white/5 to-white/[2%] border border-white/10 rounded-2xl p-6">
            <h3 class="text-xl font-bold mb-6">Articles similaires</h3>
            <div class="space-y-4">
              <Link
                v-for="relatedPost in relatedPosts"
                :key="relatedPost.id"
                :href="`/posts/${relatedPost.slug}`"
                class="block group p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <p class="text-sm font-semibold text-white group-hover:text-orange-400 transition-colors line-clamp-2">
                  {{ relatedPost.title }}
                </p>
                <p class="text-xs text-gray-500 mt-2">{{ formatDate(relatedPost.publishedAt) }}</p>
              </Link>
            </div>
          </div>

          <!-- Newsletter CTA -->
          <div class="mt-6 bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-2xl p-6">
            <h3 class="font-bold mb-2">Actualités en direct</h3>
            <p class="text-sm text-gray-300 mb-4">
              Recevez les dernières actus du handball en Seine-Saint-Denis directement dans votre boîte.
            </p>
            <input
              type="email"
              placeholder="Votre email"
              class="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:border-orange-500 transition-colors mb-3"
            />
            <button class="w-full px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold text-sm hover:shadow-lg hover:shadow-orange-500/50 transition-all">
              S'abonner
            </button>
          </div>
        </aside>
      </div>
    </div>

    <!-- More Articles Section -->
    <section v-if="relatedPosts.length > 0" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10">
      <h2 class="text-3xl font-bold mb-8">À lire aussi</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ArticleCard v-for="post in relatedPosts" :key="post.id" :post="post" />
      </div>
    </section>
  </AppLayout>
</template>
