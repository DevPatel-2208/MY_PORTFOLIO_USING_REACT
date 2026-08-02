import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

const CHAR_DELAY = 34
const LINE_DELAY = 380
const HOLD_DELAY = 2600
const ERASE_LINE_DELAY = 240
const ERASE_CHAR_DELAY = 16
const RESTART_DELAY = 420
const START_DELAY = 380

/*
 * Live developer terminal — an infinite typing loop.
 *
 * Timeline, repeated forever:
 *   1. type the command char-by-char
 *   2. reveal each output line (fade + slide in)
 *   3. show the awaiting-input prompt with a blinking cursor, then hold ~2.6s
 *   4. fade the prompt, then erase lines one-by-one (bottom → top)
 *   5. backspace the command, pause briefly, and restart
 *
 * All lines and the prompt line stay in the layout tree for the whole loop
 * (visibility is animated via opacity/transform), so the window height is
 * constant — zero layout shift, zero flicker. Reduced motion renders the
 * finished state instantly with no loop.
 */
export default function TypeLines({ command = '', lines = [], user, cwd }) {
  const reduce = useReducedMotion()
  const rootRef = useRef(null)
  const inView = useInView(rootRef, { once: true, amount: 0.3 })

  const [typed, setTyped] = useState(0)
  const [visible, setVisible] = useState(0)
  const [promptShown, setPromptShown] = useState(false)
  const [cursorAt, setCursorAt] = useState('command')

  useEffect(() => {
    /* Reduced motion → final state instantly, no looping. */
    if (reduce) {
      setTyped(command.length)
      setVisible(lines.length)
      setPromptShown(true)
      setCursorAt('prompt')
      return undefined
    }

    /* Do not start until the terminal is first visible. */
    if (!inView) return undefined

    let alive = true
    const timers = new Set()
    const sleep = (ms) =>
      new Promise((resolve) => {
        const timer = setTimeout(() => {
          timers.delete(timer)
          resolve()
        }, ms)
        timers.add(timer)
      })

    const run = async () => {
      while (alive) {
        setTyped(0)
        setVisible(0)
        setPromptShown(false)
        setCursorAt('command')

        await sleep(START_DELAY)

        for (let i = 1; i <= command.length && alive; i++) {
          setTyped(i)
          await sleep(CHAR_DELAY)
        }

        for (let i = 1; i <= lines.length && alive; i++) {
          setVisible(i)
          await sleep(LINE_DELAY)
        }

        setPromptShown(true)
        setCursorAt('prompt')
        await sleep(HOLD_DELAY)

        setCursorAt('command')
        setPromptShown(false)
        for (let i = lines.length - 1; i >= 0 && alive; i--) {
          setVisible(i)
          await sleep(ERASE_LINE_DELAY)
        }

        for (let i = command.length - 1; i >= 0 && alive; i--) {
          setTyped(i)
          await sleep(ERASE_CHAR_DELAY)
        }

        await sleep(RESTART_DELAY)
      }
    }

    run()

    return () => {
      alive = false
      timers.forEach(clearTimeout)
      timers.clear()
    }
  }, [command, inView, lines.length, reduce])

  const showUser = Boolean(user && cwd)
  const typedText = command.slice(0, typed)

  return (
    <div ref={rootRef} className="space-y-2">
      {/* Command line — always in flow, cursor follows the typed text. */}
      <p className="flex items-start gap-2.5">
        <span className="shrink-0 font-bold text-emerald-400">$</span>
        <span className="min-w-0 text-slate-100">
          {typedText}
          {cursorAt === 'command' && (
            <span className="terminal-cursor text-slate-100" aria-hidden="true" />
          )}
        </span>
      </p>

      {/* Output lines — kept in the tree, visibility animated by class. */}
      {lines.map((line, i) => (
        <p
          key={line}
          className={`terminal-line flex items-start gap-2.5 ${
            i < visible ? 'terminal-line-visible' : 'terminal-line-hidden'
          }`}
        >
          <span className="shrink-0 text-[var(--c-accent)]">▸</span>
          <span className="min-w-0 text-slate-300">{line}</span>
        </p>
      ))}

      {/* Awaiting-input prompt — reserved in flow so height never changes. */}
      <p
        aria-label="Terminal prompt awaiting input"
        className={`terminal-prompt flex items-start gap-2.5 text-slate-300 ${
          promptShown ? 'terminal-prompt-visible' : 'terminal-prompt-hidden'
        }`}
      >
        {showUser ? (
          <>
            <span>{user}</span>
            <span className="text-[var(--c-accent)]">:</span>
            <span className="text-[var(--c-accent)]">{cwd}</span>
            <span className="font-bold text-emerald-400">$</span>
          </>
        ) : (
          <span className="font-bold text-emerald-400">$</span>
        )}
        {cursorAt === 'prompt' && (
          <span className="terminal-cursor text-slate-100" aria-hidden="true" />
        )}
      </p>
    </div>
  )
}
