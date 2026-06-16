import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { swapTextContent } from '../lib/textSwap'
import { EMAIL } from '../lib/email'

const RESET_MS = 2500
const COPY_SOUND_SRC = '/sounds/email-copied.mp3'
const VISUAL_MOUNT_ID = 'home-nav-visual-mount'

function EmailNavContent({
  copied,
  labelRef,
}: {
  copied: boolean
  labelRef?: React.RefObject<HTMLSpanElement | null>
}) {
  return (
    <span className="home-nav-blend">
      <span
        className="home-nav-icon t-icon-swap"
        data-state={copied ? 'b' : 'a'}
        aria-hidden="true"
      >
        <span className="t-icon home-nav-icon--copy" data-icon="a">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.41406 7.00195L4.70605 7.70801C4.2532 8.15971 3.99915 8.77347 4 9.41309V18C4 19.1046 4.89543 20 6 20H14.5869C15.2265 20.0008 15.8403 19.7468 16.292 19.2939L16.998 18.5859L18.4141 19.998L17.708 20.7061C16.8808 21.5354 15.7573 22.0002 14.5859 21.999V22H6C3.79086 22 2 20.2091 2 18V9.41406C1.99886 8.24273 2.46458 7.1192 3.29395 6.29199L4.00195 5.58594L5.41406 7.00195ZM18 2C20.2091 2 22 3.79086 22 6V14C22 16.2091 20.2091 18 18 18H10C7.79086 18 6 16.2091 6 14V6C6 3.79086 7.79086 2 10 2H18ZM10 4C8.89543 4 8 4.89543 8 6V14C8 15.1046 8.89543 16 10 16H18C19.1046 16 20 15.1046 20 14V6C20 4.89543 19.1046 4 18 4H10Z" fill="currentColor" />
          </svg>
        </span>
        <span className="t-icon home-nav-icon--copy" data-icon="b">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.597 6.09998L10.1 18.597L2.40271 10.8998L4.09998 9.20251L10.1 15.2025L20.8998 4.40271L22.597 6.09998Z" fill="currentColor" />
          </svg>
        </span>
      </span>
      <span ref={labelRef} className="t-text-swap">
        {copied ? 'Copied' : 'Email'}
      </span>
    </span>
  )
}

function EmailCopyLink() {
  const labelRef = useRef<HTMLSpanElement>(null)
  const resetTimeoutRef = useRef<number | null>(null)
  const copySoundRef = useRef<HTMLAudioElement | null>(null)
  const [copied, setCopied] = useState(false)
  const [visualMount, setVisualMount] = useState<HTMLElement | null>(null)

  useEffect(() => {
    setVisualMount(document.getElementById(VISUAL_MOUNT_ID))
  }, [])

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
        swapTextContent(labelRef.current, 'Copied')
      }
      setCopied(true)
    }

    resetTimeoutRef.current = window.setTimeout(() => {
      setCopied(false)
      if (labelRef.current) {
        swapTextContent(labelRef.current, 'Email')
      }
    }, RESET_MS)
  }

  const visualLayer = visualMount
    ? createPortal(
        <span className="home-nav-item">
          <span className="home-nav-link home-nav-link--visual">
            <EmailNavContent copied={copied} />
          </span>
        </span>,
        visualMount,
      )
    : null

  return (
    <>
      <span className="home-nav-item">
        <button
          type="button"
          className="home-nav-link home-nav-link--hit"
          data-own-sound
          onClick={handleClick}
          aria-label={copied ? 'Email copied' : `Copy email ${EMAIL}`}
        >
          <EmailNavContent copied={copied} labelRef={labelRef} />
        </button>
      </span>
      {visualLayer}
    </>
  )
}

export default EmailCopyLink
