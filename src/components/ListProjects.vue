<script lang="ts" setup>
import ProjectTechnologies from './ProjectTechnologies.vue'

defineProps<{
  list: {
    text: string
    description?: string
    icon?: string
    href: string
    technologies?: { name: string, icon: string }[]
  }[]
}>()
</script>

<template>
  <ul grid="~ cols-1 sm:cols-2 gap-4">
    <template v-if="!list || list.length === 0">
      <div py10 opacity-50 text-lg>
        nothing here yet.
      </div>
    </template>
    <li
      v-for="project in list"
      :key="project.text"
      class="container-link w-full flex flex-col rd-2 hover:shadow-md duration-300 project-tile"
    >
      <a class="flex items-start mb-2" target="_blank" :href="project.href" :aria-label="project.text">
        <div class="mr-4 flex-shrink-0">
          <i class="text-4xl inline-block" :class="project.icon || 'i-carbon-unknown'" />
        </div>
        <div class="font-normal lh-tight flex-1">
          <div class="text-lg font-semibold hover:text-main">{{ project.text }}</div>
          <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ project.description }}</div>
          <ProjectTechnologies
            v-if="project.technologies"
            :technologies="project.technologies"
            class="mt-2 project-technologies"
          />
        </div>
      </a>
    </li>
  </ul>
</template>

<style scoped>
.project-tile .project-technologies {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-tile:hover .project-technologies {
  opacity: 1;
}
</style>
