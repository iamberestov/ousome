import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

type ScrollTarget = HTMLElement | null | undefined

export function smoothScrollTo(
  element: ScrollTarget,
  y = 0,
  duration = 0.9,
) {
  if (!element) return

  gsap.to(element, {
    duration,
    scrollTo: { y },
    ease: 'power2.inOut',
  })
}

export function smoothScrollElementsToTop(
  elements: ScrollTarget[],
  duration = 0.9,
) {
  const targets = elements.filter((element): element is HTMLElement => Boolean(element))
  if (targets.length === 0) return

  const timeline = gsap.timeline()
  targets.forEach((element) => {
    timeline.to(
      element,
      {
        duration,
        scrollTo: { y: 0 },
        ease: 'power2.inOut',
      },
      0,
    )
  })
}
