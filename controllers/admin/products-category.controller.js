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
  function createTree(arr, parentId = "") {
    const tree = [];
    arr.forEach((item) => {
      if (item.parent_id === parentId) {
        const children = createTree(arr, item.id);
        if (children.length > 0) {
          item.children = children;
        }
        tree.push(item);
      }
    });
    return tree;
  }
  const newRecords = createTree(records);

  res.render('admin/pages/products-category/create.pug', {
    records: newRecords
  })
}
module.exports.createPost = async (req, res) => {
  try {
    const count = await ProductCategory.countDocuments({});
    if (req.body.position) {
      req.body.position = parseInt(req.body.position);
    }
    else {
      req.body.position = count + 1;
    }


    const record = new ProductCategory(req.body);
    await record.save();


    req.flash('success', 'Create successs');
    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
  } catch (error) {
    res.json(error);
  }
}
