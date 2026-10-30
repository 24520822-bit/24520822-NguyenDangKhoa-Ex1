import { Fragment, useState } from 'react'
import SkillBadge from './SkillBadge.jsx'
import styles from './DeveloperCard.module.css'

function DeveloperCard({
  fullName = 'Jordan Lee',
  role = 'Frontend Engineer',
  avatarUrl = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
  metrics = {
    'Win Rate': '92%',
    Rank: 'Diamond',
    Projects: 24,
  },
  skills = [
    { id: 'react', name: 'React', tier: 'Expert' },
    { id: 'typescript', name: 'TypeScript', tier: 'Advanced' },
    { id: 'css', name: 'CSS', tier: 'Expert' },
  ],
}) {
  const [imgFailed, setImgFailed] = useState(false)

  return (
    <article aria-labelledby="dev-heading" className={styles.card}>
      <header className={styles.header}>
        {imgFailed ? (
          <span className={styles.avatarFallback} aria-hidden="true">
            {fullName.trim().charAt(0)}
          </span>
        ) : (
          <img
            className={styles.avatar}
            src={avatarUrl}
            alt={fullName}
            width="64"
            height="64"
            onError={() => setImgFailed(true)}
          />
        )}
        <hgroup>
          <h2 id="dev-heading">{fullName}</h2>
          <p>{role}</p>
        </hgroup>
      </header>
      <dl className={styles.metrics}>
        {Object.entries(metrics).map(([k, v]) => (
          <Fragment key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </Fragment>
        ))}
      </dl>
      <ul className={styles.skills} aria-label="Engineered Skills">
        {skills.map((s) => (
          <SkillBadge key={s.id} {...s} />
        ))}
      </ul>
    </article>
  )
}

export default DeveloperCard
