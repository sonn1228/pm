module.exports = (app) => {
  app.get('/', (req, res) => {
    res.render('client/layouts/default.pug', {
      titlePage: 'Title',
      h1Mess: 'Client Home Page'
    })
  })
}