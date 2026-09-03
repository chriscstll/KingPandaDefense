export function initVehiclesModal() {
    const modal = document.getElementById('vehicle-modal')
    const backdrop = modal?.querySelector('.vehicle-modal__backdrop')
    const closeBtn = modal?.querySelector('.vehicle-modal__close')
    const mainImg = document.getElementById('modal-main-img')
    const thumbsEl = document.getElementById('modal-thumbs')
    if (!modal) return

    const fields = ['tag', 'name', 'desc', 'protection', 'glass', 'weight', 'runflat', 'lead']

    function setActiveThumb(index) {
        const thumbs = thumbsEl.querySelectorAll('.vehicle-modal__thumb')
        thumbs.forEach((t, i) => t.classList.toggle('is-active', i === index))
    }

    function buildGallery(images) {
        if (!mainImg || !thumbsEl) return
        mainImg.src = images[0] || ''
        mainImg.alt = ''
        thumbsEl.innerHTML = ''
        images.forEach((src, i) => {
            const thumb = document.createElement('div')
            thumb.className = 'vehicle-modal__thumb' + (i === 0 ? 'is-active' : '')
            
            const img = document.createElement('img')
            img.src = src
            img.alt = `View ${i + 1}`
            img.loading = 'lazy'
            thumb.appendChild(img)
            thumb.addEventListener('click', () => {
                mainImg.src = src
                setActiveThumb(i)
            })
            thumbsEl.appendChild(thumb)
        })
    }

    function openModal(card) {
        fields.forEach(field => {
            const el = document.getElementById(`modal-${field}`)
            if (el) el.textContent = card.dataset[`modal${field.charAt(0).toUpperCase() + field.slice(1)}`] || ''
        })
        let images = []
        try {
            images = JSON.parse(card.dataset.modalImages || '[]')
        } catch {
            images = []
        }
        if (!images.length && card.dataset.modalImg) {
            images = [card.dataset.modalImg]
        }

        buildGallery(images)
        modal.removeAttribute('hidden')
        document.body.style.overflow = 'hidden'
        closeBtn?.focus()
    }

    function closeModal() {
        modal.setAttribute('hidden', '')
        document.body.style.overflow = ''
    }

    
    
}