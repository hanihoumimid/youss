<script setup lang="ts">
import { Link, Head } from '@inertiajs/vue3'
import { ref, computed } from 'vue'
import { ArrowRight, TrendingUp } from 'lucide-vue-next'
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
  coverImageUrl: string
  category: Category
  publishedAt: string
  viewsCount: number
}

interface Props {
  featured: Post[]
  recent: Post[]
  categories: Category[]
}

const props = defineProps<Props>()

const selectedCategory = ref<string | null>(null)

const filteredPosts = computed(() => {
  if (!selectedCategory.value) {
    return props.recent
  }
  return props.recent.filter((post) => post.category.slug === selectedCategory.value)
})

const mainPost = computed(() => props.featured[0])
const sidebarPosts = computed(() => props.featured.slice(1, 3))
</script>

<template>
  <Head title="Handball93 - Accueil" />

  <AppLayout>
    <!-- Hero Section Magazine -->
    <section class="relative overflow-hidden">
      <div v-if="mainPost" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Main Featured Article -->
          <Link
            :href="`/posts/${mainPost.slug}`"
            class="lg:col-span-2 group relative h-96 rounded-2xl overflow-hidden cursor-pointer"
          >
            <img
              :src="mainPost.coverImageUrl"
              :alt="mainPost.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            <div
              class="absolute bottom-0 left-0 right-0 p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
            >
              <div class="flex items-center gap-2 mb-3">
                <span
                  :style="{ backgroundColor: `var(--${mainPost.category.color})` }"
                  class="px-3 py-1 text-xs font-bold text-white rounded-full bg-orange-500"
                >
                  {{ mainPost.category.name }}
                </span>
              </div>
              <h1 class="text-3xl font-bold text-white mb-2 line-clamp-2">{{ mainPost.title }}</h1>
              <p class="text-gray-300 text-sm line-clamp-2">{{ mainPost.excerpt }}</p>
            </div>
          </Link>

          <!-- Sidebar Featured Articles -->
          <div class="space-y-4">
            <Link
              v-for="post in sidebarPosts"
              :key="post.id"
              :href="`/posts/${post.slug}`"
              class="block group p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all"
            >
              <img
                :src="post.coverImageUrl"
                :alt="post.title"
                class="w-full h-32 object-cover rounded-lg mb-3 group-hover:shadow-lg transition-all"
              />
              <span class="text-xs font-bold text-orange-400">{{ post.category.name }}</span>
              <h3 class="font-semibold text-white mt-2 line-clamp-2 group-hover:text-orange-400 transition-colors">
                {{ post.title }}
              </h3>
              <p class="text-xs text-gray-400 mt-1">{{ new Date(post.publishedAt).toLocaleDateString('fr-FR') }}</p>
            </Link>
          </div>
        </div>
      </div>
    </section>

    <!-- Section "À ne pas manquer" - Bento Grid -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="mb-12">
        <h2 class="text-4xl font-bold mb-2 flex items-center gap-3">
          <TrendingUp class="w-8 h-8 text-orange-500" />
          À ne pas manquer
        </h2>
        <p class="text-gray-400">Les articles qui font le buzz du handball 93</p>
      </div>

      <!-- Bento Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-max">
        <Link
          v-for="(post, idx) in featured"
          :key="post.id"
          :href="`/posts/${post.slug}`"
          :class="[
            'group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300',
            idx === 0 && 'lg:col-span-2 lg:row-span-2',
            idx === 1 && 'md:col-span-2',
          ]"
        >
          <img
            :src="post.coverImageUrl"
            :alt="post.title"
            :class="[
              'w-full h-full object-cover group-hover:scale-110 transition-transform duration-500',
              idx === 0 ? 'h-96' : 'h-48',
            ]"
          />
          <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900 opacity-60 group-hover:opacity-80 transition-opacity" />
          <div class="absolute bottom-0 left-0 right-0 p-6">
            <span class="text-xs font-bold text-orange-400">{{ post.category.name }}</span>
            <h3 class="text-lg font-bold text-white mt-2 line-clamp-2 group-hover:text-orange-400 transition-colors">
              {{ post.title }}
            </h3>
            <div class="flex items-center justify-between mt-3">
              <p class="text-xs text-gray-300">{{ new Date(post.publishedAt).toLocaleDateString('fr-FR') }}</p>
              <ArrowRight class="w-4 h-4 text-orange-400 group-hover:translate-x-2 transition-transform" />
            </div>
          </div>
        </Link>
      </div>
    </section>

    <!-- Section "Derniers posts" avec Filtres -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="mb-10">
        <h2 class="text-4xl font-bold mb-6">Derniers articles</h2>

        <!-- Category Pills Filter -->
        <div class="flex gap-2 overflow-x-auto pb-4">
          <button
            @click="selectedCategory = null"
            :class="[
              'px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all',
              selectedCategory === null
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                : 'bg-white/10 text-gray-300 hover:bg-white/20',
            ]"
          >
            Tous les articles
          </button>

          <button
            v-for="category in categories"
            :key="category.id"
            @click="selectedCategory = category.slug"
            :class="[
              'px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all',
              selectedCategory === category.slug
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                : 'bg-white/10 text-gray-300 hover:bg-white/20',
            ]"
          >
            {{ category.name }}
          </button>
        </div>
      </div>

      <!-- Articles Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ArticleCard v-for="post in filteredPosts" :key="post.id" :post="post" />
      </div>
    </section>
  </AppLayout>
</template>
