window.addEventListener('load', event => {
  const content = document.getElementById('content')
  const timerInner = document.getElementById('timer-inner')

  const socket = io()

  const timer = () => {}

  // Render new track
  socket.on('newTrack', data => {
    content.innerHTML = data.html
  })

  // Emit answer to server
  socket.on('hello', time => {
    console.log(time)
  })
})
