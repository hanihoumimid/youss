<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
import Navbar from '../components/navbar.vue'
import Footer from '../components/footer.vue'

interface Props {
  children?: any
}

defineProps<Props>()
</script>

<template>
  <Head>
    <title>Handball93 - L'actualité du handball local</title>
    <meta name="description" content="Suivez l'actualité du handball en Seine-Saint-Denis" />
  </Head>

  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
    <Navbar />

    <main class="pt-20">
      <slot />
    </main>

    <Footer />
  </div>
</template>
