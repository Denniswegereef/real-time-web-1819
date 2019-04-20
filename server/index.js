require('dotenv').config()

// Packages
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const chalk = require('chalk')
//const cookieParser = require('cookie-parser')
const path = require('path')
const session = require('express-session')

// Modules
const spotifyApiClass = require('./controllers/spotify_api')
const userDiff = require('./controllers/userDiff')
const calculatePoints = require('./controllers/calculate_points')
const db = require('./controllers/database')

const setUsername = require('./controllers/set_username')
const trackLoop = require('./controllers/track_loop')
const home = require('./pages/home')

// Express
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

const config = {
  port: 5555,
  duration: 3000 // In seconds
}

app.set('trust proxy', 1) // trust first proxy
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 60 * 1000 * 60 }
  })
)

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

//app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.set('view engine', 'hbs')
app.set('views', __dirname + '/views')

// Start the spotify API
let spotifyApi = new spotifyApiClass({
  clientId: process.env.SPOTIFY_clientId,
  clientSecret: process.env.SPOTIFY_clientSecret,
  playlistId: '3WFMtlxT9NW5rgkZCpbxKG'
}).then(scope => {
  console.log(chalk.yellow('Finished getting playlist'))
  // Start loop
  trackLoop(scope, app, io, config)
  //getLoopTracks(scope)
  return
})

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

app.get('/', home)
app.post('/set-user', setUsername)

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

http.listen(config.port, () => {
  console.log(chalk.blue(`Listening on port:${config.port}`))
})
