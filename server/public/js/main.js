import { animateIn } from './start-guess-animation.js'
import { animateRepeat } from './repeat-guess-animation.js'
import { guessTrack } from './guess-track.js'
import { animatePopUp } from './animate-pop-up.js'
import { animateHistory } from './history-track.js'

window.addEventListener('load', event => {
  const socket = io()
  const waitForTrack = document.getElementById('wait-for-track')

  let startAnimation = false
  let popUp = document.getElementById('pop-up')

  // Check if there is a popup
  if (popUp) {
    animatePopUp()
  }
  // Render new track
  socket.on('newTrack', data => {
    popUp = document.getElementById('pop-up')

    if (popUp) {
      return
    }

    // Force 1 time start animation
    if (!startAnimation) {
      waitForTrack.remove()
      animateIn(data)

      startAnimation = true

      // Enable the input
      guessTrack(socket)

      // online from here
      socket.emit('im-online', document.getElementById('username').innerText)
      return
    }

    // Repeatble animation with tracks
    animateRepeat(data)
  })

  socket.on('history-track', data => {
    popUp = document.getElementById('pop-up')

    if (popUp) {
      return
    }

    animateHistory(data.html)
  })

  socket.on('online-user', data => {
    console.log(data.html)
    document
      .getElementById('current-users')
      .insertAdjacentHTML('beforeend', data.html)
  })
})
