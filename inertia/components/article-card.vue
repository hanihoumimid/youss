<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import { Eye, ArrowRight } from 'lucide-vue-next'

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
  coverImageUrl: string
  category: Category
  publishedAt: string
  viewsCount: number
}

interface Props {
  post: Post
}

defineProps<Props>()

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
</script>

<template>
  <Link
    :href="`/posts/${post.slug}`"
    class="group block rounded-2xl overflow-hidden bg-gradient-to-br from-white/10 to-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/10"
  >
    <!-- Image -->
    <div class="relative h-48 overflow-hidden">
      <img
        :src="post.coverImageUrl"
        :alt="post.title"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>

    <!-- Content -->
    <div class="p-5">
      <!-- Category Badge -->
      <div class="inline-block mb-3">
        <span class="px-3 py-1 text-xs font-bold text-white rounded-full bg-gradient-to-r from-orange-500 to-red-500">
          {{ post.category.name }}
        </span>
      </div>

      <!-- Title -->
      <h3 class="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-orange-400 transition-colors">
        {{ post.title }}
      </h3>

      <!-- Excerpt -->
      <p class="text-sm text-gray-400 mb-4 line-clamp-2">
        {{ post.excerpt }}
      </p>

      <!-- Footer -->
      <div class="flex items-center justify-between pt-4 border-t border-white/10">
        <div class="flex items-center gap-2 text-xs text-gray-500">
          <Eye class="w-3 h-3" />
          {{ post.viewsCount }}
        </div>
        <div class="flex items-center gap-2 text-xs text-gray-400">
          <span>{{ formatDate(post.publishedAt) }}</span>
          <ArrowRight class="w-3 h-3 text-orange-400 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  </Link>
</template>
