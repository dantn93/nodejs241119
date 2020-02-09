const _ = require('lodash');
const User = require('../../models/User');

const users = async (req, res) => {
  let users = await User.find({}).exec();
  res.render('users', {users: users});
};

const GetAllUsers = async (req, res) => {
  let users = await User.find({}).exec();
  res.json({users});
};

const CreateUsers = async (req, res) => {
  try {
    const users = _.get(req, 'body', []);
    users.map((e, i) => {e._id = '' + (new Date).getTime() + i});
    const result = User.insertMany(users);
    res.json({success: true});
  } catch (error) {
    res.json({success: false, error: error});
  }
}

const GetUser = async (req, res) => {
  try {
    const id = _.get(req, 'params.id', null);
    const user = await User.findOne({_id: id}).exec();
    res.json({success: true, data: user});
  } catch (error) {
    res.json({success: false, error: error});
  }

}

const UpdateUser = async (req, res) => {
  try {
    const id = _.get(req, 'params.id', null);
    const data = _.get(req, 'body', {});
    console.log("ID: ", id)
    console.log("Data: ", data)
    const a = await User.updateOne({_id: id}, data).exec();
    res.json({success: true});
  } catch (error) {
    res.json({success: false, error: error});
  }
}

const ReplaceUser = async (req, res) => {
  try {
    const id = _.get(req, 'params.id', null);
    const avatar = _.get(req, 'body.avatar', null);
    const firstName = _.get(req, 'body.firstName', null);
    const lastName = _.get(req, 'body.lastName', null);
    const dob = _.get(req, 'body.dob', null);
    const gender = _.get(req, 'body.gender', null);
    const country = _.get(req, 'body.country', null);
    const phoneNumber = _.get(req, 'body.phoneNumber', null);
    const zipcode = _.get(req, 'body.zipcode', null);
    const username = _.get(req, 'body.username', null);
    const email = _.get(req, 'body.email', null);
    const emailVerified = _.get(req, 'body.emailVerified', null);
    const role = _.get(req, 'body.role', null);
    const body = _.get(req, 'body', {});

    avatar === null ? res.json({success: false, error: 'avatar is required'}) : null;
    firstName === null ? res.json({success: false, error: 'firstname is required'}) : null;
    lastName === null ? res.json({success: false, error: 'lastName is required'}) : null;
    dob === null ? res.json({success: false, error: 'dob is required'}) : null;
    gender === null ? res.json({success: false, error: 'gender is required'}) : null;
    country === null ? res.json({success: false, error: 'country is required'}) : null;
    phoneNumber === null ? res.json({success: false, error: 'phoneNumber is required'}) : null;
    zipcode === null ? res.json({success: false, error: 'zipcode is required'}) : null;
    username === null ? res.json({success: false, error: 'username is required'}) : null;
    email === null ? res.json({success: false, error: 'email is required'}) : null;
    emailVerified === null ? res.json({success: false, error: 'emailVerified is required'}) : null;
    role === null ? res.json({success: false, error: 'role is required'}) : null;

    await User.updateOne({_id: id}, body).exec();
    res.json({success: true});
  } catch (error) {
    res.json({success: false, error: error});
  }
}

const DeleteUser = async (req, res) => {
  try {
    const id = _.get(req, 'params.id', null);
    const user = await User.deleteOne({_id: id}).exec();
    await console.log(user);
    res.json({success: true});
  } catch (error) {
    res.json({success: false, error: error});
  }
}

module.exports = {
  users,
  GetAllUsers,
  CreateUsers,
  GetUser,
  UpdateUser,
  ReplaceUser,
  DeleteUser
};
