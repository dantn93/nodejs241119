const _ = require('lodash');

const users = (req, res) => {
  let users = require('../../models/users.json');
  users = _.get(users, 'body', []);
  res.render('users', {users: users});
};

module.exports = {
  users,
};
