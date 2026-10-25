export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',
  // `@ohnejs/nuxt` reads each page from the CMS, fills the `<head>` and joins the live preview.
  // See https://ohne.dev/docs/cms/frameworks#nuxt
  modules: ['@ohnejs/nuxt'],
  // Your API in development. `NUXT_OHNE_API` replaces it when the server starts.
  ohne: { api: 'http://localhost:9001' },
  css: ['~/assets/site.css'],
  // The title of a page that has none of its own, like the error page.
  app: { head: { title: 'Website' } },
});
