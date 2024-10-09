<script lang="ts" setup>
import { useWindowScroll, useWindowSize } from '@vueuse/core'
import { computed, nextTick, onMounted, ref, unref, watch } from 'vue'
import ThemeToggle from './ThemeToggle.vue'
import siteConfig from '@/site-config'
import { getLinkTarget } from '@/utils/link'

const props = defineProps<{
  pageTitle: string
}>()

const currentPageTitle = ref(props.pageTitle)

watch(() => props.pageTitle, (newTitle) => {
  currentPageTitle.value = newTitle
}, { immediate: true })

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

const showSecondLine = ref(false)

function updateShowSecondLine() {
  const threshold = width.value < 640 ? 150 : 180
  showSecondLine.value = scroll.value > threshold
}

watch([scroll, width], updateShowSecondLine)

const oldScroll = ref(unref(scroll))

let scrollPosition = 0

const isNavDrawerOpen = ref(false)

onMounted(() => {
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

  // Check initial scroll position
  nextTick(() => {
    updateShowSecondLine()
  })
})

function toggleNavDrawer() {
  isNavDrawerOpen.value = !isNavDrawerOpen.value
  const drawer = document.querySelector('.nav-drawer-top') as HTMLElement
  const mask = document.querySelector('.nav-drawer-top-mask') as HTMLElement
  if (!drawer || !mask)
    return
  if (isNavDrawerOpen.value) {
    scrollPosition = window.pageYOffset
    drawer.style.transform = `translateY(0%)`
    mask.style.display = `block`
    document.body.classList.add('drawer-open')
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollPosition}px`
    document.body.style.width = '100%'
  }
  else {
    drawer.style.transform = `translateY(-100%)`
    mask.style.display = `none`
    document.body.classList.remove('drawer-open')
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.width = ''
    window.scrollTo(0, scrollPosition)
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
        <h1 :class="{ 'text-lg font-semibold': currentPageTitle !== 'Robert Schimanek', 'lg:text-3xl text-2xl font-bold text-[#ff4438]': currentPageTitle === 'Robert Schimanek' }">
          {{ currentPageTitle }}
        </h1>
      </div>
      <div class="flex gap-x-7 items-center">
        <div h-full flex items-center @click="toggleNavDrawer()">
          <i class="custom-menu-icon-size i-heroicons-solid-menu-alt-4" />
        </div>
      </div>
    </div>
  </header>

  <!-- Modified nav drawer to come from top -->
  <nav
    v-show="isNavDrawerOpen"
    class="nav-drawer-top sm:hidden"
    style="view-transition-name: nav-drawer-top;"
  >
    <div class="nav-drawer-content">
      <div class="nav-drawer-inner">
        <div class="nav-drawer-header">
          <i class="custom-menu-icon-size i-heroicons-solid-x-mark" @click="toggleNavDrawer()" />
        </div>
        <div class="nav-drawer-links lg:gap-y-0 gap-y-5 lg:-mt-20 -mt-15">
          <a
            href="/"
            class="nav-drawer-link"
            :class="{ 'text-[#ff4438]': currentPageTitle === 'Robert Schimanek' }"
            @click="toggleNavDrawer()"
          >
            <p class="lg:text-96px text-left text-40px font-extrabold">Robert Schimanek</p>
          </a>
          <a
            v-for="link in navLinks"
            :key="link.text"
            :aria-label="`${link.text}`"
            :target="getLinkTarget(link.href)"
            :href="link.href"
            class="nav-drawer-link"
            :class="{ 'text-[#ff4438]': link.text === currentPageTitle }"
            @click="toggleNavDrawer()"
          >
            <p class="lg:text-96px text-left text-40px font-extrabold">
              {{ link.text }}
            </p>
          </a>
        </div>
      </div>
    </div>
  </nav>
  <div v-show="isNavDrawerOpen" class="nav-drawer-top-mask" @click="toggleNavDrawer()" />
</template>

<style scoped>
.header-vanish {
  transform: translateY(-50%);
  transition: 0s;
}

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

.nav-drawer-top {
  --at-apply: box-border fixed w-screen h-screen z-999 left-0 bg-drawer flex
    flex-col transition-all opacity-95;
  transition:
    transform 0.3s ease-in-out,
    background-color 0.2s ease;
  top: 0;
  transform: translateY(-100%);
}

.nav-drawer-content {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 2rem;
}

.nav-drawer-inner {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1000px;
}

.nav-drawer-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2rem;
}

.nav-drawer-links {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: top;
  flex-grow: 1;
  padding-left: 1rem;
}

.nav-drawer-top a {
  font-size: 1.5rem;
  text-align: center;
}

.nav-drawer-top-mask {
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

:global(body.drawer-open) {
  overflow: hidden;
}

.nav-drawer-link {
  transition: color 0.3s ease;
  font-size: 5rem;
}

.nav-drawer-link:hover {
  color: #ff4438;
}

.header-vanish {
  opacity: 0;
  transform: translateY(-100%);
  transition:
    opacity 0s,
    transform 0s;
}
</style>
