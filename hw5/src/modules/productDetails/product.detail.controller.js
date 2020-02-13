const _ = require('lodash');
const Product = require('../../models/Product');

const productDetail = async (req, res) => {
  const productId = _.get(req, 'params._id', '');
  let product = await Product.findOne({_id: productId}).exec();
  res.render('productDetails', {product: product});
}

const FilterProducts = async (req, res) => {
  try {
    const filter = _.get(req, 'query.filter', '{}');
    const jsonFilter = JSON.parse(filter);
    const where = _.get(jsonFilter, 'where', {});
    const offset = _.get(jsonFilter, 'offset', 0);
    const limit = _.get(jsonFilter, 'limit', 0);
    const products = await Product.find(where).skip(offset).limit(limit).exec();
    res.json({success: true, data: products});
  } catch (error) {
    res.json({success: false, error: error.message});
  }
}

module.exports = {
  productDetail,
  FilterProducts
};