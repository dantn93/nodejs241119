const _ = require('lodash');
const Category = require('../../models/Category');

const categories = async (req, res) => {
  const categories = await Category.find({}).exec();
  res.render('categories', {categories: categories});
};



module.exports = {
  categories,
};