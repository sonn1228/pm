const Product = require('../../models/product.model');

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
    const objPagination = {
      limitItem: parseInt(req.query.limit) || 5,
      currentPage: parseInt(req.query.page) || 1,
      skipItem: 0
    };
    objPagination.skipItem = (objPagination.currentPage - 1) * objPagination.limitItem;

    const countItem = await Product.countDocuments(find);
    objPagination.totalPage = Math.ceil(countItem / objPagination.limitItem);

    const products = await Product.find(find).limit(objPagination.limitItem).skip(objPagination.skipItem);

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
