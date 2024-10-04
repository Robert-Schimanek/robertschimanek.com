<script lang="ts" setup>
import { useWindowScroll, useWindowSize } from '@vueuse/core'
import { computed, onMounted, ref, unref } from 'vue'
import ThemeToggle from './ThemeToggle.vue'
import siteConfig from '@/site-config'
import { getLinkTarget } from '@/utils/link'

const navLinks = siteConfig.header.navLinks || []

const socialLinks = computed(() => {
  return siteConfig.socialLinks.filter((link: Record<string, any>) => {
    if (link.header && typeof link.header === 'boolean') {
      return link
    }
    else if (link.header && typeof link.header === 'string') {
      link.icon = link.header.includes('i-') ? link.header : link.icon
      return link
    }
    else {
      return false
    }
  })
})

const { y: scroll } = useWindowScroll()
const { width } = useWindowSize()

const showSecondLine = computed(() => {
  const threshold = width.value < 640 ? 150 : 180 // 640px is typically used for 'sm' breakpoint
  return scroll.value > threshold
})

const oldScroll = ref(unref(scroll))

const currentRouteName = ref('Page')

onMounted(() => {
  const updateRouteName = () => {
    const path = window.location.pathname
    if (path === '/')
      currentRouteName.value = 'Robert Schimanek'
    else if (path.startsWith('/blog/expertise'))
      currentRouteName.value = 'Expertise'
    else if (path.includes('machine-learning'))
      currentRouteName.value = 'Machine Learning'
    else if (path.includes('data-science'))
      currentRouteName.value = 'Data Science'
    else if (path.includes('full-stack-development'))
      currentRouteName.value = 'Full Stack Development'
    else if (path.includes('data-visualization'))
      currentRouteName.value = 'Data Visualization'
    else if (path.startsWith('/blog/publications'))
      currentRouteName.value = 'Publications'
    else if (path.startsWith('/blog'))
      currentRouteName.value = 'Blog'
    else if (path.startsWith('/projects'))
      currentRouteName.value = 'Projects'
    else currentRouteName.value = 'Page'
  }

  updateRouteName()

  // Update route name on navigation
  window.addEventListener('popstate', updateRouteName)

  const navMask = document.querySelector('.nav-drawer-mask') as HTMLElement

  navMask?.addEventListener('touchmove', (event) => {
    event.preventDefault()
  })

  const headerEl = document.querySelector('#header') as HTMLElement
  if (!headerEl)
    return

  if (document.documentElement.scrollTop > 100)
    headerEl.classList.add('header-bg-blur')

  window.addEventListener('scroll', () => {
    if (scroll.value < 150) {
      headerEl.classList.remove('header-hide')
      return
    }

    if (scroll.value - oldScroll.value > 10) {
      headerEl.classList.add('header-hide')
      oldScroll.value = scroll.value
    }

    if (oldScroll.value - scroll.value > 150) {
      headerEl.classList.remove('header-hide')
      oldScroll.value = scroll.value
    }
  })
})

function toggleNavDrawer() {
  const drawer = document.querySelector('.nav-drawer-left') as HTMLElement
  const mask = document.querySelector('.nav-drawer-left-mask') as HTMLElement
  if (!drawer || !mask)
    return
  if (drawer.style.transform === `translateX(0%)`) {
    drawer.style.transform = `translateX(-100%)`
    mask.style.display = `none`
  }
  else {
    drawer.style.transform = `translateX(0%)`
    mask.style.display = `block`
  }
}
</script>

<template>
  <header
    id="header" :class="{ 'header-bg-blur': scroll > 20 }"
    class="!fixed bg-transparent z-899 w-full small-margin flex flex-col justify-center items-center relative"
  >
    <div class="w-full max-w-[1000px] flex justify-between items-center h-16.2">
      <!-- Existing header content -->
      <div class="flex items-center h-full">
        <a href="/" mr-6 aria-label="Header Logo Image">
          <img width="32" height="32" :src="siteConfig.header.logo.src" :alt="siteConfig.header.logo.alt" rd-1.5>
        </a>
        <nav class="sm:flex hidden flex-wrap gap-x-7 position-initial flex-row">
          <a
            v-for="link in navLinks" :key="link.text" :aria-label="`${link.text}`" :target="getLinkTarget(link.href)"
            nav-link :href="link.href"
          >
            {{ link.text }}
          </a>
        </nav>
      </div>
      <div class="flex gap-x-7 items-center">
        <a
          v-for="link in socialLinks" :key="link.text" :aria-label="`${link.text}`" :class="link.icon" nav-link
          :target="getLinkTarget(link.href)" :href="link.href"
        />
        <ThemeToggle />
        <div v-if="!showSecondLine" sm:hidden h-full flex items-center @click="toggleNavDrawer()">
          <i class="custom-menu-icon-size i-heroicons-solid-menu-alt-4" />
        </div>
      </div>
    </div>

    <!-- New line with duplicated content -->
    <div
      v-show="showSecondLine"
      class="w-full max-w-[1000px] flex justify-between items-center h-16.2 transition-opacity duration-300"
      :class="{ 'opacity-0': !showSecondLine, 'opacity-100': showSecondLine }"
    >
      <div class="flex items-center h-full">
        <h1 class="text-lg font-semibold">
          {{ currentRouteName }}
        </h1>
      </div>
      <div class="flex gap-x-7 items-center">
        <div h-full flex items-center @click="toggleNavDrawer()">
          <i class="custom-menu-icon-size i-heroicons-solid-menu-alt-4" />
        </div>
      </div>
    </div>
  </header>

  <!-- Rest of the template remains unchanged -->
  <nav
    class="nav-drawer-left sm:hidden" style="view-transition-name: nav-drawer-left;"
  >
    <i class="custom-menu-icon-size i-heroicons-solid-menu-alt-4" />
    <a
      v-for="link in navLinks" :key="link.text" :aria-label="`${link.text}`" :target="getLinkTarget(link.href)"
      nav-link :href="link.href" @click="toggleNavDrawer()"
    >
      {{ link.text }}
    </a>
  </nav>
  <div class="nav-drawer-left-mask" @click="toggleNavDrawer()" />
</template>

<style scoped>
.custom-menu-icon-size {
  font-size: 1.5rem; /* or 22px */
  width: 1.5rem;
  height: 1.5rem;
}

.header-hide {
  transform: translateY(-50%);
  transition: transform 0.4s ease;
}

.header-bg-blur {
  --at-apply: backdrop-blur-sm;
}

.nav-drawer-left,
.nav-drawer-right {
  --at-apply: box-border fixed h-screen z-999 top-0 min-w-32vw max-w-50vw
    bg-drawer p-6 text-lg flex flex-col gap-5 transition-all opacity-95;
  transition:
    transform 0.2s ease-in-out,
    background-color 0.2s ease;
  /* backdrop-filter: blur(10px); */
  /* -webkit-backdrop-filter: blur(10px); */
}

.nav-drawer-left {
  left: 0;
  transform: translateX(-100%);
}

.nav-drawer-right {
  right: 0;
  transform: translateX(100%);
}

.nav-drawer-left-mask,
.nav-drawer-right-mask {
  display: none;
  --at-apply: transition-all bg-opacity-50;
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.1);
  z-index: 998;
}
</style>
