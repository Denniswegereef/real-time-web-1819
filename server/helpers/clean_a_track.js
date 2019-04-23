module.exports = clean = data => {
  return {
    name: data.track.name,
    artist: data.track.artists.map(artist => artist.name),
    albumCover: data.track.album.images.slice(-1).pop(),
    url: data.track.external_urls.spotify
  }
}
