import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

import { appStoreId, appStoreUrl, minimumIosVersion } from './src/app-store.ts'

export default defineConfig(({ isSsrBuild }) => ({
  base: process.env.VITE_BASE_PATH ?? '/',
  plugins: [criticalFontPreloads(), appStoreMetadata(), react(), journalArticleRoutes()],
  build: isSsrBuild
    ? {
        rollupOptions: {
          output: { entryFileNames: 'journal-server.mjs' },
        },
      }
    : {
        rollupOptions: {
          input: {
            firstEditionTerms: resolve(import.meta.dirname, 'first-edition/terms/index.html'),
            get: resolve(import.meta.dirname, 'get/index.html'),
            home: resolve(import.meta.dirname, 'index.html'),
            journal: resolve(import.meta.dirname, 'journal/index.html'),
            privacy: resolve(import.meta.dirname, 'privacy/index.html'),
            roadmap: resolve(import.meta.dirname, 'roadmap/index.html'),
            support: resolve(import.meta.dirname, 'support/index.html'),
          },
        },
      },
}))

function criticalFontPreloads(): Plugin {
  return {
    name: 'critical-font-preloads',
    transformIndexHtml: {
      order: 'pre',
      handler() {
        return [
          fontPreload('/src/assets/fonts/space-grotesk-regular.ttf'),
          fontPreload('/src/assets/fonts/space-grotesk-bold.ttf'),
        ]
      },
    },
  }
}

function fontPreload(href: string) {
  return {
    tag: 'link',
    attrs: {
      rel: 'preload',
      href,
      as: 'font',
      type: 'font/ttf',
      crossorigin: '',
    },
    injectTo: 'head-prepend' as const,
  }
}

/**
 * Every page carries Safari's App Store banner; the home page also carries the
 * structured data that names the App Store listing. Both read one source.
 */
function appStoreMetadata(): Plugin {
  const homeDocument = resolve(import.meta.dirname, 'index.html')
  return {
    name: 'app-store-metadata',
    transformIndexHtml: {
      order: 'pre',
      handler(_html, context) {
        const tags = [{
          tag: 'meta',
          attrs: { name: 'apple-itunes-app', content: `app-id=${appStoreId}` },
          injectTo: 'head' as const,
        }]
        if (resolve(context.filename) === homeDocument) {
          tags.push({
            tag: 'script',
            attrs: { type: 'application/ld+json' } as never,
            children: JSON.stringify([softwareApplication(), launchFilm()]).replaceAll('<', '\\u003c'),
            injectTo: 'head' as const,
          } as never)
        }
        return tags
      },
    },
  }
}

function softwareApplication() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Found',
    alternateName: 'Found: Private Library',
    applicationCategory: 'ProductivityApplication',
    operatingSystem: `iOS ${minimumIosVersion} or later`,
    description: 'One private place on your iPhone for notes, links, photos, PDFs and files. Save it once. Ask for what it said, right where the question is, and get the exact thing back.',
    url: 'https://keep-it-found.app/',
    downloadUrl: appStoreUrl,
    installUrl: appStoreUrl,
    sameAs: [appStoreUrl],
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  }
}

/** The launch film, recorded in Found: the site's own copy, and the same film on YouTube. */
function launchFilm() {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: 'Found — Save it once. Find it again.',
    description: 'A two-minute film recorded in Found on iPhone: asking right where the question is, search by meaning, What’s Inside, Siri, privacy, and what comes next.',
    thumbnailUrl: 'https://keep-it-found.app/media/found-film.jpg',
    contentUrl: 'https://keep-it-found.app/media/found-film.mp4',
    embedUrl: 'https://www.youtube.com/embed/qaoqS_fjirM',
    uploadDate: '2026-09-29',
    duration: 'PT1M59S',
  }
}

function journalArticleRoutes(): Plugin {
  return {
    name: 'journal-article-routes',
    transformIndexHtml: {
      order: 'pre',
      handler(_html, context) {
        if (!context.server || !context.path.startsWith('/journal/')) return
        return [{
          tag: 'script',
          attrs: { src: '/src/journal.tsx', type: 'module' },
          injectTo: 'body',
        }]
      },
    },
    configureServer(server) {
      server.middlewares.use((request, _response, next) => {
        if (request.url && /^\/journal\/[^/?#]+\/?(?:[?#].*)?$/.test(request.url)) {
          request.url = `/journal/index.html${getUrlSuffix(request.url)}`
        }
        next()
      })
    },
  }
}

function getUrlSuffix(url: string): string {
  const suffixIndex = url.search(/[?#]/)
  return suffixIndex >= 0 ? url.slice(suffixIndex) : ''
}
