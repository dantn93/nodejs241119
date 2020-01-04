const _ = require('lodash');

const productDetail = (req, res) => {
  const productId = _.get(req, 'params._id', '');
  let products = require('../../models/products.json');
  products = _.get(products, 'body', []);
  products = products.filter(e => e._id === productId);
  res.render('productDetails', {product: products.length > 0? products[0] : null});
}

module.exports = {
  productDetail,
};