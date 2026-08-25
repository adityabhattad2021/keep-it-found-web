import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'

import { JournalApp } from './journal/JournalApp'
export { journalArticles } from './journal/journal-content'
export { siteConfig } from './site-config'

export function renderJournalPath(pathname: string): string {
  return renderToString(
    <StrictMode>
      <JournalApp pathname={pathname} />
    </StrictMode>,
  )
}
