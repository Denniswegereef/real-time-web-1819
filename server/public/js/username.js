window.addEventListener('load', event => {
  const userNameForm = document.getElementById('set-user-name')
  const userNameInput = document.getElementById('set-user-input')
  const logo = document.getElementById('logo')
  const popUp = document.getElementById('pop-up')

  userNameForm.addEventListener('submit', e => {
    e.preventDefault()

    fetch('set-user', {
      method: 'POST',
      body: JSON.stringify({ username: userNameInput.value }), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => {
        logo.insertAdjacentHTML('afterend', res.html)
        popUp.remove()
      })
      .catch(error => console.error('Error:', error))
  })
})
