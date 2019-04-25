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

  let answer = matchAnswer(data, await spotifyApi)

  // Send points back to players
  if (answer.points === 0) {
    io.to(socket.id).emit(
      'individual-message',
      '<p><span class="error">You scored no points</span></p>'
    )
  } else {
    console.log(answer)
    app.render(
      'partials/message-user',
      { data: answer, layout: false },
      (err, html) => {
        io.to(socket.id).emit('individual-message', html)
      }
    )
  }

  // Add points to database
  db.updatePoints(data.username, answer.points)

  // Send points back to individual socket
  io.emit('global-message', `<p>${data.username} said: ${data.value}</p>`)
}
