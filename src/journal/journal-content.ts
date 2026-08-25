import { parseJournalArticle, type JournalArticle } from './journal-article'

const markdownModules = import.meta.glob<string>('../../content/journal/*/article.md', {
  eager: true,
  import: 'default',
  query: '?raw',
})

const metadataModules = import.meta.glob<unknown>('../../content/journal/*/metadata.json', {
  eager: true,
  import: 'default',
})

export const journalArticles: readonly JournalArticle[] = loadJournalArticles(
  markdownModules,
  metadataModules,
)

export function getJournalArticle(slug: string): JournalArticle | undefined {
  return journalArticles.find((article) => article.slug === slug)
}

function loadJournalArticles(
  markdownByPath: Record<string, string>,
  metadataByPath: Record<string, unknown>,
): readonly JournalArticle[] {
  const markdownSlugs = new Set(Object.keys(markdownByPath).map(slugFromPath))
  const metadataSlugs = new Set(Object.keys(metadataByPath).map(slugFromPath))
  const allSlugs = new Set([...markdownSlugs, ...metadataSlugs])

  const articles = [...allSlugs].map((slug) => {
    const markdownPath = findPathForSlug(markdownByPath, slug)
    const metadataPath = findPathForSlug(metadataByPath, slug)
    if (!markdownPath || !metadataPath) {
      throw new Error(`Journal article "${slug}" must contain article.md and metadata.json`)
    }
    return parseJournalArticle(slug, metadataByPath[metadataPath], markdownByPath[markdownPath])
  })

  return articles.sort((left, right) => (
    right.publishedAt.localeCompare(left.publishedAt) || left.slug.localeCompare(right.slug)
  ))
}

function findPathForSlug<T>(modules: Record<string, T>, slug: string): string | undefined {
  return Object.keys(modules).find((path) => slugFromPath(path) === slug)
}

function slugFromPath(path: string): string {
  const match = path.match(/\/journal\/([^/]+)\/(?:article\.md|metadata\.json)$/)
  if (!match) throw new Error(`Unexpected journal content path: ${path}`)
  return match[1]
}
