require('dotenv').config()

// Packages
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const chalk = require('chalk')
const path = require('path')
const session = require('express-session')

// Modules
const spotifyApiClass = require('./controllers/spotify_api')
const userDiff = require('./controllers/userDiff')
const calculatePoints = require('./controllers/calculate_points')
const db = require('./controllers/database')

const setUsername = require('./controllers/set_username')
const trackLoop = require('./controllers/track_loop')

// Sockets
const guessTrackInput = require('./sockets/guess-track-input')
const online = require('./sockets/online-tracker')

// Routes
const index = require('./routes/index')

// Express
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

const config = {
  port: 5554,
  duration: 15000
}

// Middleware
app.use(
  session({
    secret: process.env.SECRET_COOKIES,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 365 * 24 * 60 * 60 * 1000 }
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

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.set('view engine', 'hbs')
app.set('views', __dirname + '/views')

// Launch the spotify API
let spotifyApi = new spotifyApiClass({
  clientId: process.env.SPOTIFY_clientId,
  clientSecret: process.env.SPOTIFY_clientSecret,
  playlistId: '3WFMtlxT9NW5rgkZCpbxKG'
}).then(scope => {
  console.log(chalk.yellow('Finished getting playlist'))
  // Start loop
  trackLoop(scope, app, io, config)

  return scope
})

// Routes
app.get('/', index)
app.post('/set-user', setUsername)

// Sockets
io.on('connection', socket => {
  socket.on('input-guess', data =>
    guessTrackInput(data, io, spotifyApi, app, socket)
  )

  socket.on('im-online', username => online.addUser(socket, io, username, app))
  socket.on('get-online-users', username => online.getAll(io, app))

  socket.on('disconnect', () => {
    online.removeUser(socket)
  })
})

http.listen(config.port, () => {
  console.log(chalk.blue(`Listening on port:${config.port}`))
})
