<script setup lang="ts">
interface Area {
  slug: string
  title: string
}

interface ExpertiseGroup {
  title: string
  description: string
  areas: Area[]
}

defineProps<{
  group: ExpertiseGroup
}>()
</script>

<template>
  <div class="p-0 flex flex-col flex-grow">
    <h2 class="text-3xl font-bold mb-2">
      {{ group.title }}
    </h2>
    <div class="border-t border-gray-600 border-opacity-50" />
    <p class="mb-4 flex-grow">
      {{ group.description }}
    </p>
    <div class="border-t border-gray-600 border-opacity-50">
      <div class="flex flex-col divide-gray-600 divide-opacity-50 divide-y-1">
        <div v-for="(area) in group.areas" :key="area.slug">
          <a
            :href="`/expertise/${area.slug}`"
            class=" expertise-card-link after:absolute after:inset-0 group transition-all ease-in-out duration-300 flex items-center expertise-link"
          >
            <span class="flex-grow lg:text-xl text-lg lg:mb-0 mb-3 lg:mt-0 mt-3 text-wrap break-words">{{ area.title }}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="transition-transform ease-in-out duration-300 group-hover:translate-x-1 lg:w-12 lg:h-12 w-8 h-8 text-current inline-block "
              width="18"
              height="18"
              fill="none"
              aria-hidden="true"
              viewBox="0 0 36 36"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M7.5 18h21M22.5 24l6-6M22.5 12l6 6"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
