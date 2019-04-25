let guessTrack = socket => {
  const guessForm = document.getElementById('guess-form')
  const guessInput = document.getElementById('guess-input')
  const usernameEl = document.getElementById('username')

  const messageUser = document.getElementById('message-user')
  const messagePlayers = document.getElementById('message-players')

  const username = usernameEl.innerText

  console.log(username)

  socket.on('individual-message', data => {
    messageUser.innerHTML = ''
    guessInput.disabled = true
    guessInput.placeholder = 'Already answered'
    messageUser.insertAdjacentHTML('beforeend', data)
  })

  // socket.on('global-message', data => {
  //   messagePlayers.insertAdjacentHTML('afterbegin', data)
  // })

  const inputGuess = event => {
    event.preventDefault()

    console.log(guessInput.value)

    socket.emit('input-guess', {
      username,
      value: guessInput.value
    })
    guessInput.value = ''
  }

  guessForm.addEventListener('submit', inputGuess)
}

export { guessTrack }
