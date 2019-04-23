const chalk = require('chalk')
const clean = require('../helpers/clean_a_track')

module.exports = loop = async (scope, app, io, config) => {
  // Emit old track

  if (scope.currentTrack) {
    app.render(
      'partials/track-history',
      { track: clean(scope.currentTrack), layout: false },
      (err, html) => {
        io.emit('history-track', {
          html
        })
      }
    )
  }

  let newTrack = scope.getRandomTrack()

  console.log('--')
  console.log(chalk.cyan('Currently in scope:'))
  console.log(chalk.yellow(`New track: ${newTrack.track.name}`))
  console.log(
    chalk.yellow(
      `Artists: ${newTrack.track.artists.map(artist => artist.name)}`
    )
  )

  // Emit layout new Track
  let html = {}

  app.render(
    'guess-layout',
    { single: newTrack, layout: false },
    (err, renderedHTML) => {
      html.layout = renderedHTML
    }
  )

  app.render(
    'partials/track-player',
    { single: newTrack, layout: false },
    (err, renderedHTML) => {
      html.trackPlayer = renderedHTML

      io.emit('newTrack', {
        track: newTrack,
        config,
        html
      })
    }
  )

  // Restart loop
  setTimeout(() => loop(scope, app, io, config), config.duration)
}
