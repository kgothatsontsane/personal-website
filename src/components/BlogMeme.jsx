import { motion } from 'framer-motion'

function Meme({ meme }) {
  switch (meme.format) {
    case 'drake':
      return (
        <div className="meme meme-drake">
          <span className="meme-flag no" aria-hidden="true">🙅</span>
          <span className="meme-tint no">{meme.no}</span>
          <span className="meme-flag yes" aria-hidden="true">👉</span>
          <span className="meme-tint yes">{meme.yes}</span>
        </div>
      )
    case 'gru':
      return (
        <div className="meme meme-gru">
          {meme.plan.map((p, i) => (
            <span key={i} className={`meme-panel${i === 3 ? ' ohno' : ''}`}>
              <span aria-hidden="true" className="meme-panel-guy">{i === 3 ? '😟' : '🧐'}</span>
              {p}
            </span>
          ))}
        </div>
      )
    case 'brain':
      return (
        <div className="meme meme-brain">
          {meme.steps.map((s, i) => (
            <div key={i} className={`meme-brain-row lv${i}`}>
              <span className="meme-brain-title" aria-hidden="true">{['I', 'II', 'III', 'IV'][i]}</span>
              <span>{s}</span>
            </div>
          ))}
        </div>
      )
    case 'thisisfine':
      return (
        <div className="meme meme-fine">
          <span className="meme-fine-fire" aria-hidden="true">🔥🔥🔥🔥</span>
          <span className="meme-fine-dog" aria-hidden="true">🐕</span>
          <span className="meme-fine-line">{meme.line}</span>
        </div>
      )
    case 'spiderman':
      return (
        <div className="meme meme-spm">
          <div className="meme-spm-row">
            <span className="meme-panel">{meme.left}</span>
            <span className="meme-spm-vs" aria-hidden="true">🫵 ↔ 🫵</span>
            <span className="meme-panel">{meme.right}</span>
          </div>
          <span className="meme-spm-line">{meme.line}</span>
        </div>
      )
    case 'panik':
      return (
        <div className="meme meme-panik">
          <span className="memo" aria-hidden="true">😌</span><span className="meme-tint yes">{meme.kalm}</span>
          <span className="memo" aria-hidden="true">😱</span><span className="meme-tint no">{meme.panic}</span>
          <span className="memo" aria-hidden="true">😌</span><span className="meme-tint yes">{meme.kalm2}</span>
        </div>
      )
    default:
      return null
  }
}

export default function BlogMeme({ meme, index }) {
  if (!meme) return null
  return (
    <motion.figure
      className="meme-card"
      initial={{ opacity: 0, rotate: index % 2 ? 4 : -4, scale: 0.96 }}
      whileInView={{ opacity: 1, rotate: index % 2 ? 1.4 : -1.2, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <Meme meme={meme} />
      <figcaption className="meme-credit">GTAno meme · #{String(index + 1).padStart(2, '0')}</figcaption>
    </motion.figure>
  )
}
