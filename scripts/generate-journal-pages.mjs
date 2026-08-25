import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const serverBundlePath = resolve(projectRoot, '.journal-ssr/journal-server.mjs')

export function renderJournalDocument(template, renderedApp, options) {
  const canonicalRoot = options.canonicalRoot
  if (!canonicalRoot) throw new Error('A canonical root URL is required')
  const assetBase = normalizeBasePath(options.assetBase ?? '/')
  const title = options.article ? `${options.article.title} · Found` : 'Journal · Found'
  const description = options.article
    ? options.article.summary
    : 'The decisions, experiments, and lessons behind building Found.'
  const canonicalPath = options.article ? `journal/${options.article.slug}/` : 'journal/'
  const canonicalUrl = new URL(canonicalPath, canonicalRoot).href

  let document = replaceMarkedAttribute(template, 'data-journal-description', 'content', description)
  document = replaceMarkedAttribute(document, 'data-journal-canonical', 'href', canonicalUrl)
  document = replaceMarkedAttribute(document, 'data-journal-icon', 'href', `${assetBase}brand/found-favicon.png`)
  document = replaceMarkedAttribute(document, 'data-journal-og-type', 'content', options.article ? 'article' : 'website')
  document = replaceMarkedAttribute(document, 'data-journal-og-title', 'content', title)
  document = replaceMarkedAttribute(document, 'data-journal-og-description', 'content', description)
  document = replaceMarkedAttribute(document, 'data-journal-og-url', 'content', canonicalUrl)
  document = replaceMarkedAttribute(document, 'data-journal-twitter-title', 'content', title)
  document = replaceMarkedAttribute(document, 'data-journal-twitter-description', 'content', description)
  document = replaceMarkedContent(document, 'title', 'data-journal-title', title)
  document = replaceMarkedRawContent(
    document,
    'script',
    'data-journal-structured-data',
    serializeStructuredData(options.article, canonicalRoot, canonicalUrl),
  )
  return injectRootMarkup(document, renderedApp)
}

