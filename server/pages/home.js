const chalk = require('chalk')

module.exports = home = (req, res) => {
  let username = req.session.username ? req.session.username : false

  res.render('index', {
    username
  })
}
