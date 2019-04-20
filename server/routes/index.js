const chalk = require('chalk')

module.exports = index = (req, res) => {
  let username = req.session.username ? req.session.username : false
  console.log(req.session)
  res.render('index', {
    username
  })
}
