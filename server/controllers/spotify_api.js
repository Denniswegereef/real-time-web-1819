const axios = require('axios')
const chalk = require('chalk')

module.exports = class spotifyApiClass {
  constructor(obj) {
    this.clientId = obj.clientId
    this.clientSecret = obj.clientSecret
    this.playlistId = obj.playlistId
    this.url = 'https://api.spotify.com/v1'
    this.playedCache = []
    this.cachePlaylist
    this.currentTrack

    return new Promise(resolve => {
      this.createToken().then(async res => {
        await this.init()
        resolve(this)
      })
    })
  }

  async createToken() {
    return await axios({
      url: 'https://accounts.spotify.com/api/token',
      method: 'post',
      params: {
        grant_type: 'client_credentials'
      },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      auth: {
        username: process.env.SPOTIFY_clientId,
        password: process.env.SPOTIFY_clientSecret
      }
    })
      .then(res => {
        this.token = res.data
        return
      })
      .catch(error => console.error(error))
  }

  getTrackPage(url) {
    console.log(chalk.red('Getting tracks'))

    return axios({
      url: url ? url : this.url + `/playlists/${this.playlistId}`,
      headers: {
        Authorization: `${this.token.token_type} ${this.token.access_token}`
      }
    })
      .then(res => res.data)
      .catch(err => console.error(err))
  }

  async getAllTracks(url) {
    if (!this.cachePlaylist) {
      this.cachePlaylist = await this.getTrackPage()
      return this.getAllTracks(this.cachePlaylist.tracks.next)
    }

    if (url) {
      let data = await this.getTrackPage(url)

      this.cachePlaylist.tracks.items = this.cachePlaylist.tracks.items.concat(
        data.items
      )
      return this.getAllTracks(data.next)
    }

    return new Promise((resolve, reject) => {
      resolve()
    })
  }

  filterOnPreview(arr) {
    this.cachePlaylist.tracks.items = arr.filter(
      track => track.track.preview_url !== null
    )
  }

  getRandomTrack(arr) {
    let temp = this.cachePlaylist.tracks.items[
      Math.floor(Math.random() * this.cachePlaylist.tracks.items.length)
    ]

    if (!this.playedCache.includes(temp.track.id)) {
      this.playedCache.push(temp.track.id)
      this.currentTrack = temp
      return temp
    }

    console.log(chalk.red('All songs used from this playlist'))
    this.playedCache = []
    return this.getRandomTrack()
  }

  async init() {
    await this.getAllTracks()
    this.filterOnPreview(this.cachePlaylist.tracks.items)
  }
}
