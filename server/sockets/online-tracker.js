const db = require('../controllers/database')

let onlineusers = {}

exports.addUser = async (socket, io, username, app) => {
  console.log(socket.id + ' just came online with a name ' + username)
  let data = await db.getUser(username)

  app.render(
    'partials/online-player',
    {
      user: { id: socket.id, username, points: data.points },
      layout: false
    },
    (err, html) => {
      // Set html to user
      onlineusers[socket.id] = html

      console.log(html)
      io.emit('online-user', {
        html
      })
    }
  )
  return
}

exports.removeUser = socket => {
  delete onlineusers[socket.id]
  console.log(onlineusers)
  return
}

exports.getAll = (io, app) => {
  io.emit('all-online', Object.values(onlineusers).join(''))
}
