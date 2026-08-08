import { FoundTodayDemo } from './FoundTodayDemo'
import { PlatformActions } from './PlatformActions'

export function HeroExperience() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__inner content-width">
        <header className="hero__copy">
          <p className="eyebrow">YOUR PRIVATE PLACE</p>
          <h1 id="hero-title">Found</h1>
          <p className="hero__statement">
            <span>Keep the thought. Do the task.</span>
            <strong>Let the right things return.</strong>
          </p>
          <p className="hero__support">Notes, tasks, reminders, files, links, images, and ongoing threads — together without becoming the same thing.</p>
        </header>

        <FoundTodayDemo />

        <PlatformActions placement="hero" />
      </div>
    </section>
  )
}
