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

  // Emit answer to server
  socket.on('hello', time => {
    console.log(time)
  })
})
