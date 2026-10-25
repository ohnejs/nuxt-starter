<script setup lang="ts">
import type { NuxtError } from '#app';

// Nuxt shows this page for a path no page in the CMS answers, and when the API fails.
defineProps<{ error: NuxtError }>();
</script>

<template>
  <NuxtLayout>
    <main>
      <h1>{{ error.statusCode === 404 ? 'Page not found' : 'Something went wrong' }}</h1>
      <p><NuxtLink to="/">Back to the home page</NuxtLink></p>
    </main>
  </NuxtLayout>
</template>
