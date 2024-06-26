const homeRoutes = require('./home.route');
const productRoutes = require('./product.route');

module.exports = (app) => {

  const PATH_ADMIN = '/admin';

  app.use(`${PATH_ADMIN}/dashboard`, homeRoutes);

  app.use(`${PATH_ADMIN}/products`, productRoutes);

}