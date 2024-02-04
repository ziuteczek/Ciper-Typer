'use strict'
if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  document.body.insertAdjacentHTML(
    'afterbegin',
    `<div class="mobile-alert"><p>Please use pc ❤️</p></div>`
  )
  document.body.style.width = `${screen.width}px`
}
