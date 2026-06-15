import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import workSections, { type WorkSection } from '../data/workSections'
import { smoothScrollElementsToTop } from '../lib/gsapScroll'
import EmailCopyLink from '../components/EmailCopyLink'
import WorkMedia from '../components/WorkMedia'

const HERO_ID = 'hero-intro'
const STAGGER_HIDE_MS = 200

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
  const sidebarScrollRef = useRef<HTMLElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})
  const sidebarStaggerRef = useRef<HTMLDivElement>(null)
  const workActiveStaggerRef = useRef<HTMLDivElement>(null)
  const displayedSectionIdRef = useRef<string | null>(null)
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null)
  const [displayedSection, setDisplayedSection] = useState<WorkSection | undefined>(undefined)
  const [mainScrollRoot, setMainScrollRoot] = useState<HTMLDivElement | null>(null)

  const setMainScrollElement = (node: HTMLDivElement | null) => {
    mainScrollRef.current = node
    setMainScrollRoot(node)
  }

  const scrollToIntro = () => {
    setActiveSectionId(null)
    smoothScrollElementsToTop([mainScrollRef.current, sidebarScrollRef.current])
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

  return (
    <main className="home-page">
      <header className="home-header home-grid">
        <button
          type="button"
          className="home-avatar home-grid-avatar"
          onClick={scrollToIntro}
          aria-label="Back to intro"
        >
          <img src="/avatar.png" alt="" width={72} height={72} />
        </button>

        <nav className="home-nav home-grid-nav" aria-label="Primary">
          <EmailCopyLink />
          <a
            href="https://www.linkedin.com/in/igor-berestov/"
            className="home-nav-link"
            target="_blank"
            rel="noreferrer"
          >
            <span className="home-nav-icon home-nav-icon--arrow" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.5916 5.40845L5.3916 18.6084" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9.32471 5.3418L18.5914 5.40713L18.658 14.6751" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            linked in
          </a>
          <Link to="/about" className="home-nav-link">
            <span className="home-nav-icon home-nav-icon--about" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 15.1169C14 15.1169 13 15.5001 12 15.5001C11 15.5001 10 15.1169 10 15.1169" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8.53634 9.22998V11.3078" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15.4631 9.22998V11.3078" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="11.9998" cy="12.0001" r="9.00375" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            about me
          </Link>
        </nav>
      </header>

      <div className="home-columns home-grid">
        <aside className="home-sidebar home-grid-sidebar" aria-label="Profile" ref={sidebarScrollRef}>
          <div className="home-sidebar-scroll">
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
                    {visibleSidebarSection?.sidebarHeading ? (
                      <p className="home-sidebar-heading t-stagger-line t-stagger-line--1">
                        {visibleSidebarSection.sidebarHeading}
                      </p>
                    ) : null}
                    {visibleSidebarSection ? (
                      <p
                        className={`home-sidebar-body t-stagger-line ${
                          visibleSidebarSection.sidebarHeading
                            ? 't-stagger-line--2'
                            : 't-stagger-line--1'
                        }`}
                      >
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

        <div className="home-main home-grid-main" ref={setMainScrollElement}>
          <div className="home-main-body">
            <div className="home-hero-copy" id={HERO_ID} ref={heroRef}>
              <p className="home-bio">
                I bridge AI-native product thinking, product strategy, and design execution to turn
                complex technology into intuitive user experiences.
              </p>
              <p className="home-bio-secondary">
                Currently shaping AI experiences at{' '}
                <a href="https://clickup.com" target="_blank" rel="noreferrer">ClickUp</a>. Also worked with{' '}
                <a href="https://www.wrike.com" target="_blank" rel="noreferrer">Wrike</a> and{' '}
                <a href="https://www.sberbank.com" target="_blank" rel="noreferrer">Sberbank</a>.
              </p>
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
    </main>
  )
}

export default Home
