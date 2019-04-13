const axios = require('axios')
const chalk = require('chalk')

module.exports = class spotifyApiClass {
  constructor(obj) {
    this.clientId = obj.clientId
    this.clientSecret = obj.clientSecret
    this.playlistId = obj.playlistId
    this.url = 'https://api.spotify.com/v1'

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
      })
      .catch(error => console.error(error))
  }

  async getTracks(url) {
    console.log(chalk.red('Getting tracks'))

    return await axios({
      url: this.url + `/playlists/${this.playlistId}`,
      headers: {
        Authorization: `${this.token.token_type} ${this.token.access_token}`
      }
    })
      .then(res => res.data)
      .catch(err => console.error(err))
  }

  getRandomTrack() {
    return this.getRandom(this.playlistData.tracks.items)
  }

  getRandom(arr) {
    let temp = arr[Math.floor(Math.random() * arr.length)]

    // Check if preview is avaliable
    if (temp.track.preview_url !== null) {
      console.log(chalk.yellow('preview url avaliable'))
      return temp
    }

    return this.getRandom(this.playlistData.tracks.items)
  }

  async init() {
    this.playlistData = await this.getTracks()
    this.randomSong = this.getRandom(this.playlistData.tracks.items)
  }
}
