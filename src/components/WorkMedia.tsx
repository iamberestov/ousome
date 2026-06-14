import { useEffect, useRef, useState, type CSSProperties } from 'react'
import type { WorkMedia as WorkMediaConfig } from '../data/workSections'

const DEFAULT_ASPECT_RATIO = 907 / 668

interface WorkMediaProps {
  media: WorkMediaConfig
  scrollRoot?: HTMLElement | null
}

function WorkMedia({ media, scrollRoot }: WorkMediaProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isNearViewport, setIsNearViewport] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  const aspectRatio = media.aspectRatio ?? DEFAULT_ASPECT_RATIO
  const shouldPlayVideo = media.type === 'video' && isNearViewport && !prefersReducedMotion

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setPrefersReducedMotion(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const node = containerRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        setIsNearViewport(Boolean(entry?.isIntersecting && entry.intersectionRatio >= 0.2))
      },
      {
        root: scrollRoot ?? null,
        threshold: [0, 0.2, 0.35],
        rootMargin: '200px 0px',
      },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [scrollRoot])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !shouldPlayVideo) return

    const playPromise = video.play()
    if (playPromise) {
      playPromise.catch(() => {})
    }
  }, [shouldPlayVideo])

  useEffect(() => {
    const video = videoRef.current
    if (!video || shouldPlayVideo) return

    video.pause()
  }, [shouldPlayVideo])

  const frameStyle = {
    '--work-media-ratio': String(aspectRatio),
  } as CSSProperties

  if (media.type === 'image') {
    return (
      <div ref={containerRef} className="home-work-media">
        <div className="home-work-media-frame" style={frameStyle}>
          <img
            className="home-work-media-asset"
            src={media.src}
            alt={media.alt}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    )
  }

  const posterAlt = media.label ?? 'Project preview'

  return (
    <div ref={containerRef} className="home-work-media">
      <div className="home-work-media-frame" style={frameStyle}>
        {shouldPlayVideo ? (
          <video
            ref={videoRef}
            className="home-work-media-asset"
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
            poster={media.poster}
            aria-label={posterAlt}
          >
            {media.webm ? <source src={media.webm} type="video/webm" /> : null}
            <source src={media.src} type="video/mp4" />
          </video>
        ) : media.poster ? (
          <img
            className="home-work-media-asset"
            src={media.poster}
            alt={posterAlt}
            loading="lazy"
            decoding="async"
          />
        ) : null}
      </div>
    </div>
  )
}

export default WorkMedia
