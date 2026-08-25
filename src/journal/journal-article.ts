import { Marked, type Token, type Tokens } from 'marked'

const WORDS_PER_MINUTE = 225
const SAFE_EXTERNAL_PROTOCOLS = new Set(['http:', 'https:', 'mailto:'])
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/

export type JournalMetadata = Readonly<{
  kind: string
  publishedAt: string
  summary: string
  title: string
}>

export type JournalArticle = JournalMetadata & Readonly<{
  bodyHtml: string
  displayDate: string
  readingTime: string
  slug: string
}>

export function parseJournalArticle(
  slug: string,
  metadataValue: unknown,
  markdownSource: string,
): JournalArticle {
  assertSlug(slug)
  const metadata = parseMetadata(metadataValue, slug)
  const source = markdownSource.trim()
  if (!source) throw new Error(`Journal article "${slug}" has an empty body`)

  const marked = new Marked({ gfm: true })
  const tokens = marked.lexer(source)
  marked.walkTokens(tokens, (token) => validateToken(token, slug))

  return {
    ...metadata,
    slug,
    bodyHtml: marked.parser(tokens),
    displayDate: formatDate(metadata.publishedAt),
    readingTime: formatReadingTime(source),
  }
}

function parseMetadata(value: unknown, slug: string): JournalMetadata {
  if (!isRecord(value)) throw new Error(`Journal article "${slug}" has invalid metadata`)

  const allowedKeys = new Set(['kind', 'publishedAt', 'summary', 'title'])
  const unexpectedKey = Object.keys(value).find((key) => !allowedKeys.has(key))
  if (unexpectedKey) {
    throw new Error(`Journal article "${slug}" has an unsupported metadata field: ${unexpectedKey}`)
  }

  const title = requireText(value.title, 'title', slug, 8)
  const summary = requireText(value.summary, 'summary', slug, 30)
  const kind = requireText(value.kind, 'kind', slug, 3)
  const publishedAt = requireText(value.publishedAt, 'publishedAt', slug, 10)
  assertDate(publishedAt, slug)

  return { title, summary, kind, publishedAt }
}

function validateToken(token: Token, slug: string): void {
  if (token.type === 'html') {
    throw new Error(`Journal article "${slug}" contains raw HTML`)
  }

  if (token.type === 'heading' && (token as Tokens.Heading).depth === 1) {
    throw new Error(`Journal article "${slug}" must not contain a level-one heading`)
  }

  if (token.type === 'image') {
    throw new Error(`Journal article "${slug}" contains an image, but journal image assets are not supported yet`)
  }

  if (token.type === 'link') {
    const link = token as Tokens.Link
    if (!link.text.trim()) throw new Error(`Journal article "${slug}" contains an empty link`)
    assertSafeUrl(link.href, slug)
  }

  if (token.type === 'def') {
    assertSafeUrl((token as Tokens.Def).href, slug)
  }
}

function assertSafeUrl(href: string, slug: string): void {
  const trimmed = href.trim()
  if (!trimmed || trimmed.startsWith('//')) {
    throw new Error(`Journal article "${slug}" contains an unsafe URL: ${href}`)
  }

  if (/^(?:#|\/|\.\/|\.\.\/)/.test(trimmed)) return

  let url: URL
  try {
    url = new URL(trimmed)
  } catch {
    throw new Error(`Journal article "${slug}" contains an invalid URL: ${href}`)
  }

  if (!SAFE_EXTERNAL_PROTOCOLS.has(url.protocol)) {
    throw new Error(`Journal article "${slug}" contains an unsafe URL protocol: ${url.protocol}`)
  }
}

function assertSlug(slug: string): void {
  if (!SLUG_PATTERN.test(slug)) throw new Error(`Invalid journal article slug: ${slug}`)
}

function assertDate(value: string, slug: string): void {
  if (!DATE_PATTERN.test(value)) {
    throw new Error(`Journal article "${slug}" has an invalid publishedAt date`)
  }

  const date = new Date(`${value}T00:00:00Z`)
  if (Number.isNaN(date.valueOf()) || date.toISOString().slice(0, 10) !== value) {
    throw new Error(`Journal article "${slug}" has an invalid publishedAt date`)
  }
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC',
    year: 'numeric',
  }).format(new Date(`${value}T00:00:00Z`))
}

function formatReadingTime(source: string): string {
  const wordCount = source.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0
  const minutes = Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE))
  return `${minutes} min read`
}

function requireText(
  value: unknown,
  field: keyof JournalMetadata,
  slug: string,
  minimumLength: number,
): string {
  if (typeof value !== 'string' || value.trim().length < minimumLength) {
    throw new Error(`Journal article "${slug}" has an invalid ${field}`)
  }
  return value.trim()
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}
