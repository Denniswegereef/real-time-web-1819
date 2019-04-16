const chalk = require('chalk')

const current = {
  added_at: '2017-11-18T00:03:30Z',
  added_by: {
    external_urls: { spotify: 'https://open.spotify.com/user/' },
    href: 'https://api.spotify.com/v1/users/',
    id: '',
    type: 'user',
    uri: 'spotify:user:'
  },
  is_local: false,
  primary_color: null,
  track: {
    album: {
      album_type: 'album',
      artists: [Array],
      available_markets: [Array],
      external_urls: [Object],
      href: 'https://api.spotify.com/v1/albums/2AvupjUeMnSffKEV05x222',
      id: '2AvupjUeMnSffKEV05x222',
      images: [Array],
      name: 'Culture',
      release_date: '2017-01-27',
      release_date_precision: 'day',
      total_tracks: 13,
      type: 'album',
      uri: 'spotify:album:2AvupjUeMnSffKEV05x222'
    },
    artists: [[Object], [Object]],
    disc_number: 1,
    duration_ms: 343150,
    episode: false,
    explicit: true,
    external_ids: { isrc: 'QMCE31600796' },
    external_urls: {
      spotify: 'https://open.spotify.com/track/4Km5HrUvYTaSUfiSGPJeQR'
    },
    href: 'https://api.spotify.com/v1/tracks/4Km5HrUvYTaSUfiSGPJeQR',
    id: '4Km5HrUvYTaSUfiSGPJeQR',
    is_local: false,
    name: 'Bad and Boujee (feat. Lil Uzi Vert)',
    popularity: 79,
    preview_url:
      'https://p.scdn.co/mp3-preview/7692f502539573458844535e54f247643d2f7157?cid=87f5345913f64c96847afb44ade68ff0',
    track: true,
    track_number: 4,
    type: 'track',
    uri: 'spotify:track:4Km5HrUvYTaSUfiSGPJeQR'
  },
  video_thumbnail: { url: null }
}

let userInput = 'Bad and Boujee'

module.exports = diffAnswers = (userInput, C) => {
  console.log(current)
}
