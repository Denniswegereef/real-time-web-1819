const chalk = require('chalk')
const db = require('../controllers/database')

module.exports = setUsername = async (req, res) => {
  req.session.username = req.body.username

  let add = await db.add(req.body.username)

  if (!add) {
    res.send({
      message: 'Username already exists',
      status: 409
    })
    return
  }

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
