let timeout = null

window.addEventListener('resize', e => {
  clearTimeout(timeout)
  timeout = setTimeout(t => window.dispatchEvent(new CustomEvent('optimizedResize')), 150)
})
