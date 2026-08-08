import { useRef } from 'react'
import type { ReactNode } from 'react'

import { siteConfig, sitePath } from '../site-config'

type SiteShellProps = Readonly<{
  children: ReactNode
  page: 'home' | 'privacy' | 'roadmap' | 'support'
}>

export function SiteShell({ children, page }: SiteShellProps) {
  const mobileNavigationRef = useRef<HTMLDetailsElement>(null)
  const getFoundHref = siteConfig.releases.android.href
    ?? (page === 'home' ? '#get-found' : sitePath('#get-found'))
  const getFoundIsExternal = Boolean(siteConfig.releases.android.href && siteConfig.releases.android.external)
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
            <a aria-current={page === 'roadmap' ? 'page' : undefined} href={sitePath('roadmap/')}>Roadmap</a>
            <a aria-current={page === 'support' ? 'page' : undefined} href={sitePath('support/')}>Support</a>
            <a
              className="header-cta press-surface press-surface--raised"
              href={getFoundHref}
              rel={getFoundIsExternal ? 'noreferrer' : undefined}
              target={getFoundIsExternal ? '_blank' : undefined}
            >
              Get Found
            </a>
          </nav>
          <details className="mobile-nav" ref={mobileNavigationRef}>
            <summary>MENU</summary>
            <nav aria-label="Mobile navigation">
              <div className="mobile-nav__group">
                <p>Explore</p>
                <a href={sitePath('#features')} onClick={closeMobileNavigation}>Features</a>
                <a aria-current={page === 'roadmap' ? 'page' : undefined} href={sitePath('roadmap/')} onClick={closeMobileNavigation}>Roadmap</a>
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
                rel={getFoundIsExternal ? 'noreferrer' : undefined}
                target={getFoundIsExternal ? '_blank' : undefined}
              >
                Get Found
              </a>
            </nav>
          </details>
        </div>
      </header>
      <div id="main-content">{children}</div>
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
            <a href={sitePath('#features')}>Features</a>
            <a aria-current={page === 'roadmap' ? 'page' : undefined} href={sitePath('roadmap/')}>Roadmap</a>
          </nav>
          <nav aria-label="Found help and information">
            <p>Help</p>
            <a aria-current={page === 'support' ? 'page' : undefined} href={sitePath('support/')}>Support</a>
            <a aria-current={page === 'privacy' ? 'page' : undefined} href={sitePath('privacy/')}>Privacy</a>
            <a href={siteConfig.repositoryUrl} rel="noreferrer" target="_blank">Source code</a>
          </nav>
        </div>
        <p className="site-footer__note">Local first. Built in the open.</p>
      </div>
    </footer>
  )
}
