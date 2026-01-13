<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import { Menu, X } from 'lucide-vue-next'
import { ref } from 'vue'

const isOpen = ref(false)
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-900/80 border-b border-white/10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <!-- Logo -->
        <Link href="/" class="flex items-center gap-3 group">
          <div
            class="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center font-bold text-white group-hover:shadow-lg group-hover:shadow-orange-500/50 transition-all"
          >
            H93
          </div>
          <span class="text-xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
            Handball93
          </span>
        </Link>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-8">
          <Link
            href="/"
            class="text-gray-300 hover:text-white transition-colors font-medium"
          >
            Accueil
          </Link>
          <Link
            href="/category/equipes"
            class="text-gray-300 hover:text-white transition-colors font-medium"
          >
            Équipes
          </Link>
          <Link
            href="/category/joueurs"
            class="text-gray-300 hover:text-white transition-colors font-medium"
          >
            Joueurs
          </Link>
          <Link
            href="/category/matchs"
            class="text-gray-300 hover:text-white transition-colors font-medium"
          >
            Matchs
          </Link>
        </div>

        <!-- Newsletter Button -->
        <button
          class="hidden md:block px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all hover:scale-105"
        >
          S'abonner
        </button>

        <!-- Mobile Menu Button -->
        <button
          @click="isOpen = !isOpen"
          class="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <Menu v-if="!isOpen" class="w-6 h-6" />
          <X v-else class="w-6 h-6" />
        </button>
      </div>

      <!-- Mobile Menu -->
      <transition
        enter-active-class="transition-all duration-300"
        leave-active-class="transition-all duration-300"
        enter-from-class="opacity-0 -translate-y-4"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <div v-if="isOpen" class="md:hidden pb-4 border-t border-white/10 mt-4">
          <Link
            href="/"
            class="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            Accueil
          </Link>
          <Link
            href="/category/equipes"
            class="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            Équipes
          </Link>
          <Link
            href="/category/joueurs"
            class="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            Joueurs
          </Link>
          <Link
            href="/category/matchs"
            class="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            Matchs
          </Link>
          <button
            class="w-full mt-4 px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            S'abonner
          </button>
        </div>
      </transition>
    </div>
  </nav>
</template>
