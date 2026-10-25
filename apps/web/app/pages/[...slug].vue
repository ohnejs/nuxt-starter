<script setup lang="ts">
// The `ohne` middleware asks the CMS what this path shows, once, before the page renders.
// A redirect or a missing page answers with its own status code, so this page only renders content.
definePageMeta({ middleware: 'ohne' });

const page = useOhnePage();
</script>

<template>
  <main v-if="page?.kind === 'page' && page.collection === 'Pages'">
    <h1>{{ page.record.title }}</h1>
    <OhneBlocks :blocks="page.record.content" />
  </main>
  <main v-else-if="page?.kind === 'notFound' && page.page">
    <h1>{{ page.page.title }}</h1>
    <OhneBlocks :blocks="page.page.content" />
  </main>
</template>
