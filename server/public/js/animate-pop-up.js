let animatePopUp = socket => {
  //const animatePopUp = document.getElementById('guess-form')

  let tl = anime.timeline({
    easing: 'easeInOutQuad'
  })

  tl.add(
    {
      duration: 900,
      targets: '#pop-up h3',
      opacity: 1,
      translateY: ['60%', '0%']
    },
    '-=100'
  ).add(
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
