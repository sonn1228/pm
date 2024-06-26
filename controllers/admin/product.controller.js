const Product = require('../../models/product.model');

//[GET] /admin/products

module.exports.index = async (req, res) => {

  // status
  const find = {
    deleted: false
  };
  if (req.query.status) {
    find.status = req.query.status;
  }
  // end status


  const products = await Product.find(find);
  console.log(products);
  res.render('admin/pages/products/index.pug', {
    titlePage: "Product list",
    products: products
  });
}