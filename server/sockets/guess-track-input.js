const matchAnswer = require('../controllers/match_answer')
const db = require('../controllers/database')

module.exports = guessTrackInput = async (
  data,
  io,
  spotifyApi,
  app,
  socket
) => {
  let scope = await spotifyApi
  let currentTrack = scope.currentTrack.track.name

  // Here comes the guess
  let points = matchAnswer(data)

  // Add points to database
  db.updatePoints(data.username, 1)

  // Send points back to players
  io.to(socket.id).emit('individual-message', 'You did good!')

  // Send points back to individual socket
  io.emit('global-message', `<p>${data.username} said: ${data.value}</p>`)
}
