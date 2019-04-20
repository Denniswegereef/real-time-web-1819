module.exports = guessTrackInput = async (data, io, spotifyApi, app) => {
  let scope = await spotifyApi
  let currentTrack = scope.currentTrack.track.name
}
