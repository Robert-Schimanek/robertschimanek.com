<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import type { CollectionPosts } from '@/types'

const props = defineProps<{
  list: CollectionPosts[]
}>()

const visibleElements = ref<Set<string>>(new Set())
const elementRefs = ref<Map<string, HTMLElement>>(new Map())
const containerRef = ref<HTMLElement | null>(null)

let observer: IntersectionObserver | null = null

onMounted(() => {
  setupIntersectionObserver()
})

onUnmounted(() => {
  if (observer)
    observer.disconnect()
})

function setupIntersectionObserver() {
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const id = entry.target.id
      updateElementVisibility(id, entry.isIntersecting)
    })
  }, { rootMargin: '0px 0px -100px 0px', threshold: [0, 0.1, 1] })

  elementRefs.value.forEach((el) => {
    observer!.observe(el)
  })
}

function updateElementVisibility(id: string, isIntersecting: boolean) {
  const el = elementRefs.value.get(id)
  if (!el)
    return

  const rect = el.getBoundingClientRect()
  const viewportHeight = window.innerHeight

  if (isIntersecting && rect.top <= viewportHeight)
    visibleElements.value.add(id)
  else if (!isIntersecting && rect.top > viewportHeight)
    visibleElements.value.delete(id)
}

function getHref(post: CollectionPosts) {
  return post.data.redirect || `/posts/${post.slug}`
}

function getTarget(post: CollectionPosts) {
  return post.data.redirect ? '_blank' : '_self'
}

function getImageSrc(src: string) {
  return `${src}`
}

function setRef(el: HTMLElement | null, id: string) {
  if (el) {
    elementRefs.value.set(id, el)
    if (observer)
      observer.observe(el)
  }
}

function isVisible(id: string) {
  return visibleElements.value.has(id)
}

function getRandomPosition() {
  return {
    x: Math.random() * 100,
    y: Math.random() * 100,
  }
}
</script>

<template>
  <div ref="containerRef">
    <ul sm:min-h-38 min-h-28 mb-18>
      <template v-if="!props.list || props.list.length === 0">
        <div my-12 opacity-50>
          Loading expertise ...
        </div>
      </template>
      <li
        v-for="(post, index) in props.list"
        :key="post.id || index"
        mb-8
        class="expertise-item"
      >
        <a v-if="post && post.data" text-lg lh-tight nav-link flex="~ col gap-2" :aria-label="post.data.title" :target="getTarget(post)" :href="getHref(post)">
          <div
            :id="`text-${index}`"
            :ref="el => setRef(el, `text-${index}`)"
            flex="~ col gap-2 text-wrap"
            class="content-element"
            :class="{ visible: isVisible(`text-${index}`) }"
          >
            <span lh-normal>
              <i v-if="post.data.draft" text-base vertical-mid i-ri-draft-line />
              {{ post.data.title }}
            </span>
            <div opacity-50 text-sm ws-nowrap flex="~ gap-2 items-center">
              <i v-if="post.data.redirect" text-base i-ri-external-link-line />
              <i v-if="post.data.video" text-base i-ri:film-line />
              <span v-if="post.data.duration">{{ post.data.duration }}</span>
              <span v-if="post.data.tag">· {{ post.data.tag }}</span>
            </div>
            <div opacity-50 text-sm>{{ post.data.description }}</div>
          </div>
          <div
            v-if="post.data.image"
            :id="`image-${index}`"
            :ref="el => setRef(el, `image-${index}`)"
            class="content-element image-container"
            :class="{ visible: isVisible(`image-${index}`) }"
          >
            <img width="640" height="360" :src="getImageSrc(post.data.image.src)" class="hero-image">
            <div v-if="post.data.tech && post.data.tech.length > 0" class="tech-icons-overlay">
              <div
                v-for="tech in post.data.tech"
                :key="tech"
                class="tech-icon"
                :style="{ left: `${getRandomPosition().x}%`, top: `${getRandomPosition().y}%` }"
              >
                <i :class="tech" />
              </div>
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.content-element {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.5s ease-out,
    transform 0.5s ease-out;
}

.content-element.visible {
  opacity: 1;
  transform: translateY(0);
}

.image-container {
  position: relative;
  overflow: hidden;
}

.tech-icons-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.tech-icon {
  position: absolute;
  font-size: 2rem;
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.5s ease;
  animation: floatIcon 5s infinite alternate;
}

.tech-icon i {
  filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.5));
}

.image-container:hover .tech-icon {
  animation-play-state: paused;
}

@keyframes floatIcon {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  100% {
    transform: translate(10px, 10px) rotate(10deg);
  }
}
</style>
