import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import workSections, { type WorkSection } from '../data/workSections'
import { smoothScrollElementsToTop } from '../lib/gsapScroll'
import EmailCopyLink from '../components/EmailCopyLink'
import HomeFooter from '../components/HomeFooter'
import WorkMedia from '../components/WorkMedia'

const HERO_ID = 'hero-intro'
const STAGGER_HIDE_MS = 200
const AVATAR_SOUND_SRC = '/sounds/tap_01.mp3'

const tags = [
  'B2B SAAS',
  'AI DESIGN',
  'AI AGENTS',
  '0→1',
  'CRAFT',
  'USER FIRST',
  'END→END',
  'PRODUCT STRATEGY',
]

function Home() {
  const mainScrollRef = useRef<HTMLDivElement>(null)
  const sidebarScrollRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})
  const sidebarStaggerRef = useRef<HTMLDivElement>(null)
  const workActiveStaggerRef = useRef<HTMLDivElement>(null)
  const avatarSoundRef = useRef<HTMLAudioElement | null>(null)
  const displayedSectionIdRef = useRef<string | null>(null)
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null)
  const [displayedSection, setDisplayedSection] = useState<WorkSection | undefined>(undefined)
  const [mainScrollRoot, setMainScrollRoot] = useState<HTMLDivElement | null>(null)

  const setMainScrollElement = (node: HTMLDivElement | null) => {
    mainScrollRef.current = node
    setMainScrollRoot(node)
  }

  const playAvatarSound = () => {
    if (!avatarSoundRef.current) {
      avatarSoundRef.current = new Audio(AVATAR_SOUND_SRC)
    }

    const sound = avatarSoundRef.current
    sound.currentTime = 0
    void sound.play().catch(() => {})
  }

  const scrollToIntro = () => {
    playAvatarSound()
    setActiveSectionId(null)
    smoothScrollElementsToTop([mainScrollRef.current])
  }

  useEffect(() => {
    const root = mainScrollRef.current
    if (!root) return

    const resolveActiveSectionId = (): string | null => {
      const hero = heroRef.current
      const rootRect = root.getBoundingClientRect()
      const triggerY = rootRect.top + rootRect.height * 0.25

      if (hero) {
        const heroRect = hero.getBoundingClientRect()
        if (heroRect.bottom > triggerY) return null
      }

      const nearBottom = root.scrollHeight - root.scrollTop - root.clientHeight < 32
      if (nearBottom) {
        return workSections[workSections.length - 1]?.id ?? null
      }

      let activeId: string | null = null
      let activeTop = -Infinity

      for (const { id } of workSections) {
        const node = sectionRefs.current[id]
        if (!node) continue

        const top = node.getBoundingClientRect().top
        if (top <= triggerY && top > activeTop) {
          activeTop = top
          activeId = id
        }
      }

      return activeId
    }

    const updateActiveSection = () => {
      setActiveSectionId(resolveActiveSectionId())
    }

    const observer = new IntersectionObserver(updateActiveSection, {
      root,
      threshold: [0, 0.2, 0.45, 0.7],
      rootMargin: '-15% 0px -35% 0px',
    })

    const hero = heroRef.current
    if (hero) observer.observe(hero)

    workSections.forEach(({ id }) => {
      const node = sectionRefs.current[id]
      if (node) observer.observe(node)
    })

    root.addEventListener('scroll', updateActiveSection, { passive: true })
    updateActiveSection()

    return () => {
      observer.disconnect()
      root.removeEventListener('scroll', updateActiveSection)
    }
  }, [])

  useEffect(() => {
    const main = mainScrollRef.current
    const sidebar = sidebarScrollRef.current
    if (!main || !sidebar) return

    const linkedScrollQuery = window.matchMedia('(max-width: 900px)')

    const onWheel = (event: WheelEvent) => {
      if (linkedScrollQuery.matches) return

      const sidebarMax = sidebar.scrollHeight - sidebar.clientHeight
      const scrollingUp = event.deltaY < 0
      const scrollingDown = event.deltaY > 0
      const atTop = sidebar.scrollTop <= 0
      const atBottom = sidebar.scrollTop >= sidebarMax - 1

      if (sidebarMax <= 0 || (scrollingUp && atTop) || (scrollingDown && atBottom)) {
        main.scrollTop += event.deltaY
        event.preventDefault()
      }
    }

    sidebar.addEventListener('wheel', onWheel, { passive: false })

    return () => {
      sidebar.removeEventListener('wheel', onWheel)
    }
  }, [])

  const activeSection = activeSectionId
    ? workSections.find((section) => section.id === activeSectionId)
    : undefined

  useLayoutEffect(() => {
    if (!activeSection || !activeSectionId) {
      displayedSectionIdRef.current = null
      setDisplayedSection(undefined)
      return
    }

    const workActiveBlock = workActiveStaggerRef.current
    const sidebarBlock = sidebarStaggerRef.current
    const previousId = displayedSectionIdRef.current
    const isContentSwitch = previousId !== null && previousId !== activeSectionId
    const previousSection = previousId
      ? workSections.find((section) => section.id === previousId)
      : undefined
    const isProjectSwitch =
      !previousSection ||
      previousSection.projectTitle !== activeSection.projectTitle ||
      previousSection.projectMeta !== activeSection.projectMeta

    const revealBlock = (block: HTMLDivElement) => {
      block.classList.remove('is-hiding', 'is-shown')
      void block.offsetHeight
      block.classList.add('is-shown')
    }

    const hideBlock = (block: HTMLDivElement) => {
      block.classList.add('is-hiding')
      block.classList.remove('is-shown')
    }

    if (!workActiveBlock && !sidebarBlock) {
      setDisplayedSection(activeSection)
      displayedSectionIdRef.current = activeSectionId
      return
    }

    if (!isContentSwitch) {
      setDisplayedSection(activeSection)
      displayedSectionIdRef.current = activeSectionId
      if (workActiveBlock) revealBlock(workActiveBlock)
      if (sidebarBlock) revealBlock(sidebarBlock)
      return
    }

    const blocksToAnimate = [
      ...(sidebarBlock ? [sidebarBlock] : []),
      ...(workActiveBlock && isProjectSwitch ? [workActiveBlock] : []),
    ]

    if (workActiveBlock && !isProjectSwitch) {
      workActiveBlock.classList.remove('is-hiding')
      workActiveBlock.classList.add('is-shown')
    }

    if (!blocksToAnimate.length) {
      setDisplayedSection(activeSection)
      displayedSectionIdRef.current = activeSectionId
      return
    }

    blocksToAnimate.forEach(hideBlock)

    const timeout = window.setTimeout(() => {
      blocksToAnimate.forEach((block) => block.classList.remove('is-hiding'))
      setDisplayedSection(activeSection)
      displayedSectionIdRef.current = activeSectionId
      blocksToAnimate.forEach(revealBlock)
    }, STAGGER_HIDE_MS)

    return () => window.clearTimeout(timeout)
  }, [activeSection, activeSectionId])

  const visibleSidebarSection = displayedSection ?? activeSection

  const linkedInNavContent = (
    <span className="home-nav-blend">
      <span className="home-nav-icon home-nav-icon--arrow" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.5851 4.41394L19.6661 15.6678L17.6661 15.6825L17.6085 7.80457L5.39172 20.0223L3.97766 18.6083L16.1954 6.38953L8.31848 6.33484L8.33215 4.33484L19.5851 4.41394Z" fill="currentColor" />
        </svg>
      </span>
      <span className="home-nav-label">LinkedIn</span>
    </span>
  )

  const interactiveHeader = (
    <header className="home-header home-header--interactive home-grid">
      <button
        type="button"
        className="home-avatar home-grid-avatar t-press"
        data-own-sound
        onClick={scrollToIntro}
        aria-label="Back to intro"
      >
        <img src="/avatar.png" alt="" width={72} height={72} />
      </button>

      <nav className="home-nav home-grid-nav" aria-label="Primary">
        <EmailCopyLink />
        <span className="home-nav-item">
          <a
            href="https://www.linkedin.com/in/igor-berestov/"
            className="home-nav-link home-nav-link--hit"
            target="_blank"
            rel="noreferrer"
          >
            {linkedInNavContent}
          </a>
        </span>
      </nav>
    </header>
  )

  const visualNav = (
    <div className="home-nav-visual-shell home-grid" aria-hidden="true">
      <div className="home-grid-avatar home-grid-avatar--spacer" />
      <nav className="home-nav home-grid-nav">
        <div id="home-nav-visual-mount" className="home-nav-visual-mount" />
        <span className="home-nav-item">
          <span className="home-nav-link home-nav-link--visual">
            {linkedInNavContent}
          </span>
        </span>
      </nav>
    </div>
  )

  return (
    <>
      {createPortal(visualNav, document.body)}
      {createPortal(interactiveHeader, document.body)}
      <main className="home-page">
      <div className="home-scroll" ref={setMainScrollElement}>
        <div className="home-columns home-grid">
        <aside className="home-sidebar home-grid-sidebar" aria-label="Profile">
          <div className="home-sidebar-scroll" ref={sidebarScrollRef}>
            {activeSection ? (
              <>
                <div
                  ref={workActiveStaggerRef}
                  className="home-work-active t-stagger"
                  aria-live="polite"
                >
                  {visibleSidebarSection ? (
                    <>
                      <p className="home-work-active-title t-stagger-line t-stagger-line--1">
                        {visibleSidebarSection.projectTitle}
                      </p>
                      <p className="home-work-active-meta t-stagger-line t-stagger-line--2">
                        {visibleSidebarSection.projectMeta}
                      </p>
                    </>
                  ) : null}
                </div>

                <div className="home-sidebar-center">
                  <div
                    ref={sidebarStaggerRef}
                    className="home-sidebar-content t-stagger"
                    aria-live="polite"
                  >
                    {visibleSidebarSection ? (
                      <p className="home-sidebar-body t-stagger-line t-stagger-line--1">
                        {visibleSidebarSection.sidebarBody}
                      </p>
                    ) : null}
                  </div>
                </div>
              </>
            ) : (
              <div className="home-sidebar-center">
                <div className="home-sidebar-intro" aria-live="polite">
                  <h1>Hey, I&apos;m Igor B.</h1>
                  <p className="home-role">Staff Product Designer</p>
                </div>
              </div>
            )}

            <div className="home-tags" aria-label="Focus areas">
              {tags.map((tag) => (
                <span key={tag} className="home-tag">{tag}</span>
              ))}
            </div>
          </div>
        </aside>

        <div className="home-main home-grid-main">
          <div className="home-main-body">
            <div className="home-hero-copy" id={HERO_ID} ref={heroRef}>
              <div className="home-hero-bio">
                <p className="home-bio">
                  I bridge AI-native product thinking, product strategy, and design execution to turn
                  complex technology into intuitive user experiences.
                </p>
                <p className="home-bio-secondary">
                  Currently shaping AI experiences at{' '}
                  <a href="https://clickup.com" target="_blank" rel="noreferrer">ClickUp</a>.
                </p>
              </div>
            </div>

            <div className="home-work-feed" aria-label="Selected work">
              {workSections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  ref={(node) => {
                    sectionRefs.current[section.id] = node
                  }}
                  className={`home-work-section${section.media ? ' home-work-section--media' : ''}`}
                  style={section.media ? undefined : { minHeight: `${section.height}px` }}
                >
                  {section.media ? (
                    <WorkMedia media={section.media} scrollRoot={mainScrollRoot} />
                  ) : (
                    <div className="home-work-placeholder">
                      <span className="home-work-placeholder-label">Content placeholder</span>
                      <span className="home-work-placeholder-title">{section.title}</span>
                      <span className="home-work-placeholder-meta">{section.meta}</span>
                    </div>
                  )}
                </section>
              ))}
            </div>
          </div>
        </div>
        </div>

        <HomeFooter />
      </div>
      </main>
    </>
  )
}

export default Home
