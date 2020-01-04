const _ = require('lodash');

const categories = (req, res) => {
  let categories = require('../../models/categories.json');
  categories = _.get(categories, 'body', []);
  res.render('categories', {categories: categories});
};

module.exports = {
  categories,
};