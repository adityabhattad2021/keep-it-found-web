import { PlatformActions } from './PlatformActions'
import { ProductJourney } from './ProductJourney'

export function HeroExperience() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__inner content-width">
        <header className="hero__copy">
          <p className="eyebrow">YOUR PRIVATE, REUSABLE LIBRARY</p>
          <h1 id="hero-title">Found.</h1>
          <p className="hero__statement">Keep it once. Use it again.</p>
          <p className="hero__support">Save the reply, document, image, link, list, or detail while it is in front of you. Found brings back the exact item when you need to copy, open, or share it.</p>
          <a className="hero__invitation press-surface press-surface--raised" href="#try-found">
            See how it comes back
            <span aria-hidden="true">↓</span>
          </a>
        </header>
        <PlatformActions placement="hero" />

        <div id="try-found">
          <ProductJourney />
        </div>
      </div>
    </section>
  )
}
