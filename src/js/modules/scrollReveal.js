export function initScrollReveal(){

const baseConfig = {
  duration: 1000,
  distance: '60px',
  easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
  reset: false 
};

ScrollReveal().reveal('.reveal-top', { ...baseConfig, origin: 'top', delay: 200 });
ScrollReveal().reveal('.reveal-left', { ...baseConfig, origin: 'left', delay: 300 });
ScrollReveal().reveal('.reveal-right', { ...baseConfig, origin: 'right', delay: 300 });
ScrollReveal().reveal('.reveal-scale', { ...baseConfig, distance: '0px', scale: 0.85 });
ScrollReveal().reveal('.reveal-card', { ...baseConfig, origin: 'bottom', interval: 150 });
;
}