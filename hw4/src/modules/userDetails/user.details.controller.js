const _ = require('lodash');
const User = require('../../models/User');

const userDetails = async (req, res) => {
  const userId = _.get(req, 'params._id', '');
  let user = await User.findOne({_id: userId}).exec();
  res.render('usersDetails', {user: user});
}
module.exports = {
  userDetails,
}