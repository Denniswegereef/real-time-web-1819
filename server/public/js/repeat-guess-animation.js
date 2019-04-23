const animateRepeat = data => {
  let trackPlayer = document.getElementById('track-player')
  trackPlayer.innerHTML = data.html.trackPlayer

  // anime({
  //   duration: data.config.duration,
  //   targets: '.bars span',
  //   translateY: [10, 30],
  //   delay: anime.stagger(100),
  //   direction: 'alternate',
  //   loop: data.config.duration
  // })
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

  return
}

export { animateRepeat }
