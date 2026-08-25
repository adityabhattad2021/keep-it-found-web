import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

export default defineConfig(({ isSsrBuild }) => ({
  base: process.env.VITE_BASE_PATH ?? '/',
  plugins: [criticalFontPreloads(), react(), journalArticleRoutes()],
  build: isSsrBuild
    ? {
        rollupOptions: {
          output: { entryFileNames: 'journal-server.mjs' },
        },
      }
    : {
        rollupOptions: {
          input: {
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
