const ProductCategory = require('../../models/productCategory.model');
const systemConfig = require('../../config/system');


module.exports.index = async (req, res) => {
  try {
    const find = { deleted: false };
    const records = await ProductCategory.find(find);
    res.render('admin/pages/products-category/index.pug', {
      titlePage: "Product list",
      records: records
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Internal Server Error");
  }
}


module.exports.delete = async (req, res) => {
  try {
    const id = req.params.id;

    await ProductCategory.deleteOne({ _id: id });
    res.redirect('back');
  } catch (error) {
    res.json(error);
  }
}

module.exports.create = async (req, res) => {
  const find = { deleted: false };
  const records = await ProductCategory.find(find);
  res.render('admin/pages/products-category/create.pug', {
    records: records
  })
}
module.exports.createPost = async (req, res) => {
  try {
    const record = new ProductCategory(req.body);
    await record.save();
    console.log(record);
    req.flash('success', 'Create successs');
    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
  } catch (error) {
    res.json(error);
  }
}
