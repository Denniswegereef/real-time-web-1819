const chalk = require('chalk')

module.exports = setUsername = (req, res) => {
  req.session.username = req.body.username

  res.render(
    'partials/user-info',
    { username: req.session.username, layout: false },
    (err, html) => {
      res.send({
        message: 'User created',
        status: 201,
        html
      })
    }
  )
}
