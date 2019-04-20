const animateIn = html => {
  console.log(html)
  const content = document.getElementById('content')
  content.innerHTML = html.layout
  return
}

export { animateIn }
