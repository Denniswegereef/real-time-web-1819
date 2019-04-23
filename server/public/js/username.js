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
        if (res.status === 409) {
          console.log('username already exists')
          userNameForm.insertAdjacentHTML(
            'beforebegin',
            '<p id="error-username">Username already exists</p>'
          )

          setTimeout(() => {
            document.getElementById('error-username').remove()
          }, 3000)

          return
        }

        if (res.status === 201) {
          logo.insertAdjacentHTML('afterend', res.html)

          anime({
            duration: 500,
            targets: '#pop-up-outer',
            translateY: '10%',
            opacity: 0,
            easing: 'linear',
            complete: anim => {
              popUp.remove()
            }
          })
        }
      })
      .catch(error => console.error('Error:', error))
  })
})
