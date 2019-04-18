require('dotenv').config()

// Packages
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const chalk = require('chalk')
const cookieParser = require('cookie-parser')
const path = require('path')

// Modules
const spotifyApiClass = require('./controllers/spotify_api')
const userDiff = require('./controllers/userDiff')
const calculatePoints = require('./controllers/calculate_points')
const db = require('./controllers/database')

// Express
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

const config = {
  port: 5555,
  duration: 15000 // In seconds
}
db()

app.engine(
  '.hbs',
  exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    partialsDir: __dirname + '/views/partials/'
  })
)
app.use(express.static(__dirname + '/public'))
app.use(
  '/scripts',
  express.static(path.resolve() + '/node_modules/animejs/lib/')
)

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.set('view engine', 'hbs')
app.set('views', __dirname + '/views')

// Start the spotify API
let spotifyApi = new spotifyApiClass({
  clientId: process.env.SPOTIFY_clientId,
  clientSecret: process.env.SPOTIFY_clientSecret,
  playlistId: '1DTzz7Nh2rJBnyFbjsH1Mh'
}).then(res => {
  console.log(chalk.yellow('Finished getting playlist'))
  // Start loop
  getLoopTracks(res)
  return res
})

// Repeatable function for getting new tracks
const getLoopTracks = scope => {
  // Emit old gtrack
  app.render(
    'partials/historySong',
    { single: scope.currentTrack, layout: false },
    (err, html) => {
      console.log(html)
      io.emit('historySong', {
        html
      })
    }
  )

  let newTrack = scope.getRandomTrack()

  console.log('--')
  console.log(chalk.cyan('Currently in scope:'))
  console.log(chalk.yellow(`New track: ${newTrack.track.name}`))
  console.log(
    chalk.yellow(
      `Artists: ${newTrack.track.artists.map(artist => artist.name)}`
    )
  )

  // Emit new Track
  app.render(
    'partials/currentSong',
    { single: newTrack, layout: false },
    (err, html) => {
      io.emit('newTrack', {
        track: newTrack,
        config,
        html
      })
    }
  )

  // Restart loop
  setTimeout(() => getLoopTracks(scope), config.duration)
}

io.on('connection', socket => {
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

app.get('/', (req, res) => {
  res.render('index', { single: spotifyApi.randomSong })
})

app.post('/set-user', (req, res) => {
  console.log(req.body)
  res.cookie('userName', req.body.userName)
  res.send({
    status: 'done'
  })
})

app.get('/data', async (req, res) => {
  scope = await spotifyApi
  res.send(scope.currentTrack)
})

app.get('/me', (req, res) => {
  res.json(spotifyApi.randomSong)
})

http.listen(config.port, () => {
  console.log(chalk.blue(`Listening on port:${config.port}`))
})
