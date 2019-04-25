const animateRepeat = data => {
  const trackPlayer = document.getElementById('track-player')
  trackPlayer.innerHTML = data.html.trackPlayer

  const guessContent = document.getElementById('guess-content')

  anime({
    duration: 450,
    targets: '.bars span',
    easing: 'linear',
    translateY: () => anime.random(12, 45),
    direction: 'alternate',
    loop: true
  })

  let timer = document.getElementById('timer-inner')

  if (timer) {
    timer.removeAttribute('style')

    anime({
      targets: timer,
      translateX: '-100%',
      duration: data.config.duration,
      easing: 'linear',
      complete: anim => {
        console.log('Done')
      }
    })
  }

  const guessInput = document.getElementById('guess-input')

  guessInput.disabled = false
  guessInput.placeholder = 'Answer here'

  return
}

export { animateRepeat }
