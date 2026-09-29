import { useSeen } from '../use-motion'

/**
 * Everything Found does with one saved PDF, written out as a record. Each row is
 * true of build 8 (see docs/iphone-release-claim-ledger.md, rows 1, 8–10, 17–19
 * and 31); the rows write in, then the record is stamped, once it is read.
 */
const ROWS = [
  { what: 'Kept the original file', note: '' },
  { what: 'Read all seven pages', note: '' },
  { what: 'Indexed every word', note: '' },
  { what: 'Indexed what it means', note: 'Optional' },
  { what: 'Added it to Spotlight', note: 'With Siri & Spotlight on' },
  { what: 'Found page 7 when asked', note: '' },
] as const

export function RecordLedger() {
  const [ref, seen] = useSeen<HTMLDivElement>(0.35)
  return (
    <div className={`record${seen ? ' is-read' : ''}`} ref={ref}>
      <p className="record__title"><span>What Found did with</span><strong>Signed agreement.pdf</strong><em className="record__stamp record__stamp--all">All on this iPhone</em></p>
      <ol className="record__rows">
        {ROWS.map((row, index) => (
          <li key={row.what} style={{ transitionDelay: `${index * 90}ms` }}>
            <span className="record__number">{String(index + 1).padStart(2, '0')}</span>
            <span className="record__what">{row.what}{row.note ? <small>{row.note}</small> : null}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
