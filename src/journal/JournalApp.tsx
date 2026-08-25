import { JournalArticlePage, JournalPage } from '../pages/JournalPage'

export function JournalApp({ pathname }: Readonly<{ pathname: string }>) {
  const segments = pathname.split('/').filter(Boolean)
  const journalIndex = segments.lastIndexOf('journal')
  const slug = journalIndex >= 0 ? segments[journalIndex + 1] : undefined

  return slug ? <JournalArticlePage slug={slug} /> : <JournalPage />
}
