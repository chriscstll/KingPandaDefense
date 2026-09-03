export function initVehiclesModal() {
  const modal    = document.getElementById('vehicle-modal')
  const backdrop = modal?.querySelector('.vehicle-modal__backdrop')
  const closeBtn = modal?.querySelector('.vehicle-modal__close')
  if (!modal) return

  const fields = ['tag', 'name', 'desc', 'protection', 'glass', 'weight', 'runflat', 'lead']

  function openModal(card) {
    fields.forEach(field => {
      const el = document.getElementById(`modal-${field}`)
      if (el) el.textContent = card.dataset[`modal${field.charAt(0).toUpperCase() + field.slice(1)}`] || ''
    })

    const modalImg = modal.querySelector('.vehicle-modal__img-wrap img')
    if (modalImg) {
      modalImg.src = card.dataset.modalImg || ''
      modalImg.alt = card.dataset.modalImgAlt || ''
    }

    modal.removeAttribute('hidden')
    document.body.style.overflow = 'hidden'
    closeBtn?.focus()
  }

  function closeModal() {
    modal.setAttribute('hidden', '')
    document.body.style.overflow = ''
  }

  // Trigger on image wrap click
  document.querySelectorAll('.vehicle-card__trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      openModal(trigger.closest('.vehicle-card'))
    })

    trigger.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        openModal(trigger.closest('.vehicle-card'))
      }
    })
  })

  backdrop?.addEventListener('click', closeModal)
  closeBtn?.addEventListener('click', closeModal)

  modal.querySelector('.vehicle-modal__cta')?.addEventListener('click', closeModal)

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.hasAttribute('hidden')) closeModal()
  })
}