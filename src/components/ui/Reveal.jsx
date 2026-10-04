import { motion } from 'framer-motion'

const variants = {
  up: { hidden: { opacity: 0, y: 36 }, visible: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -36 }, visible: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -48 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 48 }, visible: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } },
  fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
}

export default function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  once = true,
  amount = 0.2,
  className = '',
  ...rest
}) {
  const variant = variants[direction] || variants.up

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: variant.hidden,
        visible: {
          ...variant.visible,
          transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
