const slug = require('mongoose-slug-updater');
const mongoose = require('mongoose');
mongoose.plugin(slug);

const { Schema } = mongoose;
const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  price: Number,
  discountPercentage: Number,
  stock: Number,
  thumbnail: String,
  status: {
    type: String,
    default: 'active',
  },
  position: Number,
  deleted: {
    type: Boolean,
    default: false,
  },
  deletedAt: Date,
  slug: {
    type: String,
    slug: 'title',
    unique: true
  },
}, {
  timestamps: true,
});

const Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product;
