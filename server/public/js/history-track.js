const animateHistory = html => {
  let holder = document.getElementById('track-history-holder')
  if (holder) {
    holder.insertAdjacentHTML('afterbegin', html)

    let possibleItems = 6

    if (holder.children.length > possibleItems - 1) {
      holder.children[possibleItems - 1].remove()
    }
    return
  }
}

export { animateHistory }
