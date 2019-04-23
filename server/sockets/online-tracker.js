const db = require('../controllers/database')

module.exports = track = async (socket, io, username, app) => {
  console.log(socket.id + ' just came online with a name ' + username)
  let data = await db.getUser(username)

  app.render(
    'partials/online-player',
    {
      user: { id: socket.id, username, points: data.points },
      layout: false
    },
    (err, html) => {
      console.log(html)
      io.emit('online-user', {
        html
      })
    }
  )
  return
}
