'use strict'
const passport = require('passport')

module.exports = {
  isLoggedIn: (req, res, next) => {
    passport.authenticate('bearer', { session: false })(req, res, next)
  }
}
