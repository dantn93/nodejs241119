const _ = require('lodash');
const User = require('../../models/User');

const Intro = async (req, res) => {
  res.locals.title = 'Express';
  res.locals.authenticated = req.session.authenticated;
  res.render('index');
}

const Login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('login:', username, password);
  
    User.findOne({ username })
      .exec()
      .then(user => {
        if (user && username === user.username && password === user.password) {
          req.session.authenticated = true;
        }
        res.redirect('/');
      })
      .catch((e) => {
        res.redirect('/');
      });
  } catch (error) {
    res.json({success: false, error: error.message});
  }
}

module.exports = {
  Intro,
  Login,
};
