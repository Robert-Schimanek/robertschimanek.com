<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { fetchOrcidPublications } from '@/utils/orchidRecords'

const publications = ref<any[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  // console.log('ListOrchidPosts component mounted')
  try {
    const cachedData = localStorage.getItem('orcidPublications')
    if (cachedData) {
      publications.value = JSON.parse(cachedData)
      loading.value = false
    }
    else {
      publications.value = await fetchOrcidPublications()
    }
  }
  catch (e) {
    error.value = e instanceof Error ? e.message : 'An unknown error occurred'
  }
  finally {
    loading.value = false
  }
})

function getYear(pub: any) {
  return pub['work-summary'][0]['publication-date']?.year?.value || 'Unknown Year'
}

function isSameYear(a: any, b: any | undefined) {
  return b && getYear(a) === getYear(b)
}

function getExternalUrl(pub: any) {
  const externalIds = pub['work-summary'][0]['external-ids']?.['external-id'] || []
  const doiUrl = externalIds.find((id: any) => id['external-id-type'] === 'doi')?.['external-id-url']?.value
  return doiUrl || pub['work-summary'][0].url?.value || '#'
}
</script>

<template>
  <div>
    <p v-if="loading">
      Loading publications...
    </p>
    <p v-else-if="error">
      Error: {{ error }}
    </p>
    <ul v-else-if="publications.length > 0" class="publication-list">
      <li v-for="(pub, index) in publications" :key="index" class="publication-item">
        <div v-if="index === 0 || !isSameYear(pub, publications[index - 1])" class="year-divider">
          <span class="year-text">{{ getYear(pub) }}</span>
        </div>
        <a :href="getExternalUrl(pub)" target="_blank" rel="noopener noreferrer" class="publication-link">
          <div class="publication-content">
            <h3 class="publication-title">{{ pub['work-summary'][0].title.title.value }}</h3>
            <div class="publication-meta">
              <time>{{ getYear(pub) }}</time>
              <span v-if="pub['work-summary'][0]['journal-title']" class="journal-title">
                {{ pub['work-summary'][0]['journal-title'].value }}
              </span>
              <i class="external-link-icon i-ri-external-link-line" />
            </div>
          </div>
        </a>
      </li>
    </ul>
    <p v-else>
      No publications found.
    </p>
  </div>
</template>

<style scoped>
.publication-list {
  @apply space-y-8;
}

.publication-item {
  @apply mb-6;
}

.year-divider {
  @apply relative h-18 pointer-events-none mb-4;
}

.year-text {
  @apply absolute left-0 text-8xl font-bold opacity-10 select-none;
}

.publication-link {
  @apply block hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200 p-4;
}

.publication-content {
  @apply flex flex-col gap-2;
}

.publication-title {
  @apply text-lg font-semibold leading-tight;
}

.publication-meta {
  @apply text-sm opacity-60 flex items-center gap-2;
}

.journal-title {
  @apply italic;
}

.external-link-icon {
  @apply text-base;
}
</style>
