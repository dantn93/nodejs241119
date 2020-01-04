const _ = require('lodash');
const product = (req, res) => {
  let products = require('../../models/products.json');
  products = _.get(products, 'body', []);
  res.render('products', {products: products});
}

module.exports = {
  product,
};