<script lang="ts" setup>
interface Technology {
  name: string
  icon: string
}

defineProps<{
  technologies: Technology[]
}>()
</script>

<template>
  <div class="project-technologies">
    <ul v-if="technologies && technologies.length > 0" class="flex flex-wrap gap-1 items-center">
      <li v-for="tech in technologies" :key="tech.name" class="inline-flex items-center" :data-tooltip="tech.name">
        <i class="text-lg text-gray-600 dark:text-gray-400 hover:text-main transition-colors duration-300" :class="tech.icon" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
[data-tooltip] {
  position: relative;
}
[data-tooltip]:hover::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  white-space: nowrap;
  z-index: 10;
}
</style>
