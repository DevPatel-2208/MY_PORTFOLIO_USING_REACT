import { useEffect } from 'react'

/* Global hotkey: Ctrl+K / Cmd+K toggles the palette.
   Never hijacks keystrokes while the user is typing. */
export default function usePaletteHotkey(onToggle) {
  useEffect(() => {
    const onKey = (e) => {
      if (!(e.ctrlKey || e.metaKey)) return
      if (e.key.toLowerCase() !== 'k') return
      const t = e.target
      if (
        t &&
        (t.tagName === 'INPUT' ||
          t.tagName === 'TEXTAREA' ||
          t.tagName === 'SELECT' ||
          t.isContentEditable)
      ) {
        return
      }
      e.preventDefault()
      onToggle()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onToggle])
}
