const _ = require('lodash');

const admin = (req, res) => {
  let users = require('../../models/users.json');
  let products = require('../../models/products.json');
  let categories = require('../../models/categories.json');

  users = _.get(users, 'body', []);
  products = _.get(products, 'body', []);
  categories = _.get(categories, 'body', []);
  res.render('admin', { usersTotal: users.length, productsTotal: products.length, categoriesTotal: categories.length });
};

module.exports = {
  admin,
};
