export function initContactForm() {
    const form = document.getElementById('contact-form')
    if (!form) return


    const validators = {
        name:         (v) => v.trim().length >= 2       || 'Full name is required.',
        organization: (v) => v.trim().length >= 2       || 'Organization is required.',
        email:        (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || 'A valid work email is required.',
    }

    function getErrorEl(field) {
        let err = field.parentElement.querySelector('.form-error')
        if (!err) {
            err = document.createElement('span')
            err.className = 'form-error'
            err.setAttribute('aria-live', 'polite')
            err.style.cssText = 'display:block;margin-top:4px;font-size:0.75rem;color:#C0392B;'
            field.parentElement.appendChild(err)
        }
        return err
    }

    function showError(field, message) {
        field.classList.add('has-error')
        getErrorEl(field).textContent = message
    }

    function clearError(field) {
        field.classList.remove('has-error')
        const err = field.parentElement.querySelector('.form-error')
        if (err) err.textContent = ''
    }

    function validateField(field) {
        const rule = validators[field.name]
        if (!rule) return rule

        const result = rule(field.value)
        if (result !== true) {
            showError(field, result)
            return false
        }
        clearError(field)
        return true
    }

    Object.keys(validators).forEach((name) => {
    const field = form.querySelector(`[name="${name}"]`)
    if (field) {
      field.addEventListener('blur', () => validateField(field))
      field.addEventListener('input', () => {
        if (field.classList.contains('has-error')) validateField(field)
      })
    }
  })

  // ── Submit ────────────────────────────────────
  form.addEventListener('submit', (e) => {
    e.preventDefault()

    let isValid = true
    Object.keys(validators).forEach((name) => {
      const field = form.querySelector(`[name="${name}"]`)
      if (field && !validateField(field)) isValid = false
    })

    if (!isValid) return

    // TODO: replace with real API call
    const submitBtn = form.querySelector('[type="submit"]')
    submitBtn.textContent = 'Sending…'
    submitBtn.disabled = true

    // Simulate async submission
    setTimeout(() => {
      submitBtn.textContent = 'Request Submitted'
      submitBtn.classList.remove('btn--primary')
      submitBtn.classList.add('btn--ghost')
      form.reset()

      // Re-enable after delay
      setTimeout(() => {
        submitBtn.textContent = 'Submit Request'
        submitBtn.disabled = false
        submitBtn.classList.add('btn--primary')
        submitBtn.classList.remove('btn--ghost')
      }, 4000)
    }, 1200)
  })

}