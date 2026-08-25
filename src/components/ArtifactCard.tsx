import type { HomeScenario } from '../home-content'

type ArtifactCardProps = Readonly<{
  item: HomeScenario
  compact?: boolean
}>

export function ArtifactCard({ item, compact = false }: ArtifactCardProps) {
  return (
    <article className={`artifact-card${compact ? ' artifact-card--compact' : ''}`}>
      <span className="artifact-card__mark" aria-hidden="true">{item.format.charAt(0)}</span>
      <div>
        <p className="artifact-card__meta">{item.format}</p>
        <h3>{item.title}</h3>
        <p>{item.body}</p>
        {!compact && <small>{item.context}</small>}
      </div>
    </article>
  )
}
