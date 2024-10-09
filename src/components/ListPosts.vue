<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { fetchOrcidPublications } from '@/utils/orchidRecords'
import type { CollectionPosts } from '@/types'

interface BasePost {
  id: string
  slug: string
  data: {
    title: string
    date: string | Date
    description?: string
    redirect?: string
  }
}

interface BlogPost extends BasePost {
  body: string
  collection: string
  render: any
  data: BasePost['data'] & {
    duration?: string
    tag?: string
    lang?: string
    recording?: boolean
    video?: boolean
    draft?: boolean
  }
}

interface Publication extends BasePost {
  isPublication: true
}

type Post = BlogPost | Publication

const props = withDefaults(defineProps<{
  list: CollectionPosts[]
  currentPath: string
}>(), {
  list: () => [],
  currentPath: '',
})

const publications = ref<any[]>([])

onMounted(() => {
  if (props.currentPath === '/blog')
    loadPublications()
})

watch(() => props.currentPath, (newPath) => {
  if (newPath === '/blog')
    loadPublications()
})

function loadPublications() {
  const cachedData = localStorage.getItem('orcidPublications')
  if (cachedData) {
    publications.value = JSON.parse(cachedData)
  }
  else {
    fetchOrcidPublications().then((data) => {
      publications.value = data
      localStorage.setItem('orcidPublications', JSON.stringify(data))
    })
  }
}

function formatDate(date: string | Date): string {
  const dateObj = date instanceof Date ? date : new Date(date)
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function getExternalUrl(pub: any) {
  const externalIds = pub['work-summary'][0]['external-ids']?.['external-id'] || []
  const doiUrl = externalIds.find((id: any) => id['external-id-type'] === 'doi')?.['external-id-url']?.value
  return doiUrl || pub['work-summary'][0].url?.value || '#'
}

const allPosts = computed<Post[]>(() => {
  if (props.currentPath === '/blog') {
    const orchidPosts: Publication[] = publications.value.map((pub) => {
      const pubDate = pub['work-summary'][0]['publication-date']
      const year = pubDate?.year?.value
      const month = pubDate?.month?.value
      const day = pubDate?.day?.value

      const dateString = `${year}-${month?.padStart(2, '0') || '01'}-${day?.padStart(2, '0') || '01'}`
      const date = new Date(dateString)

      return {
        id: pub['put-code'],
        slug: '',
        isPublication: true,
        data: {
          title: pub['work-summary'][0].title.title.value,
          date: Number.isNaN(date.getTime()) ? new Date() : date, // Use current date if invalid
          description: pub['work-summary'][0]['journal-title']?.value || '',
          redirect: getExternalUrl(pub),
        },
      }
    })

    const combinedPosts = [...props.list, ...orchidPosts]
    return combinedPosts.sort((a, b) => {
      const dateA = new Date(a.data.date)
      const dateB = new Date(b.data.date)
      return Number.isNaN(dateB.getTime()) || Number.isNaN(dateA.getTime()) ? 0 : dateB.getTime() - dateA.getTime()
    })
  }
  return props.list
})

function getDate(date: string | Date): string {
  const dateObj = date instanceof Date ? date : new Date(date)
  return dateObj.toISOString()
}

function getHref(post: Post) {
  if (post.data.redirect)
    return post.data.redirect
  return `/posts/${post.slug}`
}

function getTarget(post: Post) {
  if (post.data.redirect)
    return '_blank'
  return '_self'
}

function isSameYear(a: Date | string | number, b: Date | string | number) {
  return a && b && getYear(a) === getYear(b)
}

function getYear(date: Date | string | number) {
  return new Date(date).getFullYear()
}

function hasChineseLanguage(post: Post): boolean {
  return 'lang' in post.data && typeof post.data.lang === 'string' && post.data.lang.includes('zh')
}
</script>

<template>
  <div>
    <ul sm:min-h-38 min-h-28 mb-18>
      <template v-if="!allPosts || allPosts.length === 0">
        <div my-12 opacity-50>
          Loading blog ...
        </div>
      </template>
      <li v-for="(post, index) in allPosts" :key="post.id || index" mb-8>
        <div v-if="!isSameYear(post.data.date, allPosts[index - 1]?.data.date)" select-none relative h18 pointer-events-none>
          <span year-text-hollow>
            {{ getYear(post.data.date) }}
          </span>
        </div>
        <a text-lg lh-tight nav-link flex="~ col gap-2" :aria-label="post.data.title" :target="getTarget(post)" :href="getHref(post)">
          <div flex="~ col gap-2 text-wrap">
            <span lh-normal>
              <i v-if="'draft' in post.data && post.data.draft" text-base vertical-mid i-ri-draft-line />
              {{ post.data.title }}
            </span>
            <div opacity-50 text-sm ws-nowrap flex="~ gap-2 items-center">
              <i v-if="post.data.redirect" text-base i-ri-external-link-line />
              <i v-if="'recording' in post.data && (post.data.recording || post.data.video)" text-base i-ri:film-line />
              <time :datetime="getDate(post.data.date)">
                {{ formatDate(post.data.date) }}
              </time>
              <span v-if="'duration' in post.data && post.data.duration">· {{ post.data.duration }}</span>
              <span v-if="'tag' in post.data && post.data.tag">· {{ post.data.tag }}</span>
              <span v-if="hasChineseLanguage(post)">· 中文</span>
              <span v-if="'isPublication' in post" class="publication-indicator">· Publication</span>
            </div>
          </div>
          <div opacity-50 text-sm>{{ post.data.description }}</div>
        </a>
      </li>
    </ul>
  </div>
</template>
