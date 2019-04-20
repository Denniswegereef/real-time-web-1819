const animateRepeat = html => {
  console.log('START REPEATING ANIMATE')
  let trackPlayer = document.getElementById('track-player')
  trackPlayer.innerHTML = html.trackPlayer
  return
}

export { animateRepeat }
