<script lang="ts" setup>
import siteConfig from '@/site-config'
</script>

<template>
  <footer class="footer-overload w-full mt-18 p-4 pt-6 pb-8 text-sm mx-auto flex flex-col gap-4 text-dark dark:text-white">
    <!-- Line with padding -->
    <div class="w-full border-t border-main !border-op-50 my-4" />

    <!-- Two-column layout for sitemap and contact -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
      <!-- Sitemap column -->
      <div>
        <a href="/" class="block mb-2 hover:linker-hover-color">
          <p class="text-lg font-bold">Robert Schimanek</p>
        </a>
        <a href="/expertise" class="block mb-2 hover:linker-hover-color">
          <p class="text-lg font-bold">Expertise</p>
        </a>
        <a href="/projects" class="block mb-2 hover:linker-hover-color">
          <p class="text-lg font-bold">Projects</p>
        </a>
        <a href="/blog/publications" class="block mb-2 hover:linker-hover-color">
          <p class="text-lg font-bold">Publications</p>
        </a>
        <a href="/blog" class="block mb-2 hover:linker-hover-color">
          <p class="text-lg font-bold">Blog</p>
        </a>
      </div>

      <!-- Contact column -->
      <div>
        <h2 class="font-bold mb-2">
          Contact
        </h2>
        <a :href="`mailto:${'info@robertschimanek.com'}`" class="break-all email-link hover:linker-hover-color">
          <p>info@robertschimanek.com</p>
        </a>
        <a :href="`tel:${'+4915122221214432'}`" class="break-all email-link hover:linker-hover-color">
          <p>+49 151 222 21 21 44 32</p>
        </a>
      </div>
    </div>

    <!-- Line with padding -->
    <div class="w-full border-t border-main !border-op-50 my-4" />

    <!-- Copyright and links -->
    <div class="flex flex-col gap-2">
      <div>
        <span>All rights reserved &copy; {{ new Date().getFullYear() }} {{ siteConfig.author }}.</span>
      </div>
      <div class="flex gap-4">
        <a href="/this-site" class="hover:linker-hover-color">This site</a>
        <span>|</span>
        <a href="/imprint" class="hover:linker-hover-color">Imprint</a>
        <span>|</span>
        <a href="https://github.com/yourusername/yourrepository" target="_blank" rel="noopener noreferrer" class="hover:linker-hover-color">GitHub</a>
      </div>
    </div>
  </footer>
</template>

<style>
  .footer-overload {
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  overflow: hidden;
}

@media (min-width: 1000px) {
  .footer-overload {
    width: 1000px;
    margin-left: max(calc(-50vw + 50%), calc(-500px + 50%));
    margin-right: max(calc(-50vw + 50%), calc(-500px + 50%));
  }
}
</style>
