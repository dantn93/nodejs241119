// we will use supertest to test HTTP requests/responses
const request = require("supertest");
// we also need our app for the correct routes!
const app = require("../src/app");
const mongoose = require('mongoose');
const User = require('../src/models/User');
const _ = require('lodash');

describe("GET / ", () => {
  beforeAll(async () => {
    const url = `mongodb+srv://admin:pYMuwWdrWULs8EUX@cluster0-nmhgi.mongodb.net/nordic`;
    await mongoose.connect(url, { useNewUrlParser: true });
  });

  beforeEach(async () => {
    await User.deleteMany();
  });
  
  it('Get all users', async () => {
    await User.create({
      _id: '001',
      avatar: '/images/uploads/Screen Shot 2020-02-08 at 22.50.01.png',
      firstName: 'Nordic',
      lastName: 'Coder',
      dob: new Date('1990-12-10T13:06:35.216Z'),
      gender: 'male',
      country: 'vietnam',
      phoneNumber: '12345678',
      zipcode: 700000,
      username: 'admin',
      email: 'admin@nordiccoder.com',
      emailVerified: true,
      role: 'admin'
    });
    const res = await request(app)
      .get('/api/users')
      .send();
    const userList = _.get(res, 'body.data', []);
    await expect(userList.length).toBe(1);
    await expect(userList[0]._id).toBe('001');
    await expect(userList[0].avatar).toBe('/images/uploads/Screen Shot 2020-02-08 at 22.50.01.png');
    await expect(userList[0].firstName).toBe('Nordic');
    await expect(userList[0].lastName).toBe('Coder');
    await expect(userList[0].dob).toBe('1990-12-10T13:06:35.216Z');
    await expect(userList[0].gender).toBe('male');
    await expect(userList[0].country).toBe('vietnam');
    await expect(userList[0].phoneNumber).toBe('12345678');
    await expect(userList[0].email).toBe('admin@nordiccoder.com');
    await expect(userList[0].emailVerified).toBe(true);
    await expect(userList[0].role).toBe('admin');
  });

  it('Create new user', async () => {
    const userObject = {
      avatar: '/images/uploads/Screen Shot 2020-02-08 at 22.50.01.png',
      firstName: 'Nordic',
      lastName: 'Coder',
      dob: '1990-12-10T13:06:35.216Z',
      gender: 'male',
      country: 'vietnam',
      phoneNumber: '12345678',
      zipcode: 700000,
      username: 'admin',
      email: 'admin@nordiccoder.com',
      emailVerified: true,
      role: 'admin'
    };
    const res = await request(app)
      .post('/api/users')
      .send(userObject);
    let equal = _.isEqual(res.body, { success: true });
    expect(equal).toBe(true);

    let users = await User.find({});
    await expect(users.length).toBe(1);
    await expect(users[0].avatar).toBe('/images/uploads/Screen Shot 2020-02-08 at 22.50.01.png');
    await expect(users[0].firstName).toBe('Nordic');
    await expect(users[0].lastName).toBe('Coder');
    await expect(users[0].dob).toStrictEqual(new Date('1990-12-10T13:06:35.216Z'));
    await expect(users[0].gender).toBe('male');
    await expect(users[0].country).toBe('vietnam');
    await expect(users[0].phoneNumber).toBe('12345678');
    await expect(users[0].email).toBe('admin@nordiccoder.com');
    await expect(users[0].emailVerified).toBe(true);
    await expect(users[0].role).toBe('admin');
  });

  it('Get a single user', async () => {
    const userObject = {
      avatar: '/images/uploads/Screen Shot 2020-02-08 at 22.50.01.png',
      firstName: 'Nordic',
      lastName: 'Coder',
      dob: '1990-12-10T13:06:35.216Z',
      gender: 'male',
      country: 'vietnam',
      phoneNumber: '12345678',
      zipcode: 700000,
      username: 'admin',
      email: 'admin@nordiccoder.com',
      emailVerified: true,
      role: 'admin'
    };
    await request(app)
    .post('/api/users')
    .send(userObject);
    let users = await User.find({});

    //get user id
    const userId = users[0]._id;

    //request api
    const res = await request(app)
    .get(`/api/users/${userId}`)
    .send();

    const userRes = _.get(res, 'body.data', {});
    await expect(userRes.avatar).toBe('/images/uploads/Screen Shot 2020-02-08 at 22.50.01.png');
    await expect(userRes.firstName).toBe('Nordic');
    await expect(userRes.lastName).toBe('Coder');
    await expect(userRes.dob).toBe('1990-12-10T13:06:35.216Z');
    await expect(userRes.gender).toBe('male');
    await expect(userRes.country).toBe('vietnam');
    await expect(userRes.phoneNumber).toBe('12345678');
    await expect(userRes.zipcode).toBe(700000);
    await expect(userRes.email).toBe('admin@nordiccoder.com');
    await expect(userRes.emailVerified).toBe(true);
    await expect(userRes.role).toBe('admin');
  });

  it('Update a user partially with new info', async () => {
    const userObject = {
      avatar: '/images/uploads/Screen Shot 2020-02-08 at 22.50.01.png',
      firstName: 'Nordic',
      lastName: 'Coder',
      dob: '1990-12-10T13:06:35.216Z',
      gender: 'male',
      country: 'vietnam',
      phoneNumber: '12345678',
      zipcode: 700000,
      username: 'admin',
      email: 'admin@nordiccoder.com',
      emailVerified: true,
      role: 'admin'
    };
    // create user
    await request(app)
    .post('/api/users')
    .send(userObject);

    // get all users
    let users = await User.find({});

    // update user
    await request(app)
    .patch(`/api/users/${users[0]._id}`)
    .send({
      firstName : "Dan",
      lastName : "Tran",
      email: "dantran@yahoo.com"
    });
    
    users = await User.find({});
    await expect(users[0].avatar).toBe('/images/uploads/Screen Shot 2020-02-08 at 22.50.01.png');
    await expect(users[0].firstName).toBe('Dan');
    await expect(users[0].lastName).toBe('Tran');
    await expect(users[0].dob).toStrictEqual(new Date('1990-12-10T13:06:35.216Z'));
    await expect(users[0].gender).toBe('male');
    await expect(users[0].country).toBe('vietnam');
    await expect(users[0].phoneNumber).toBe('12345678');
    await expect(users[0].zipcode).toBe(700000);
    await expect(users[0].email).toBe('dantran@yahoo.com');
    await expect(users[0].emailVerified).toBe(true);
    await expect(users[0].role).toBe('admin');
  });

  it('Replace a user entirely with new info', async () => {
    const userObject = {
      avatar: '/images/uploads/Screen Shot 2020-02-08 at 22.50.01.png',
      firstName: 'Nordic',
      lastName: 'Coder',
      dob: '1990-12-10T13:06:35.216Z',
      gender: 'male',
      country: 'vietnam',
      phoneNumber: '12345678',
      zipcode: 700000,
      username: 'admin',
      email: 'admin@nordiccoder.com',
      emailVerified: true,
      role: 'admin'
    };
    // create user
    await request(app)
    .post('/api/users')
    .send(userObject);

    // get all users
    let users = await User.find({});

    // update user
    await request(app)
    .put(`/api/users/${users[0]._id}`)
    .send({
      avatar: "1",
      firstName: "2",
      lastName: "3",
      dob: "1996-12-10T13:06:35.216Z",
      gender: "4",
      country: "5",
      phoneNumber: "6",
      zipcode: 7,
      username: "levananh",
      email: "abc@gmail.com",
      emailVerified: false,
      role: "1"
    });
    
    users = await User.find({});
    await expect(users[0].avatar).toBe('1');
    await expect(users[0].firstName).toBe('2');
    await expect(users[0].lastName).toBe('3');
    await expect(users[0].dob).toStrictEqual(new Date('1996-12-10T13:06:35.216Z'));
    await expect(users[0].gender).toBe('4');
    await expect(users[0].country).toBe('5');
    await expect(users[0].phoneNumber).toBe('6');
    await expect(users[0].zipcode).toBe(7);
    await expect(users[0].username).toBe('levananh');
    await expect(users[0].email).toBe('abc@gmail.com');
    await expect(users[0].emailVerified).toBe(false);
    await expect(users[0].role).toBe('1');
  });

  it('Delete user', async () => {
    const userObject = {
      avatar: '/images/uploads/Screen Shot 2020-02-08 at 22.50.01.png',
      firstName: 'Nordic',
      lastName: 'Coder',
      dob: '1990-12-10T13:06:35.216Z',
      gender: 'male',
      country: 'vietnam',
      phoneNumber: '12345678',
      zipcode: 700000,
      username: 'admin',
      email: 'admin@nordiccoder.com',
      emailVerified: true,
      role: 'admin'
    };
    // create user
    await request(app)
    .post('/api/users')
    .send(userObject);

    // get all users
    let users = await User.find({});
    await request(app)
    .delete(`/api/users/${users[0]._id}`)
    .send();
    users = await User.find({});
    expect(users.length).toBe(0);
  });
});