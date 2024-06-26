const homeRoutes = require('./home.route');
const productRoutes = require('./product.route');

module.exports = (app) => {
  app.use('/admin', homeRoutes);

  app.use('/admin/products', productRoutes);

}