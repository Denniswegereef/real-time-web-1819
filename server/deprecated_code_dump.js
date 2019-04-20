app.post('/set-userrrrr', async (req, res) => {
  let add = await db.add(req.body.username)

  if (!add) {
    res.send({
      message: 'Username already exists',
      status: 409
    })
    return
  }

  app.render(
    'partials/userInfo',
    { username: req.body.username, layout: false },
    (err, html) => {
      //res.cookie('username', req.body.username)

      res.send({
        message: 'User created',
        status: 201,
        html
      })
    }
  )
})

app.get('/data', async (req, res) => {
  scope = await spotifyApi
  res.send(scope.currentTrack)
})

io.on('conneasdfction', socket => {
  console.log(chalk.blue('A user connected'))
  let currentScore
  let currentId

  socket.on('input-guess', async guessMessage => {
    scope = await spotifyApi

    // Check if new track, reset score
    if (currentId !== scope.currentTrack.track.uri) {
      currentScore = ''
    }
    currentId = scope.currentTrack.track.uri

    currentScore = userDiff(guessMessage, scope.currentTrack, currentScore)

    io.emit('score', {
      message: calculatePoints(currentScore)
    })
  })

  socket.on('disconnect', () => {
    io.emit(chalk.red('A user disconnected'))
  })
})
