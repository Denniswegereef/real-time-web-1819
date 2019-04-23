const animateIn = data => {
  console.log(data)
  const content = document.getElementById('content')
  content.innerHTML = data.html.layout

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

export { animateIn }