export async function generateJournalPages(options = {}) {
  const outputRoot = options.outputRoot ?? resolve(projectRoot, 'dist')
  const journalTemplatePath = resolve(outputRoot, 'journal/index.html')
  const template = await readFile(journalTemplatePath, 'utf8')
  const { journalArticles, renderJournalPath, siteConfig } = await import(serverBundlePath)
  const canonicalRoot = siteConfig.canonicalUrl

  const indexDocument = renderJournalDocument(
    template,
    renderJournalPath('/journal/'),
    { assetBase: process.env.VITE_BASE_PATH, canonicalRoot },
  )
  assertStaticDocument(indexDocument, 'journal index')
  await writeFile(journalTemplatePath, indexDocument)

  for (const article of journalArticles) {
    const pathname = `/journal/${article.slug}/`
    const articleDirectory = resolve(outputRoot, 'journal', article.slug)
    const document = renderJournalDocument(template, renderJournalPath(pathname), {
      article,
      assetBase: process.env.VITE_BASE_PATH,
      canonicalRoot,
    })
    assertPrerenderedArticle(document, article)
    await mkdir(articleDirectory, { recursive: true })
    await writeFile(resolve(articleDirectory, 'index.html'), document)
  }

  await writeFile(resolve(outputRoot, 'sitemap.xml'), createSitemap(canonicalRoot, journalArticles))
  await writeFile(resolve(outputRoot, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${new URL('sitemap.xml', canonicalRoot).href}\n`)
}

function injectRootMarkup(document, markup) {
  const pattern = /<div id="root"><\/div>/g
  const matches = document.match(pattern)
  if (matches?.length !== 1) throw new Error('Expected one empty journal root element')
  return document.replace(pattern, `<div id="root">${markup}</div>`)
}

function assertPrerenderedArticle(document, article) {
  assertStaticDocument(document, `journal article "${article.slug}"`)
  if (!document.includes(`<h1>${escapeHtml(article.title)}</h1>`)) {
    throw new Error(`Generated journal page is missing the title for "${article.slug}"`)
  }
  if (!document.includes('class="journal-article__body"')) {
    throw new Error(`Generated journal page is missing the body for "${article.slug}"`)
  }
}

function assertStaticDocument(document, label) {
  if (/<script\b[^>]*\btype="module"/i.test(document)) {
    throw new Error(`Generated ${label} unexpectedly includes client JavaScript`)
  }
  if (!/<link\b[^>]*\brel="stylesheet"/i.test(document)) {
    throw new Error(`Generated ${label} is missing its stylesheet`)
  }
}

function replaceMarkedAttribute(document, marker, attribute, value) {
  const tagPattern = new RegExp(`<[^>]*\\b${marker}\\b[^>]*>`, 'g')
  const matches = document.match(tagPattern)
  if (matches?.length !== 1) throw new Error(`Expected one ${marker} metadata element`)

  const tag = matches[0]
  const attributePattern = new RegExp(`\\b${attribute}="[^"]*"`)
  if (!attributePattern.test(tag)) throw new Error(`${marker} is missing its ${attribute} attribute`)

  return document.replace(tag, tag.replace(attributePattern, `${attribute}="${escapeHtml(value)}"`))
}

function replaceMarkedContent(document, tagName, marker, value) {
  const pattern = new RegExp(`<${tagName}([^>]*\\b${marker}\\b[^>]*)>.*?</${tagName}>`, 'g')
  const matches = document.match(pattern)
  if (matches?.length !== 1) throw new Error(`Expected one ${marker} metadata element`)
  return document.replace(pattern, `<${tagName}$1>${escapeHtml(value)}</${tagName}>`)
}

function replaceMarkedRawContent(document, tagName, marker, value) {
  const pattern = new RegExp(`<${tagName}([^>]*\\b${marker}\\b[^>]*)>.*?</${tagName}>`, 'g')
  const matches = document.match(pattern)
  if (matches?.length !== 1) throw new Error(`Expected one ${marker} metadata element`)
  return document.replace(pattern, `<${tagName}$1>${value}</${tagName}>`)
}

function serializeStructuredData(article, canonicalRoot, canonicalUrl) {
  const data = article
    ? {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        datePublished: article.publishedAt,
        description: article.summary,
        headline: article.title,
        isPartOf: new URL('journal/', canonicalRoot).href,
        publisher: { '@type': 'Organization', name: 'Found', url: canonicalRoot },
        url: canonicalUrl,
      }
    : {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        description: 'The decisions, experiments, and lessons behind building Found.',
        name: 'The Found Journal',
        publisher: { '@type': 'Organization', name: 'Found', url: canonicalRoot },
        url: canonicalUrl,
      }

  return JSON.stringify(data).replaceAll('<', '\\u003c')
}

function createSitemap(canonicalRoot, articles) {
  const staticPaths = ['', 'get/', 'journal/', 'privacy/', 'roadmap/', 'support/']
  const entries = [
    ...staticPaths.map((path) => ({ url: new URL(path, canonicalRoot).href })),
    ...articles.map((article) => ({
      lastModified: article.publishedAt,
      url: new URL(`journal/${article.slug}/`, canonicalRoot).href,
    })),
  ]
  const urls = entries.map((entry) => [
    '  <url>',
    `    <loc>${escapeXml(entry.url)}</loc>`,
    entry.lastModified ? `    <lastmod>${entry.lastModified}</lastmod>` : undefined,
    '  </url>',
  ].filter(Boolean).join('\n')).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

function normalizeBasePath(basePath) {
  if (!basePath || basePath === '/') return '/'
  return `/${basePath.replace(/^\/+|\/+$/g, '')}/`
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function escapeXml(value) {
  return escapeHtml(value).replaceAll("'", '&apos;')
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    await generateJournalPages()
  } finally {
    await rm(resolve(projectRoot, '.journal-ssr'), { force: true, recursive: true })
  }
}
