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
  // sort
  const sort = {};
  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  }
  else {
    sort.position = 'desc';
  }
  console.log(sort);

  // end sort


  const products = await Product.find(find).sort(sort);
  res.render('admin/pages/products/index.pug', {
    titlePage: "Product list",
    products: products
  });
}

module.exports.detail = async (req, res) => {

  const find = {};
  if (req.params.id) {
    find._id = req.params.id;
  };
  const product = await Product.findOne(find);
  res.render('admin/pages/products/detail.pug', {
    titlePage: "Detail Product",
    product: product
  });
}