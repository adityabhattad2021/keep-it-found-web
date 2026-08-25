import { SiteShell } from '../components/SiteShell'
import { getJournalArticle, journalArticles } from '../journal/journal-content'
import { sitePath } from '../site-config'
import '../journal.css'

export function JournalPage() {
  const [featured, ...articles] = journalArticles

  if (!featured) throw new Error('The journal must contain at least one article')

  return (
    <SiteShell page="journal">
      <main className="journal-page">
        <header className="journal-hero page-hero content-width">
          <p className="eyebrow">THE FOUND JOURNAL</p>
          <h1>Building Found,<br />honestly.</h1>
          <p className="page-hero__lede">One product, the decisions behind it, and what I learn from putting it in people's hands.</p>
        </header>

        <section className="journal-feed content-width" aria-label="Journal articles">
          <a className="journal-featured press-surface press-surface--raised" href={sitePath(`journal/${featured.slug}/`)}>
            <JournalMeta article={featured} />
            <h2>{featured.title}</h2>
            <p>{featured.summary}</p>
            <span>READ THE STORY <span aria-hidden="true">↗</span></span>
          </a>

          {articles.length > 0 && (
            <div className="journal-list">
              {articles.map((article) => (
                <a href={sitePath(`journal/${article.slug}/`)} key={article.slug}>
                  <JournalMeta article={article} />
                  <h2>{article.title}</h2>
                  <p>{article.summary}</p>
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          )}
        </section>
      </main>
    </SiteShell>
  )
}

export function JournalArticlePage({ slug }: Readonly<{ slug: string }>) {
  const article = getJournalArticle(slug)
  if (!article) return <JournalNotFoundPage />

  return (
    <SiteShell page="journal">
      <main className="journal-article-page">
        <article className="journal-article content-width">
          <a className="journal-back" href={sitePath('journal/')}>← ALL JOURNAL NOTES</a>
          <header>
            <JournalMeta article={article} />
            <h1>{article.title}</h1>
            <p>{article.summary}</p>
          </header>
          <div
            className="journal-article__body"
            dangerouslySetInnerHTML={{ __html: article.bodyHtml }}
          />
          <footer>
            <p>Found is made independently and shaped by real use.</p>
            <a href={sitePath('roadmap/')}>See what is being built next <span aria-hidden="true">↗</span></a>
          </footer>
        </article>
      </main>
    </SiteShell>
  )
}

function JournalNotFoundPage() {
  return (
    <SiteShell page="journal">
      <main className="journal-article-page">
        <section className="journal-article journal-not-found content-width">
          <p className="eyebrow">JOURNAL NOTE NOT FOUND</p>
          <h1>This story is not here.</h1>
          <p>It may have moved, or the address may be incorrect.</p>
          <a className="press-surface press-surface--raised" href={sitePath('journal/')}>
            View all journal notes
          </a>
        </section>
      </main>
    </SiteShell>
  )
}

function JournalMeta({ article }: Readonly<{ article: (typeof journalArticles)[number] }>) {
  return (
    <p className="journal-meta">
      <span>{article.kind}</span>
      <time dateTime={article.publishedAt}>{article.displayDate}</time>
      <span>{article.readingTime}</span>
    </p>
  )
}
