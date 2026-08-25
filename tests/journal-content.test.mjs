import assert from 'node:assert/strict'
import { readdir, readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import test from 'node:test'

import { renderJournalDocument } from '../scripts/generate-journal-pages.mjs'
import { parseJournalArticle } from '../src/journal/journal-article.ts'

const contentRoot = resolve(import.meta.dirname, '../content/journal')
const validMetadata = {
  kind: 'Founding Note',
  publishedAt: '2026-08-23',
  summary: 'A complete summary that is long enough to describe the journal article.',
  title: 'A valid journal article',
}

test('every journal directory contains one valid article pair', async () => {
  const entries = await readdir(contentRoot, { withFileTypes: true })
  const articleDirectories = entries.filter((entry) => entry.isDirectory())
  assert.ok(articleDirectories.length > 0)

  for (const entry of articleDirectories) {
    const directory = resolve(contentRoot, entry.name)
    const [metadataSource, markdown] = await Promise.all([
      readFile(resolve(directory, 'metadata.json'), 'utf8'),
      readFile(resolve(directory, 'article.md'), 'utf8'),
    ])
    const article = parseJournalArticle(entry.name, JSON.parse(metadataSource), markdown)
    assert.equal(article.slug, entry.name)
    assert.ok(article.bodyHtml.includes('<h2>'))
  }
})

test('the public journal contains the real founding story and no placeholder articles', async () => {
  const entries = await readdir(contentRoot, { withFileTypes: true })
  const slugs = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name)

  assert.ok(slugs.includes('why-i-built-found'))
  assert.ok(!slugs.includes('found-1-0'))
  assert.ok(!slugs.includes('from-storage-to-reuse'))
  assert.ok(!slugs.includes('fast-camera-capture-ios'))
})

test('journal parsing computes display metadata and renders Markdown', () => {
  const article = parseJournalArticle('valid-article', validMetadata, '## A heading\n\nA short body.')

  assert.equal(article.displayDate, 'August 23, 2026')
  assert.equal(article.readingTime, '1 min read')
  assert.match(article.bodyHtml, /<h2>A heading<\/h2>/)
})

test('journal parsing rejects invalid metadata, raw HTML, and unsafe URLs', () => {
  assert.throws(
    () => parseJournalArticle('valid-article', { ...validMetadata, publishedAt: '2026-02-30' }, 'Body'),
    /invalid publishedAt date/,
  )
  assert.throws(
    () => parseJournalArticle('valid-article', validMetadata, '<script>alert(1)</script>'),
    /raw HTML/,
  )
  assert.throws(
    () => parseJournalArticle('valid-article', validMetadata, '[Open](javascript:alert(1))'),
    /unsafe URL protocol/,
  )
  assert.throws(
    () => parseJournalArticle('valid-article', validMetadata, '# Duplicate title'),
    /level-one heading/,
  )
  assert.throws(
    () => parseJournalArticle('valid-article', validMetadata, '![A photo](.\/photo.png)'),
    /image assets are not supported/,
  )
  assert.throws(
    () => parseJournalArticle('valid-article', validMetadata, '[](https:\/\/example.com)'),
    /empty link/,
  )
})

test('journal documents use one template with static markup and route metadata', async () => {
  const template = await readFile(resolve(import.meta.dirname, '../journal/index.html'), 'utf8')
  const article = parseJournalArticle('valid-article', validMetadata, '## Static body\n\nVisible before JavaScript.')
  const renderedApp = '<main><h1>A valid journal article</h1><div class="journal-article__body"><h2>Static body</h2></div></main>'
  const document = renderJournalDocument(template, renderedApp, {
    article,
    canonicalRoot: 'https://keep-it-found.app/',
  })

  assert.match(document, /<title[^>]*>A valid journal article · Found<\/title>/)
  assert.match(document, /href="https:\/\/keep-it-found\.app\/journal\/valid-article\/"/)
  assert.match(document, /property="og:type" content="article"/)
  assert.match(document, /"@type":"BlogPosting"/)
  assert.match(document, /<div id="root"><main>/)
  assert.match(document, /Static body/)
  assert.doesNotMatch(document, /<script\b[^>]*\btype="module"/i)
})
