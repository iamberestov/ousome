import { useEffect, useRef, useState } from 'react'
import { swapTextContent } from '../lib/textSwap'

const EMAIL = 'rockberrycom@gmail.com'
const RESET_MS = 2500

function EmailCopyLink() {
  const labelRef = useRef<HTMLSpanElement>(null)
  const resetTimeoutRef = useRef<number | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current !== null) {
        window.clearTimeout(resetTimeoutRef.current)
      }
    }
  }, [])

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
    } catch {
      return
    }

    if (resetTimeoutRef.current !== null) {
      window.clearTimeout(resetTimeoutRef.current)
    }

    if (!copied) {
      if (labelRef.current) {
        swapTextContent(labelRef.current, 'copied')
      }
      setCopied(true)
    }

    resetTimeoutRef.current = window.setTimeout(() => {
      setCopied(false)
      if (labelRef.current) {
        swapTextContent(labelRef.current, 'email')
      }
    }, RESET_MS)
  }

  return (
    <button
      type="button"
      className="home-nav-link"
      onClick={handleClick}
      aria-label={copied ? 'Email copied' : `Copy email ${EMAIL}`}
    >
      <span
        className="home-nav-icon t-icon-swap"
        data-state={copied ? 'b' : 'a'}
        aria-hidden="true"
      >
        <span className="t-icon home-nav-icon--copy" data-icon="a">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="21" y="17" width="14" height="14" rx="3" transform="rotate(180 21 17)" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M17 20C16.3604 20.6413 15.4915 21.0012 14.5857 21H6C4.34315 21 3 19.6569 3 18V9.41431C2.99879 8.50854 3.35869 7.63964 4 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span className="t-icon home-nav-icon--copy" data-icon="b">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 14.5L11.5 19L21 9.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </span>
      <span ref={labelRef} className="t-text-swap">
        email
      </span>
    </button>
  )
}

export default EmailCopyLink
