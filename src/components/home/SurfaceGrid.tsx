import { sitePath } from '../../site-config'

/**
 * Every place Found answers from, each drawn small in Found's own style. Names,
 * phrases and OS floors come from the claim ledger (rows 4, 18, 21, 22, 25, 27).
 */
export function SurfaceGrid() {
  return (
    <>
      <ul className="surfaces">
        <li className="surface reveal">
          <div className="surface__visual surface__visual--result" aria-hidden="true">
            <p className="mini-label">Best match · PDF</p>
            <p className="mini-title">Signed agreement</p>
            <p className="mini-quote"><mark>Cancellation terms</mark>: 30 days’ written notice.</p>
            <p className="mini-meta">Page 7 · Preview · Copy passage · Share</p>
          </div>
          <h3>Find with Found</h3>
          <p>Share a question, a selection or a screenshot from another app. Get the passage, its page, and the original file.</p>
        </li>

        <li className="surface reveal">
          <div className="surface__visual surface__visual--keyboard" aria-hidden="true">
            <p className="mini-field">;terms<span className="mini-caret" /></p>
            <div className="mini-key-card">
              <p className="mini-title">Cancellation reply</p>
              <p className="mini-meta">It’s 30 days’ notice. It’s on page 7…</p>
            </div>
          </div>
          <h3>Found Keyboard</h3>
          <p>Type ; and a note’s shortcut in a text field, and your saved words go in. No Full Access.</p>
        </li>

        <li className="surface reveal">
          <div className="surface__visual surface__visual--siri" aria-hidden="true">
            <p className="mini-said">“Ask Found a question.”</p>
            <p className="mini-asked">What would you like to know?</p>
            <p className="mini-said">“When is the soft open?”</p>
            <p className="mini-answer">Soft open moved to Oct 14. Doors at 10. <span>From “Soft open”</span></p>
          </div>
          <h3>Siri</h3>
          <p>Siri answers with the passage you saved and says where it came from. Never a made-up answer. iOS 26.</p>
        </li>

        <li className="surface reveal">
          <div className="surface__visual surface__visual--spotlight" aria-hidden="true">
            <p className="mini-search">rate card</p>
            <div className="mini-row">
              <img src={sitePath('brand/found-icon.png')} alt="" width="34" height="34" />
              <div>
                <p className="mini-title">Rate card</p>
                <p className="mini-meta">Day rate: 640 · Half day: 360</p>
              </div>
            </div>
          </div>
          <h3>Spotlight</h3>
          <p>Your saved things turn up by name in Spotlight, and open straight in Found.</p>
        </li>

        <li className="surface reveal">
          <div className="surface__visual surface__visual--shortcuts" aria-hidden="true">
            <p className="mini-action">Find in Found <span>rate card</span></p>
            <p className="mini-action">Get Text from Found Item</p>
            <p className="mini-action">Send Found Item</p>
          </div>
          <h3>Shortcuts</h3>
          <p>Find, copy, open and send what you saved, as steps in your own shortcuts. iOS 17.</p>
        </li>

        <li className="surface reveal">
          <div className="surface__visual surface__visual--controls" aria-hidden="true">
            <span className="mini-control"><span className="mini-control__glyph"><svg aria-hidden="true" viewBox="0 0 24 24" className="mini-control__svg"><path d="M12 5v14M5 12h14" /></svg></span>Save Clipboard to Found</span>
            <span className="mini-control"><span className="mini-control__glyph"><svg aria-hidden="true" viewBox="0 0 24 24" className="mini-control__svg"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m15.5 15.5 5 5" /></svg></span>Find in Found</span>
          </div>
          <h3>Control Center</h3>
          <p>Keep what you copied, or open Find, from Control Center or the Lock Screen. iOS 18.</p>
        </li>
      </ul>
      <p className="surfaces__note">Find with Found, Siri, Spotlight and Shortcuts share one switch: Siri &amp; Spotlight, in Found’s Settings. The Found Keyboard is added in iOS Settings.</p>
    </>
  )
}
