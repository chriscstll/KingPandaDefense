export function initMobileNav() {
  const toggle  = document.querySelector('.site-header__toggle')
  const nav     = document.querySelector('.site-nav')
  const overlay = document.getElementById('nav-overlay')
  if (!toggle || !nav) return

  const mobileNav = document.createElement('nav')
  mobileNav.className = 'site-nav site-nav--mobile'
  mobileNav.id = 'mobile-nav'
  mobileNav.setAttribute('aria-label', 'Mobile navigation')
  mobileNav.innerHTML = nav.innerHTML
  document.querySelector('.site-header').insertAdjacentElement('afterend', mobileNav)

  let isOpen = false

  function openNav() {
    isOpen = true
    mobileNav.classList.add('is-open')
    overlay?.classList.add('is-open')
    toggle.setAttribute('aria-expanded', 'true')
    document.body.style.overflow = 'hidden'
  }

  function closeNav() {
    isOpen = false
    mobileNav.classList.remove('is-open')
    overlay?.classList.remove('is-open')
    toggle.setAttribute('aria-expanded', 'false')
    document.body.style.overflow = ''
  }

  toggle.addEventListener('click', () => {
    isOpen ? closeNav() : openNav()
  })
  overlay?.addEventListener('click', closeNav)
  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeNav)
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) closeNav()
  })

  const mq = window.matchMedia('(min-width: 1024px)')
  mq.addEventListener('change', (e) => { if (e.matches) closeNav() })
}