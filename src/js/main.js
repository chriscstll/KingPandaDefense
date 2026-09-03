import '../scss/main.scss';

import { initHeader }       from './modules/header.js'
import { initMobileNav }    from './modules/mobileNav.js'
import { initScrollReveal } from './modules/scrollReveal.js'
import { initContactForm }  from './modules/contactForm.js'
import { initFooterYear }   from './modules/footer.js'

document.addEventListener('DOMContentLoaded', () => {
  initHeader()
  initMobileNav()
  initScrollReveal()
  initContactForm()
  initFooterYear()
})
