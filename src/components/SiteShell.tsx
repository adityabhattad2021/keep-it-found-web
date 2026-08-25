import { useRef } from 'react'
import type { ReactNode } from 'react'

import { sitePath } from '../site-config'

type SiteShellProps = Readonly<{
  children: ReactNode
  page: 'get' | 'home' | 'journal' | 'privacy' | 'roadmap' | 'support'
}>

export function SiteShell({ children, page }: SiteShellProps) {
  const mobileNavigationRef = useRef<HTMLDetailsElement>(null)
  const getFoundHref = sitePath('get/')
  const closeMobileNavigation = () => mobileNavigationRef.current?.removeAttribute('open')

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <div className="site-header__inner content-width">
          <a className="brand" href={sitePath()} aria-label="Found home">
            <img src={sitePath('brand/found-favicon.png')} width="32" height="32" alt="" />
            <span>Found</span>
          </a>
          <nav className="desktop-nav" aria-label="Primary navigation">
            <a aria-current={page === 'home' ? 'page' : undefined} href={sitePath()}>Product</a>
            <a aria-current={page === 'roadmap' ? 'page' : undefined} href={sitePath('roadmap/')}>Roadmap</a>
            <a aria-current={page === 'journal' ? 'page' : undefined} href={sitePath('journal/')}>Journal</a>
            <a aria-current={page === 'support' ? 'page' : undefined} href={sitePath('support/')}>Support</a>
            <a
              className="header-cta press-surface press-surface--raised"
              href={getFoundHref}
              aria-current={page === 'get' ? 'page' : undefined}
            >
              Get Found
            </a>
          </nav>
          <details className="mobile-nav" ref={mobileNavigationRef}>
            <summary>MENU</summary>
            <nav aria-label="Mobile navigation">
              <div className="mobile-nav__group">
                <p>Explore</p>
                <a aria-current={page === 'home' ? 'page' : undefined} href={sitePath()} onClick={closeMobileNavigation}>Product</a>
                <a aria-current={page === 'roadmap' ? 'page' : undefined} href={sitePath('roadmap/')} onClick={closeMobileNavigation}>Roadmap</a>
                <a aria-current={page === 'journal' ? 'page' : undefined} href={sitePath('journal/')} onClick={closeMobileNavigation}>Journal</a>
              </div>
              <div className="mobile-nav__group">
                <p>Help</p>
                <a aria-current={page === 'support' ? 'page' : undefined} href={sitePath('support/')} onClick={closeMobileNavigation}>Support</a>
                <a aria-current={page === 'privacy' ? 'page' : undefined} href={sitePath('privacy/')} onClick={closeMobileNavigation}>Privacy</a>
              </div>
              <a
                className="mobile-nav__cta press-surface press-surface--raised"
                href={getFoundHref}
                onClick={closeMobileNavigation}
                aria-current={page === 'get' ? 'page' : undefined}
              >
                Get Found
              </a>
            </nav>
          </details>
        </div>
      </header>
      <div id="main-content" tabIndex={-1}>{children}</div>
      <SiteFooter page={page} />
    </>
  )
}

function SiteFooter({ page }: Readonly<{ page: SiteShellProps['page'] }>) {
  return (
    <footer className="site-footer">
      <div className="content-width site-footer__layout">
        <div className="site-footer__brand">
          <img src={sitePath('brand/found-favicon.png')} width="36" height="36" alt="" />
          <p><strong>Found</strong><span>Keep something worth finding again.</span></p>
        </div>
        <div className="site-footer__links">
          <nav aria-label="Explore Found">
            <p>Explore</p>
            <a aria-current={page === 'home' ? 'page' : undefined} href={sitePath()}>Product</a>
            <a aria-current={page === 'roadmap' ? 'page' : undefined} href={sitePath('roadmap/')}>Roadmap</a>
            <a aria-current={page === 'journal' ? 'page' : undefined} href={sitePath('journal/')}>Journal</a>
          </nav>
          <nav aria-label="Found help and information">
            <p>Help</p>
            <a aria-current={page === 'support' ? 'page' : undefined} href={sitePath('support/')}>Support</a>
            <a aria-current={page === 'privacy' ? 'page' : undefined} href={sitePath('privacy/')}>Privacy</a>
          </nav>
        </div>
        <p className="site-footer__note">Made independently.<br />Shaped by real use.</p>
      </div>
    </footer>
  )
}
