import { useEffect } from 'react'

const TAP_SOUND_SRC = '/sounds/tap_02.mp3'
const OWN_SOUND_SELECTOR = '[data-own-sound]'

export function useGlobalClickSound() {
  useEffect(() => {
    const audio = new Audio(TAP_SOUND_SRC)

    const onClick = (event: MouseEvent) => {
      if (event.button !== 0) return
      if (!(event.target instanceof Element)) return
      if (event.target.closest(OWN_SOUND_SELECTOR)) return

      audio.currentTime = 0
      void audio.play().catch(() => {})
    }

    document.addEventListener('click', onClick, true)

    return () => {
      document.removeEventListener('click', onClick, true)
    }
  }, [])
}
