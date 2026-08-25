import { libraryFormats } from '../home-content'

export function LibraryProof() {
  return (
    <ul className="library-proof" aria-label="What Found keeps">
        {libraryFormats.map((format) => (
          <li key={format.id}>
            <span className="library-proof__mark" aria-hidden="true">{format.mark}</span>
            <div>
              <p>{format.label}</p>
              <strong>{format.title}</strong>
            </div>
            <small>{format.detail}</small>
          </li>
        ))}
    </ul>
  )
}
