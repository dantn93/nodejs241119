const _ = require('lodash');

const userDetails = (req, res) => {
  const userId = _.get(req, 'params._id', '');
  let users = require('../../models/users.json');
  users = _.get(users, 'body', []);
  users = users.filter(e => e._id === userId);
  res.render('usersDetails', {user: users.length > 0? users[0] : null});
}

module.exports = {
  userDetails,
}