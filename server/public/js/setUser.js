window.addEventListener('load', event => {
  const userNameForm = document.getElementById('set-user-name')
  const userNameInput = document.getElementById('set-user-input')

  userNameForm.addEventListener('submit', e => {
    e.preventDefault()

    fetch('set-user', {
      method: 'POST',
      body: JSON.stringify({ userName: userNameInput.value }), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
  })
})
