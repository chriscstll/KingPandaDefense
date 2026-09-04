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

  mobileNav.insertAdjacentHTML('beforeend', `
    <div class="site-nav__bottom">
      <ul class="site-nav__social" aria-label="Social media links">
        <li>
          <a href="https://www.facebook.com/kingpandadefense" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z"/></svg>
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/armoredpandaindustries/" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2c2.7 0 3.1 0 4.1.06 1.1.05 1.8.2 2.4.44a4.9 4.9 0 0 1 1.8 1.16 4.9 4.9 0 0 1 1.16 1.8c.24.6.4 1.3.44 2.4.05 1 .06 1.4.06 4.1s0 3.1-.06 4.1c-.05 1.1-.2 1.8-.44 2.4a4.9 4.9 0 0 1-1.16 1.8 4.9 4.9 0 0 1-1.8 1.16c-.6.24-1.3.4-2.4.44-1 .05-1.4.06-4.1.06s-3.1 0-4.1-.06c-1.1-.05-1.8-.2-2.4-.44a4.9 4.9 0 0 1-1.8-1.16 4.9 4.9 0 0 1-1.16-1.8c-.24-.6-.4-1.3-.44-2.4C2 15.1 2 14.7 2 12s0-3.1.06-4.1c.05-1.1.2-1.8.44-2.4a4.9 4.9 0 0 1 1.16-1.8A4.9 4.9 0 0 1 5.46.54c.6-.24 1.3-.4 2.4-.44C8.9 2 9.3 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zm5.2-8.4a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z"/></svg>
          </a>
        </li>
        <li>
          <a href="https://maps.app.goo.gl/MqtxAXpdQhbMv7Rq9" aria-label="Our location" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>
          </a>
        </li>
      </ul>

      <ul class="site-nav__contact">
        <li>
          <a href="tel:+639174630077">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.5 21 3 13.5 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z"/></svg>
            0917 463 0077
          </a>
        </li>
        <li>
          <a href="mailto:hans@luxurycarsmanila.com.ph">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 5h20v14H2zm2 2v.4l8 5.6 8-5.6V7l-8 5.6z"/></svg>
            contact@armoredpanda.com
          </a>
        </li>
      </ul>
    </div>
  `)
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