const _ = require('lodash');
const Product = require('../../models/Product');

const product = async (req, res) => {
  let products = await Product.find({}).exec();
  await res.render('products', {products: products});
}

module.exports = {
  product,
};