import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import UnoCSS from 'unocss/astro'
import vue from '@astrojs/vue'
import compress from 'astro-compress'

export default defineConfig({
  site: 'https://robertschimanek.com/',
  output: 'static',
  server: {
    port: 1986,
  },
  integrations: [
    mdx(),
    sitemap(),
    UnoCSS({
      injectReset: true,
    }),
    vue(),
    compress({
      CSS: true,
      HTML: false,
      Image: true,
      JavaScript: false,
      SVG: false,
      Map: false,
    }),
  ],
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light-default',
        dark: 'github-dark-default',
      },
      wrap: true,
    },
  },
})
