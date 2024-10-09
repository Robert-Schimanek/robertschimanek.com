<script setup lang="ts">
import { ref } from 'vue'

interface ToolkitItem {
  'header': string
  'description': string
  'tech-stack': string[]
}

interface Props {
  toolkit: ToolkitItem[]
}

// Change this line
const { toolkit } = defineProps<Props>()
const openIndex = ref<number | null>(null)

function toggleAccordion(index: number) {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<template>
  <div class="flex flex-col flex-grow lg:p-0 divide-gray-600 divide-opacity-50 divide-y-1">
    <div v-for="(item, index) in toolkit" :key="index" class="divide-gray-600 divide-opacity-50 divide-y-1">
      <button
        class="flex items-center justify-between w-full text-left link-hover-color expertise-card-link "
        @click="toggleAccordion(index)"
      >
        <span class="flex-grow lg:text-xl text-lg lg:mb-2 mb-2 lg:mt-2 mt-3 text-wrap break-words">{{ item.header }}</span>
        <svg
          class="w-5 h-5 ml-2 flex-shrink-0 transition-transform duration-500"
          :class="{ 'rotate-180': openIndex === index }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 25"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        v-show="openIndex === index"
        class="mt-2 p-3 border-t border-gray-200"
      >
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div class="description">
            <p>{{ item.description }}</p>
          </div>
          <div class="tech-stack flex justify-center">
            <div class="tech-stack-carousel overflow-x-auto whitespace-nowrap pb-2 cursor-grab">
              <div class="inline-flex gap-4">
                <span
                  v-for="tech in item['tech-stack']"
                  :key="tech"
                  class="tech-icon flex-shrink-0"
                >
                  <i :class="tech" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.link-hover-color {
  &:hover {
    @apply text-[#ff4438] transition-colors duration-400;
  }
  &:not(:hover) {
    @apply transition-colors duration-400;
  }
}

.tech-icon {
  @apply text-2xl inline-block;
}

.tech-stack-carousel {
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.tech-stack-carousel::-webkit-scrollbar {
  display: none;
}

.description {
  @apply mb-4 lg:mb-0;
}

.tech-stack {
  @apply flex items-center;
}
</style>
