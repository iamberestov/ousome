import { useEffect, useRef, useState } from 'react'
import { EMAIL } from '../lib/email'
import { swapTextContent } from '../lib/textSwap'

const RESET_MS = 2500
const COPY_SOUND_SRC = '/sounds/email-copied.mp3'
const DEFAULT_LABEL = 'Say hi by email'
const COPIED_LABEL = 'Email copied!'

function CopyIconSwap({ copied }: { copied: boolean }) {
  return (
    <span
      className="home-footer-email-icon t-icon-swap"
      data-state={copied ? 'b' : 'a'}
      aria-hidden="true"
    >
      <span className="t-icon home-nav-icon--copy" data-icon="a">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M5.41406 7.00195L4.70605 7.70801C4.2532 8.15971 3.99915 8.77347 4 9.41309V18C4 19.1046 4.89543 20 6 20H14.5869C15.2265 20.0008 15.8403 19.7468 16.292 19.2939L16.998 18.5859L18.4141 19.998L17.708 20.7061C16.8808 21.5354 15.7573 22.0002 14.5859 21.999V22H6C3.79086 22 2 20.2091 2 18V9.41406C1.99886 8.24273 2.46458 7.1192 3.29395 6.29199L4.00195 5.58594L5.41406 7.00195ZM18 2C20.2091 2 22 3.79086 22 6V14C22 16.2091 20.2091 18 18 18H10C7.79086 18 6 16.2091 6 14V6C6 3.79086 7.79086 2 10 2H18ZM10 4C8.89543 4 8 4.89543 8 6V14C8 15.1046 8.89543 16 10 16H18C19.1046 16 20 15.1046 20 14V6C20 4.89543 19.1046 4 18 4H10Z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span className="t-icon home-nav-icon--copy" data-icon="b">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M60.419 17.2237L25.6414 52L4 30.3586L9.22367 25.1337L25.6414 41.5515L55.1941 12L60.419 17.2237Z"
            fill="currentColor"
          />
        </svg>
      </span>
    </span>
  )
}

function EmailCopyText() {
  const labelRef = useRef<HTMLSpanElement>(null)
  const resetTimeoutRef = useRef<number | null>(null)
  const copySoundRef = useRef<HTMLAudioElement | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current !== null) {
        window.clearTimeout(resetTimeoutRef.current)
      }
    }
  }, [])

  const playCopySound = () => {
    if (!copySoundRef.current) {
      copySoundRef.current = new Audio(COPY_SOUND_SRC)
    }

    const sound = copySoundRef.current
    sound.currentTime = 0
    void sound.play().catch(() => {})
  }

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
    } catch {
      return
    }

    playCopySound()

    if (resetTimeoutRef.current !== null) {
      window.clearTimeout(resetTimeoutRef.current)
    }

    if (!copied) {
      if (labelRef.current) {
        swapTextContent(labelRef.current, COPIED_LABEL)
      }
      setCopied(true)
    }

    resetTimeoutRef.current = window.setTimeout(() => {
      setCopied(false)
      if (labelRef.current) {
        swapTextContent(labelRef.current, DEFAULT_LABEL)
      }
    }, RESET_MS)
  }

  return (
    <button
      type="button"
      className={`home-footer-email${copied ? ' is-copied' : ''}`}
      data-own-sound
      onClick={handleClick}
      aria-label={copied ? 'Email copied' : 'Say hi by email, copy email address'}
    >
      <CopyIconSwap copied={copied} />
      <span ref={labelRef} className="t-text-swap">
        {DEFAULT_LABEL}
      </span>
    </button>
  )
}

export default EmailCopyText
