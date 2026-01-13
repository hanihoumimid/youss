<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import { Mail, Facebook, Twitter, Instagram } from 'lucide-vue-next'
import { ref } from 'vue'

const email = ref('')

const handleNewsletterSubmit = () => {
  // Handle newsletter subscription
  email.value = ''
}
</script>

<template>
  <footer class="bg-slate-950 border-t border-white/10 mt-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <!-- Newsletter Section -->
      <div
        class="mb-16 p-8 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl border border-orange-500/30 backdrop-blur-sm"
      >
        <h3 class="text-2xl font-bold mb-4">Restez informé</h3>
        <p class="text-gray-400 mb-6">Recevez les dernières actualités du handball en Seine-Saint-Denis</p>
        <form @submit.prevent="handleNewsletterSubmit" class="flex gap-2">
          <input
            v-model="email"
            type="email"
            placeholder="Votre email"
            class="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
          />
          <button
            type="submit"
            class="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all"
          >
            <Mail class="w-5 h-5" />
          </button>
        </form>
      </div>

      <!-- Footer Content -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <!-- Brand -->
        <div>
          <div class="flex items-center gap-2 mb-4">
            <div
              class="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center font-bold text-white text-sm"
            >
              H93
            </div>
            <span class="font-bold">Handball93</span>
          </div>
          <p class="text-gray-400 text-sm">
            L'actualité du handball en Seine-Saint-Denis, pour les passionnés et les curieux.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="font-semibold mb-4">Navigation</h4>
          <ul class="space-y-2 text-sm text-gray-400">
            <li>
              <Link href="/" class="hover:text-white transition-colors">Accueil</Link>
            </li>
            <li>
              <Link href="/category/equipes" class="hover:text-white transition-colors">Équipes</Link>
            </li>
            <li>
              <Link href="/category/joueurs" class="hover:text-white transition-colors">Joueurs</Link>
            </li>
            <li>
              <Link href="/category/matchs" class="hover:text-white transition-colors">Matchs</Link>
            </li>
          </ul>
        </div>

        <!-- Categories -->
        <div>
          <h4 class="font-semibold mb-4">Catégories</h4>
          <ul class="space-y-2 text-sm text-gray-400">
            <li>
              <Link href="/category/actualite" class="hover:text-white transition-colors">Actualités</Link>
            </li>
            <li>
              <Link href="/category/r1" class="hover:text-white transition-colors">R1</Link>
            </li>
            <li>
              <Link href="/category/r2" class="hover:text-white transition-colors">R2</Link>
            </li>
            <li>
              <Link href="/category/n3" class="hover:text-white transition-colors">N3</Link>
            </li>
          </ul>
        </div>

        <!-- Social -->
        <div>
          <h4 class="font-semibold mb-4">Suivez-nous</h4>
          <div class="flex gap-4">
            <a href="#" class="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
              <Facebook class="w-5 h-5" />
            </a>
            <a href="#" class="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
              <Twitter class="w-5 h-5" />
            </a>
            <a href="#" class="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
              <Instagram class="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom -->
      <div
        class="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500"
      >
        <p>&copy; 2024 Handball93. Tous droits réservés.</p>
        <div class="flex gap-6 mt-4 sm:mt-0">
          <a href="#" class="hover:text-gray-300 transition-colors">Politique de confidentialité</a>
          <a href="#" class="hover:text-gray-300 transition-colors">Conditions d'utilisation</a>
        </div>
      </div>
    </div>
  </footer>
</template>
