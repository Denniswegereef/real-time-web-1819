const chalk = require('chalk')

module.exports = loop = async (scope, app, io, config) => {
  // Emit old track
  app.render(
    'partials/historySong',
    { single: scope.currentTrack, layout: false },
    (err, html) => {
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
