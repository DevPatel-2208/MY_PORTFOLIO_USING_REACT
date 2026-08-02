import TypeLines from './TypeLines'

/*
 * macOS-style terminal window.
 *
 *   <TerminalWindow>
 *     <TypeLines />  — runs the infinite live-typing loop (command, output
 *                      lines, awaiting-input prompt and blinking cursor).
 *
 * Every row (command, lines, prompt) stays in the layout tree during the
 * loop, so the window height is constant from first paint — zero layout
 * shift while the terminal types, pauses and erases forever.
 */
export default function TerminalWindow({
  id = 'terminal',
  title = 'dev-patel — zsh',
  user,
  cwd,
  command = 'npm run dev-patel',
  lines = [],
}) {
  return (
    <div
      data-cursor="badge"
      className="group overflow-hidden rounded-2xl border border-border bg-[#0a0f1e] shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.05] px-4 py-3.5">
        <span className="h-3 w-3 rounded-full bg-red-500/90" aria-hidden="true" />
        <span className="h-3 w-3 rounded-full bg-amber-500/90" aria-hidden="true" />
        <span className="h-3 w-3 rounded-full bg-green-500/90" aria-hidden="true" />
        <span className="ml-2 truncate font-mono text-sm text-slate-400">{title}</span>
      </div>

      <div className="terminal-window p-5 font-mono sm:p-6">
        <TypeLines id={id} command={command} lines={lines} user={user} cwd={cwd} />
      </div>
    </div>
  )
}
