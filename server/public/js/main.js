window.addEventListener('load', event => {
  const content = document.getElementById('content')
  const timerInner = document.getElementById('timer-inner')

  const socket = io()

  const timer = () => {}

  // Render new track
  socket.on('newTrack', data => {
    content.innerHTML = data.html
    console.log(data)
    // Reset styling
    timerInner.removeAttribute('style')

    anime({
      targets: timerInner,
      translateX: '-100%',
      duration: data.config.duration,
      easing: 'linear',
      complete: function(anim) {
        console.log('Done')
      }
    })
  })

  const guessForm = document.getElementById('guess-form')
  const guessInput = document.getElementById('guess-input')

  const sendMessage = event => {
    event.preventDefault()
    console.log(guessInput.value)
    socket.emit('input-guess', guessInput.value)
    guessInput.value = ''
  }

  guessForm.addEventListener('submit', sendMessage)

  console.dir(form)
})
