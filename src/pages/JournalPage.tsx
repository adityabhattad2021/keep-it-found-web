import { AppStoreLink, appAvailability } from '../components/AppStoreAction'
import { SiteShell } from '../components/SiteShell'
import { getJournalArticle, journalArticles } from '../journal/journal-content'
import type { JournalArticle } from '../journal/journal-article'
import { sitePath } from '../site-config'
import '../journal.css'

/*
 * The journal is prerendered and ships without client JavaScript, so nothing
 * here may depend on effects, state, or the reveal-on-scroll classes.
 */

function articleHref(article: JournalArticle) {
  return sitePath(`journal/${article.slug}/`)
}

export function JournalPage() {
  const [featured, ...articles] = journalArticles

  if (!featured) throw new Error('The journal must contain at least one article')

  return (
    <SiteShell page="journal">
      <main className="journal-page">
        <header className="journal-hero content-width">
          <p className="eyebrow">The Found Journal</p>
          <h1>Building Found, honestly.</h1>
          <p className="journal-hero__lede">One product, the decisions behind it, and what changes once it is in people’s hands. Written by the person who builds Found.</p>
        </header>

        <section className="journal-feed content-width" aria-labelledby="latest-title">
          <h2 className="eyebrow journal-feed__label" id="latest-title">Latest note</h2>
          <a className="journal-featured" href={articleHref(featured)}>
            <div className="journal-featured__head">
              <JournalMeta article={featured} />
              <h3>{featured.title}</h3>
            </div>
            <div className="journal-featured__body">
              <p>{featured.summary}</p>
              <span className="journal-read">Read the note <span aria-hidden="true">→</span></span>
            </div>
          </a>
        </section>

        {articles.length > 0 && (
          <section className="journal-archive content-width" aria-labelledby="earlier-title">
            <h2 className="eyebrow journal-feed__label" id="earlier-title">Earlier notes</h2>
            <JournalList articles={articles} />
          </section>
        )}
      </main>
    </SiteShell>
  )
}

export function JournalArticlePage({ slug }: Readonly<{ slug: string }>) {
  const article = getJournalArticle(slug)
  if (!article) return <JournalNotFoundPage />
  const others = journalArticles.filter((entry) => entry.slug !== article.slug).slice(0, 2)

  return (
    <SiteShell page="journal">
      <main className="journal-article-page">
        <article className="journal-article content-width">
          <a className="journal-back" href={sitePath('journal/')}><span aria-hidden="true">←</span> All journal notes</a>
          <header className="journal-article__header">
            <p className="journal-kind">{article.kind}</p>
            <h1>{article.title}</h1>
            <p className="journal-article__summary">{article.summary}</p>
          </header>

          <div className="journal-article__layout">
            <dl className="journal-article__facts">
              <div>
                <dt>Published</dt>
                <dd><time dateTime={article.publishedAt}>{article.displayDate}</time></dd>
              </div>
              <div>
                <dt>Reading time</dt>
                <dd>{article.readingTime}</dd>
              </div>
            </dl>
            <div
              className="journal-article__body"
              dangerouslySetInnerHTML={{ __html: article.bodyHtml }}
            />
          </div>

          <aside className="journal-cta" aria-label="Found for iPhone">
            <div>
              <p className="eyebrow">Found for iPhone</p>
              <p className="journal-cta__title">Save it once. Find it again.</p>
              <p className="journal-cta__meta">{appAvailability}</p>
            </div>
            <div className="journal-cta__actions">
              <AppStoreLink />
              <a className="button button--raised" href={sitePath('roadmap/')}>See what’s next</a>
            </div>
          </aside>
        </article>

        {others.length > 0 && (
          <section className="journal-archive journal-archive--more content-width" aria-labelledby="more-title">
            <h2 className="eyebrow journal-feed__label" id="more-title">Keep reading</h2>
            <JournalList articles={others} />
          </section>
        )}
      </main>
    </SiteShell>
  )
}

function JournalList({ articles }: Readonly<{ articles: readonly JournalArticle[] }>) {
  return (
    <ol className="journal-list">
      {articles.map((article) => (
        <li key={article.slug}>
          <a href={articleHref(article)}>
            <JournalMeta article={article} />
            <div className="journal-list__words">
              <h3>{article.title}</h3>
              <p>{article.summary}</p>
            </div>
            <span className="journal-list__arrow" aria-hidden="true">→</span>
          </a>
        </li>
      ))}
    </ol>
  )
}

function JournalNotFoundPage() {
  return (
    <SiteShell page="journal">
      <main className="journal-article-page">
        <section className="journal-not-found content-width">
          <p className="eyebrow">Journal note not found</p>
          <h1>This note isn’t here.</h1>
          <p>It may have moved, or the address may be mistyped.</p>
          <a className="button button--ink button--raised" href={sitePath('journal/')}>All journal notes</a>
        </section>
      </main>
    </SiteShell>
  )
}

function JournalMeta({ article }: Readonly<{ article: JournalArticle }>) {
  return (
    <p className="journal-meta">
      <span className="journal-kind">{article.kind}</span>
      <time dateTime={article.publishedAt}>{article.displayDate}</time>
      <span>{article.readingTime}</span>
    </p>
  )
}
