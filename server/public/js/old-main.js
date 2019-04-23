window.addEventListener('load', event => {
  const content = document.getElementById('content')
  const timerInner = document.getElementById('timer-inner')
  const message = document.getElementById('message')
  const historyBox = document.getElementById('history-songs')

  const guessForm = document.getElementById('guess-form')
  const guessInput = document.getElementById('guess-input')

  const socket = io()

  // Render new track
  socket.on('newTrack', data => {
    message.innerHTML = ''
    content.innerHTML = data.html
    console.log('New song')
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

  socket.on('score', data => {
    message.innerHTML = `You scored ${data.message} points`
  })

  socket.on('historySong', data => {
    let possibleItems = 4

    if (historyBox.children.length > possibleItems - 1) {
      historyBox.children[possibleItems - 1].remove()
    }

    historyBox.insertAdjacentHTML('afterbegin', data.html)
  })

  const sendMessage = event => {
    event.preventDefault()
    socket.emit('input-guess', guessInput.value)
    guessInput.value = ''
  }

  guessForm.addEventListener('submit', sendMessage)
})
