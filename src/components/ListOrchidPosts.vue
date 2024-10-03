<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { fetchOrcidPublications } from '@/utils/orchidRecords'

const publications = ref<any[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const cachedData = localStorage.getItem('orcidPublications')
    if (cachedData) {
      publications.value = JSON.parse(cachedData)
      loading.value = false
    }
    else {
      publications.value = await fetchOrcidPublications()
      localStorage.setItem('orcidPublications', JSON.stringify(publications.value))
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
  const date = pub['work-summary']?.[0]?.['publication-date']
  return date?.year?.value || 'Unknown Year'
}

function isSameYear(a: any, b: any | undefined) {
  return b && getYear(a) === getYear(b)
}

function getExternalUrl(pub: any) {
  const externalIds = pub['work-summary']?.[0]?.['external-ids']?.['external-id'] || []
  const doiUrl = externalIds.find((id: any) => id['external-id-type'] === 'doi')?.['external-id-url']?.value
  return doiUrl || pub['work-summary']?.[0]?.url?.value || '#'
}

function formatDate(dateString: string) {
  const [year, month, day] = dateString.split('-').map(Number)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${months[month - 1]} ${day}, ${year}`
}

function getDate(pub: any) {
  const date = pub['work-summary']?.[0]?.['publication-date']
  if (!date)
    return 'Unknown Date'
  const year = date.year?.value || '0000'
  const month = date.month?.value?.padStart(2, '0') || '01'
  const day = date.day?.value?.padStart(2, '0') || '01'
  return `${year}-${month}-${day}`
}

function getJournalTitle(pub: any) {
  return pub['work-summary']?.[0]?.['journal-title']?.value || ''
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
    <ul v-else-if="publications.length > 0">
      <li v-for="(pub, index) in publications" :key="index" mb-8>
        <div v-if="index === 0 || !isSameYear(pub, publications[index - 1])" select-none relative h18 pointer-events-none>
          <span year-text-hollow>
            {{ getYear(pub) }}
          </span>
        </div>
        <a :href="getExternalUrl(pub)" target="_blank" rel="noopener noreferrer" text-lg lh-tight nav-link flex="~ col gap-2" :aria-label="pub['work-summary'][0].title.title.value">
          <div flex="~ col gap-2">
            <div flex="~ gap-2 items-start">
              <span lh-normal>
                {{ pub['work-summary'][0].title.title.value }}
              </span>
            </div>
            <div opacity-50 text-sm ws-nowrap flex="~ gap-2 items-center">
              <i text-base i-ri-external-link-line />
              <time :datetime="getDate(pub)">
                {{ formatDate(getDate(pub)) }}
              </time>
            </div>
            <div v-if="getJournalTitle(pub)" opacity-50 text-sm>
              {{ getJournalTitle(pub) }}
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
