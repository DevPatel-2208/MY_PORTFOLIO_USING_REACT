import { motion } from 'framer-motion'
import {
  FiBox,
  FiAward,
  FiEye,
  FiMail,
  FiTrendingUp,
  FiTrendingDown,
} from 'react-icons/fi'
import AnimatedNumber from '../../components/ui/AnimatedNumber'
import { Sparkline } from './Charts'

const iconMap = {
  FiBox,
  FiAward,
  FiEye,
  FiMail,
}

const toneText = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  accent: 'text-accent',
  warning: 'text-warning',
}

const toneChip = {
  primary: 'bg-primary/12 text-primary border-primary/25',
  secondary: 'bg-secondary/12 text-secondary border-secondary/25',
  accent: 'bg-accent/12 text-accent border-accent/25',
  warning: 'bg-amber-500/12 text-amber-600 dark:text-amber-400 border-amber-500/25',
}

export default function StatCard({ stat, index = 0 }) {
  const Icon = iconMap[stat.icon] || FiBox
  const TrendIcon = stat.trend === 'up' ? FiTrendingUp : FiTrendingDown

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="admin-card is-interactive p-4 sm:p-5 overflow-hidden"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted truncate">
            {stat.label}
          </p>
          <p className="mt-1.5 text-2xl sm:text-3xl font-extrabold text-content tracking-tight tabular-nums">
            <AnimatedNumber end={stat.value} duration={1.6} delay={index * 0.08} />
          </p>
        </div>
        <span
          className={`w-10 h-10 sm:w-11 sm:h-11 flex-none rounded-xl grid place-items-center border ${toneChip[stat.tone]}`}
        >
          <Icon size={19} />
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold border ${toneChip[stat.tone]}`}
        >
          <TrendIcon size={12} />
          {stat.delta}
        </span>
        <span className="text-[11px] text-muted truncate">{stat.hint}</span>
      </div>

      <div className={`mt-3 h-9 ${toneText[stat.tone]}`}>
        <Sparkline data={stat.spark} tone={stat.tone} />
      </div>
    </motion.article>
  )
}
