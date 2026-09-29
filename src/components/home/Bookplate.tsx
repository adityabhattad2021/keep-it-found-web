import { useId, useState } from 'react'

/**
 * A preview of the First Edition bookplate, signed with whatever name the
 * visitor types. It never leaves the page: nothing is stored or sent.
 */
export function Bookplate() {
  const inputId = useId()
  const [name, setName] = useState('')
  const shown = name.trim() || 'Your name'

  return (
    <div className="bookplate-demo">
      <div className="bookplate" aria-label={`A First Edition bookplate signed ${shown}`} role="img">
        <div className="bookplate__frame">
          <span className="bookplate__mark" aria-hidden="true">Ex libris</span>
          <span className="bookplate__from">From the private library of</span>
          <span className={`bookplate__name${name.trim() ? '' : ' is-placeholder'}`}>{shown}</span>
          <span className="bookplate__rule" aria-hidden="true" />
          <span className="bookplate__note">A note from the beginning</span>
          <span className="bookplate__edition">A place in Found’s first chapter</span>
        </div>
      </div>
      <label className="bookplate-demo__field" htmlFor={inputId}>
        <span>Sign your copy</span>
        <input
          autoComplete="off"
          id={inputId}
          maxLength={28}
          placeholder="Type your name"
          spellCheck={false}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>
      <p className="bookplate-demo__note">A preview. Nothing you type here is saved or sent.</p>
    </div>
  )
}
