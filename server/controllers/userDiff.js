const chalk = require('chalk')
const stringSimilarity = require('string-similarity')

let treshhold = 0.6

const mergePoints = (newScore, oldScore) => {
  // Check if new Object
  if (!oldScore) {
    return Object.assign(newScore, {})
  }

  return Object.assign(newScore, oldScore)
}

module.exports = diffAnswers = (userInput, current, oldScore) => {
  let currenTitle = current.track.name.replace(/ *\([^)]*\) */g, '')
  let currentArtists = current.track.artists.map(artist => artist.name)

  let newScore = {
    totalItems: currentArtists.length + 1
  }

  let simTitle = stringSimilarity.compareTwoStrings(
    userInput.toLowerCase(),
    currenTitle.toLowerCase()
  )

  if (simTitle > treshhold) {
    newScore.title = Math.floor(simTitle * 10)
  }

  // Track artists
  currentArtists.forEach((artist, index) => {
    let simArtist = stringSimilarity.compareTwoStrings(
      artist.toLowerCase(),
      userInput.toLowerCase()
    )
    if (simArtist > treshhold) {
      newScore[`artist_${index}`] = Math.floor(simArtist * 10)
    }
  })

  return mergePoints(newScore, oldScore)
}
