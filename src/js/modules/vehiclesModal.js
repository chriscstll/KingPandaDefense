export function initVehiclesModal() {
    const modal = document.getElementById('vehicle-modal')
    const backdrop = modal?.querySelector('.vehicle-modal__backdrop')
    const closeBtn = modal?.querySelector('.vehicle-modal__close')
    const mainImg = document.getElementById('modal-main-img')
    const thumbsEl = document.getElementById('modal-thumbs')
    if (!modal) return

    const fields = ['tag', 'name', 'desc', 'protection', 'glass', 'weight', 'runflat']

    function setActiveThumb(index) {
        const thumbs = thumbsEl.querySelectorAll('.vehicle-modal__thumb')
        thumbs.forEach((t, i) => t.classList.toggle('is-active', i === index))
    }

    function buildUpgrades(upgrades) {
        const el = document.getElementById('modal-upgrades')
        if (!el) return
        el.innerHTML = ''
        upgrades.forEach(item => {
            const li = document.createElement('li')
            li.textContent = item
            el.appendChild(li)
        })
    }

    function buildGallery(images) {
        if (!mainImg || !thumbsEl) return
        const base = import.meta.env.BASE_URL
        mainImg.src = images[0] || ''
        mainImg.alt = ''
        thumbsEl.innerHTML = ''

        const thumbEls = []
        images.forEach((src, i) => {
            const thumb = document.createElement('div')
            thumb.className = 'vehicle-modal__thumb'
            
            const img = document.createElement('img')
            img.src = base + src 
            img.alt = `View ${i + 1}`
            img.loading = 0 ? 'eager' : 'lazy'
            thumb.appendChild(img)
            thumbsEl.appendChild(thumb) 
            thumbEls.push(thumb)
            thumb.addEventListener('click', () => {
                mainImg.src = src
                thumbEls.forEach(t => t.classList.remove('is-active')) 
                thumb.classList.add('is-active')
            })
        })
        if (thumbEls.length > 0) {
            thumbEls[0].classList.add('is-active')
        }
    }

    function openModal(card) {
        fields.forEach(field => {
            const el = document.getElementById(`modal-${field}`)
            if (el) el.textContent = card.dataset[`modal${field.charAt(0).toUpperCase() + field.slice(1)}`] || ''
        })

        let upgrades = []
        try {
            upgrades = JSON.parse(card.dataset.modalUpgrades || '[]')
        } catch {
            upgrades = []
        }
        buildUpgrades(upgrades)

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
        if (e.key === 'Escape' && !modal.hasAttribute('hidden')) 
            closeModal()
    })
}