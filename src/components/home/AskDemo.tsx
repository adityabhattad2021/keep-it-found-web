import { useEffect, useMemo, useRef, useState } from 'react'

import { usePrefersReducedMotion, useSeen } from '../use-motion'
import { hasSearchTerms, RECENT, SAMPLE_QUESTIONS, searchSample } from './ask-library'
import type { SampleMatch } from './ask-library'

const REASON: Record<SampleMatch['reason'], string> = {
  meaning: 'Matched by meaning',
  words: 'Matched your words',
  photo: 'Words in the photo',
  page: 'On the page',
}

/**
 * Search the film's library by what you remember. The first question types
 * itself once the section is on screen, so the page shows the idea before
 * anyone reaches for the keyboard; after that it is the visitor's.
 */
export function AskDemo() {
  const reducedMotion = usePrefersReducedMotion()
  const [rootRef, seen] = useSeen<HTMLDivElement>(0.4)
  const [query, setQuery] = useState('')
  const [touched, setTouched] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const searching = hasSearchTerms(query)
  const results = useMemo(() => (searching ? searchSample(query) : RECENT), [query, searching])

  useEffect(() => {
    if (!seen || touched) return
    const first = SAMPLE_QUESTIONS[0]
    if (reducedMotion) {
      const timer = window.setTimeout(() => setQuery(first), 0)
      return () => window.clearTimeout(timer)
    }
    let index = 0
    const timer = window.setInterval(() => {
      index += 1
      setQuery(first.slice(0, index))
      if (index >= first.length) window.clearInterval(timer)
    }, 70)
    return () => window.clearInterval(timer)
  }, [seen, touched, reducedMotion])

  const ask = (text: string) => {
    setTouched(true)
    setQuery(text)
    inputRef.current?.focus()
  }

  return (
    <div className="ask" ref={rootRef}>
      <div className="ask__panel">
        <label className="ask__field">
          <span className="sr-only">Search the sample library</span>
          <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m15.5 15.5 5 5" /></svg>
          <input
            ref={inputRef}
            autoComplete="off"
            enterKeyHint="search"
            placeholder="Find anything"
            spellCheck={false}
            type="search"
            value={query}
            onChange={(event) => { setTouched(true); setQuery(event.target.value) }}
          />
        </label>
        <div className="ask__suggestions" role="group" aria-label="Try asking">
          {SAMPLE_QUESTIONS.map((question) => (
            <button className={query === question ? 'is-current' : ''} key={question} type="button" onClick={() => ask(question)}>{question}</button>
          ))}
        </div>
        <div className="ask__results" aria-live="polite">
          <p className="ask__count">{searching ? `${results.length} ${results.length === 1 ? 'result' : 'results'}` : 'Recently saved'}</p>
          {results.length === 0 && searching ? (
            <div className="ask__empty">
              <strong>Not found.</strong>
              <span>This sample library is small. Try one of the questions above.</span>
            </div>
          ) : null}
          {results.map((match, index) => (
            <article className={`ask-card${searching && index === 0 ? ' ask-card--best' : ''}`} key={`${searching ? 'r' : 'l'}-${match.item.id}`}>
              <header>
                <span>{searching && index === 0 ? `Best match · ${match.item.kind}` : match.item.kind}</span>
                {searching ? <span className="ask-card__why">{REASON[match.reason]}{match.item.page && match.reason === 'page' ? ` · ${match.item.page}` : ''}</span> : null}
              </header>
              <h4>{match.item.title}</h4>
              <p className="ask-card__meta">{match.item.meta}</p>
              <p className="ask-card__excerpt">
                {match.excerpt.map((part, partIndex) => (typeof part === 'string' ? part : <mark key={partIndex}>{part.mark}</mark>))}
              </p>
              <footer>{match.item.actions.map((action) => <span key={action}>{action}</span>)}</footer>
            </article>
          ))}
        </div>
      </div>
      <p className="ask__note">A sample library in your browser. On your iPhone, Found searches your own, on the device. Search by meaning is an optional on-device download.</p>
    </div>
  )
}
