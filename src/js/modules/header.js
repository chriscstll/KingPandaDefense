export function initHeader() {
  const header = document.getElementById('site-header')
  if (!header) return

  const SCROLL_THRESHOLD = 60

  function onScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > SCROLL_THRESHOLD)
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()

  const sections = document.querySelectorAll('main section[id]')
  const navLinks = document.querySelectorAll('.site-nav__link')
  if (!sections.length || !navLinks.length) return

  function clearActive() {
    navLinks.forEach(link => link.classList.remove('is-active'))
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.id
        const link = document.querySelector(`.site-nav__link[href="#${id}"]`)

        if (entry.isIntersecting) {
          clearActive()
          link?.classList.add('is-active')
        }
      })
    },
    { rootMargin: '-40% 0px -55% 0px' }
  )
  
  sections.forEach((section) => observer.observe(section))

  const heroObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) clearActive()
      })
    },
    { threshold: 0.3 }
  )

  const hero = document.querySelector('.hero')
  if (hero) heroObserver.observe(hero)
}