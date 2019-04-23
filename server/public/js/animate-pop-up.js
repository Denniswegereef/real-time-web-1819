let animatePopUp = socket => {
  //const animatePopUp = document.getElementById('guess-form')

  let tl = anime.timeline({
    easing: 'easeInOutQuad'
  })

  tl.add({
    duration: 700,
    easing: 'cubicBezier(.5, .05, .1, .3)',
    targets: '#pop-up-content',
    translateY: ['100%', '0%'] // from 100 to 250,
  })
    .add(
      {
        duration: 900,
        targets: '#pop-up h3',
        opacity: 1,
        translateY: ['60%', '0%']
      },
      '-=100'
    )
    .add(
      {
        duration: 900,
        targets: '#set-user-name',
        opacity: 1,
        translateY: ['-60%', '0%']
      },
      '-=800'
    )
}

export { animatePopUp }
