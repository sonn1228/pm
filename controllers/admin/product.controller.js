const Product = require('../../models/product.model');
const paginationHelper = require('../../helpers/pagination.helper');

// [GET] /admin/products
module.exports.index = async (req, res) => {
  try {
    // Status filter
    const find = { deleted: false };
    if (req.query.status) {
      find.status = req.query.status;
    }

    // Sorting
    const sort = {};
    if (req.query.sortKey && req.query.sortValue) {
      sort[req.query.sortKey] = req.query.sortValue;
    } else {
      sort.position = 'desc';
    }

    // Searching
    const objSearch = { keyword: '' };
    if (req.query.keyword) {
      const regex = new RegExp(req.query.keyword, 'i');
      find.title = regex;
      objSearch.keyword = req.query.keyword;
    }

    // Pagination
    const countItem = await Product.countDocuments(find);

    const objPagination = paginationHelper(req, countItem);
    // end pagination



    const products = await Product.find(find).limit(objPagination.limitItem).skip(objPagination.skipItem).sort(sort);
    res.render('admin/pages/products/index.pug', {
      titlePage: "Product list",
      products,
      objSearch,
      objPagination
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports.detail = async (req, res) => {
  try {
    const find = { _id: req.params.id };
    const product = await Product.findOne(find);
    if (!product) {
      return res.status(404).send("Product not found");
    }

    res.render('admin/pages/products/detail.pug', {
      titlePage: "Detail Product",
      product
    });
  } catch (error) {
    console.error("Error fetching product details:", error);
    res.status(500).send("Internal Server Error");
  }
}


// [GET] /admin/products/delete/:id

module.exports.delete = async (req, res) => {
  await Product.deleteOne({ _id: req.params.id });
  res.redirect('back');
}
// [GET] /admin/products/change-status/:id
module.exports.changeStatus = async (req, res) => {
  const id = req.params.id;
  const status = req.params.status;
  await Product.updateOne({ _id: id }, { status: status });
  res.redirect('back');
}
// [GET] /admin/products/change-multi

module.exports.changeMulti = async (req, res) => {
  try {
    const action = req.body.action;
    const ids = req.body.ids.split(', ');
    switch (action) {
      case 'active':
        await Product.updateMany({ _id: ids }, { status: 'active' })
        break;
      case 'inactive':
        await Product.updateMany({ _id: ids }, { status: 'inactive' })
        break;
      case 'delete':
        await Product.updateMany({ _id: ids }, { deleted: true })
        break;
      case 'position':
        for (const item of ids) {
          let [id, position] = item.split('-');
          await Product.updateOne({ _id: id }, { position: position })
        }
        break;

      default:
        break;
    }
    res.redirect('back');
  } catch (error) {
    console.log(error);
  }
}
// [GET] /admin/products/create/:id

module.exports.create = async (req, res) => {
  res.render('admin/pages/products/create.pug', {
    titlePage: "Create Product"
  })
}
// [POST] /admin/products/create/

module.exports.createPost = async (req, res) => {
  try {
    req.body.price = parseInt(req.body.price);
    req.body.stock = parseInt(req.body.stock);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    const countItem = await Product.countDocuments({});
    req.body.position = countItem;
    const product = new Product(req.body);
    await product.save();
    // saved => slug
    req.flash('success', 'Create product successfully');
    res.redirect(`/admin/products/`)
  } catch (error) {
    res.json(error);
  }
}

// [GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    const find = {
      _id: id,
    }

    const product = await Product.findOne(find);
    res.render('admin/pages/products/edit.pug', {
      product: product,
    })
  } catch (error) {
    res.json(error);
  }
}
// [POST] /admin/products/edit/:id
module.exports.editPost = async (req, res) => {
  const id = req.params.id;
  await Product.updateOne({ _id: id }, req.body);
  req.flash('success', 'Updated Successfully');
  res.redirect('back');
}