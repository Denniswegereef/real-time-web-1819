import { animateIn } from './start-guess-animation.js'
import { animateRepeat } from './repeat-guess-animation.js'

window.addEventListener('load', event => {
  const socket = io()
  const waitForTrack = document.getElementById('wait-for-track')

  let startAnimation = false
  // Render new track
  socket.on('newTrack', data => {
    const popUp = document.getElementById('pop-up')

    if (popUp) {
      console.log('Popup is still here')
      return
    }

    // Force 1 time start animation
    if (!startAnimation) {
      waitForTrack.remove()
      animateIn(data.html)
      startAnimation = true
      return
    }

    // Repeatble animation with tracks
    animateRepeat(data.html)
  })
})
