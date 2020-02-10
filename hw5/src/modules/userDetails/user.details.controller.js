const _ = require('lodash');
const User = require('../../models/User');
var path = require('path');

const userDetails = async (req, res) => {
  const userId = _.get(req, 'params._id', '');
  let user = await User.findOne({_id: userId}).exec();
  res.render('usersDetails', {user: user});
}

const uploadAvatar = async (req, res) => {
  const filename = _.get(req, 'file.originalname', '');
  const userId = _.get(req, 'body.userId', '');
  const mimeType = _.get(req, 'file.mimetype', '');
  const size = _.get(req, 'file.size:', 0);

  // Check image type
  if(mimeType === 'image/png' || mimeType === 'image/jpg' || mimeType === 'image/gif') {
  } else {
    res.json({success: false, error: 'file is not image'});
  }

  // Check image size
  if(size > 2*1024*1024) {
    res.json({success: false, error: 'file must be < 2Mb'});
  }

  await User.updateOne({_id: userId}, {avatar: '/images/uploads/' + filename}).exec();
  await res.json({success: true});
}

module.exports = {
  userDetails,
  uploadAvatar,
}