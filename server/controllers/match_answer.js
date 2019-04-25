const chalk = require('chalk')
const stringSimilarity = require('string-similarity')

module.exports = handle = (data, spotifyObj) => {
  let inputValue = data.value.toLowerCase()
  let points = 0
  let correctAnswers = []

  let currenTitle = spotifyObj.currentTrack.track.name
    .replace(/ *\([^)]*\) */g, '')
    .split(' -')[0]
    // .replace(' - Radio Edit', '')
    // .replace(' (Remix)', '')
    // .replace('- Acoustic', '')
    // .substring(0, spotifyObj.currentTrack.track.name.lastIndexOf(' -'))
    .toLowerCase()

  let currentArtists = spotifyObj.currentTrack.track.artists.map(artist =>
    artist.name.toLowerCase()
  )

  let artistPoints = 10 / currentArtists.length

  // Check title

  if (inputValue.includes(currenTitle)) {
    points += 10
    correctAnswers.push(currenTitle)
    inputValue = inputValue.replace(currenTitle, '')
  }

  currentArtists.forEach(artist => {
    if (inputValue.includes(artist)) {
      points += artistPoints
      inputValue = inputValue.replace(artist, '')
      correctAnswers.push(artist)
    }
  })

  console.log(correctAnswers)

  return {
    username: data.username,
    points,
    correctAnswers
  }
}
