import type { CollectionEntry } from 'astro:content'

export type PostKey = 'blog'

export type CollectionPosts = CollectionEntry<PostKey>

export type Pages = 'pages'

export type CollectionPages = CollectionEntry<Pages>

export interface Technology {
  name: string
  icon: string
}

export type ProjectData = Array<{
  title: string
  projects: Array<{
    text: string
    description?: string
    icon?: string
    href: string
    technologies?: Technology[]
  }>
}>
