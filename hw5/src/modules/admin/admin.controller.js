const _ = require('lodash');
const User = require('../../models/User');
const Product = require('../../models/Product');
const Category = require('../../models/Category');

const admin = async (req, res) => {
  const users = await User.find({}).exec();
  const products = await Product.find({}).exec();
  const categories = await Category.find({}).exec();

  res.render('admin', { usersTotal: users.length, productsTotal: products.length, categoriesTotal: categories.length });
};

module.exports = {
  admin,
};

