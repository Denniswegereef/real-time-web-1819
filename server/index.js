const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const chalk = require('chalk')
require('dotenv').config()
const axios = require('axios')

var path = require('path')

const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

const spotifyApiClass = require('./controllers/spotify_api')

const port = 5555

const config = {
  duration: 5000 // In seconds
}

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

app.set('view engine', 'hbs')
app.set('views', __dirname + '/views')

// Start the spotify API
let spotifyApi = new spotifyApiClass({
  clientId: process.env.SPOTIFY_clientId,
  clientSecret: process.env.SPOTIFY_clientSecret,
  playlistId: '3WFMtlxT9NW5rgkZCpbxKG'
}).then(res => {
  console.log(chalk.yellow('Finished getting playlist'))

  // Start loop
  repeatingFunc(res)
})

// Repeatable function for getting new tracks
const repeatingFunc = async scope => {
  console.log(chalk.red('Currently in scope:'))

  let newTrack = scope.getRandomTrack()
  console.log(chalk.yellow(`New track: ${newTrack.track.name}`))

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
  setTimeout(() => repeatingFunc(scope), 5000)
}

io.on('connection', socket => {
  console.log(chalk.blue('A user connected'))

  socket.on('disconnect', function() {
    io.emit(chalk.red('A user disconnected'))
  })
})

app.get('/', (req, res) => {
  res.render('index', { single: spotifyApi.randomSong })
})

app.get('/me', (req, res) => {
  res.json(spotifyApi.randomSong)
})

http.listen(port, () => {
  console.log(chalk.blue(`Listening on port:${port}`))
})
