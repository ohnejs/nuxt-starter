<script setup lang="ts">
// `ohne.ts` holds the types the CMS writes, so `fields` matches the block in `apps/backend/blocks/`.
import type { Blocks } from '~~/ohne';

// `OhneBlocks` in the page renders this component for every `Hero` block, by its name.
// Keep one root element: the live preview outlines the block through it.
defineProps<{ fields: Blocks['Hero'] }>();
</script>

<template>
  <section class="hero">
    <h2>{{ fields.heading }}</h2>
    <p v-if="fields.lead"><OhneRichText :value="fields.lead" inline /></p>
  </section>
</template>
