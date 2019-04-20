let guessTrack = socket => {
  const guessForm = document.getElementById('guess-form')
  const guessInput = document.getElementById('guess-input')
  const usernameEl = document.getElementById('username')

  const username = usernameEl.innerText

  console.log(username)

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
