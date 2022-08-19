'use strict'

module.exports = (options) => {
  const app = options.app
  app.get('/', (req, res) => {
    res.send('IWorker API.')
  })
}
