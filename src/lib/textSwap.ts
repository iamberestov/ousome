export function getTextSwapDurationMs() {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue('--text-swap-dur')
    .trim()

  if (raw.endsWith('ms')) return parseFloat(raw)
  if (raw.endsWith('s')) return parseFloat(raw) * 1000
  return parseFloat(raw) || 150
}

export function swapTextContent(element: HTMLElement, next: string) {
  const duration = getTextSwapDurationMs()

  element.classList.add('is-exit')
  window.setTimeout(() => {
    element.textContent = next
    element.classList.remove('is-exit')
    element.classList.add('is-enter-start')
    void element.offsetHeight
    element.classList.remove('is-enter-start')
  }, duration)
}
