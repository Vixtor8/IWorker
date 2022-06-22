'use strict'

module.exports = (options) => {
  const app = options.app
  app.get('/', (req, res) => {
    res.send('IWorker API. Check <a href="https://github.com/Vixtor8/IWorker">Repository</a>')
  })
}
