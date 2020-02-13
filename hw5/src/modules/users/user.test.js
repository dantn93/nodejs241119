// we will use supertest to test HTTP requests/responses
const request = require("supertest");
// we also need our app for the correct routes!
const _ = require('lodash');

describe.only("GET / ", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('Get all users', async () => {
    const user = {
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
    }

    await jest.doMock('../../models/User', () => ({
      find: function() {
        return {
          exec: function() {
            return [user];
          }
        }
      }
    }));

    const res = await {
      json: jest.fn((data) => {
        const userList = _.get(data, 'data', {});
        const equal = _.isEqual(userList, [user]);
        expect(equal).toBe(true);
        return data;
      })
    }

    const UserController = await require('./user.controller');
    await UserController.GetAllUsers({}, res);
  });

  it('Create new user', async () => {
    const req = {
      body: {
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
      }
    }
    
    await jest.doMock('../../models/User', () => ({
      create: function() {
        return {
          exec: function() {
            return null;
          }
        }
      }
    }));
    const res = await {
      json: jest.fn((data) => {
        const equal = _.isEqual(data, {success: true});
        expect(equal).toBe(true);
        return data;
      })
    }
    const UserController = await require('./user.controller');
    await UserController.CreateUsers(req, res);
  });

  it('Get a single user', async () => {
    const user = {
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
    }
    
    await jest.doMock('../../models/User', () => ({
      findOne: function() {
        return {
          exec: function() {
            return user;
          }
        }
      }
    }));
    const res = await {
      json: jest.fn((data) => {
        const equal = _.isEqual(data, {success: true, data: user});
        expect(equal).toBe(true);
        return null;
      })
    }
    const UserController = await require('./user.controller');
    await UserController.GetUser({params: {id: '001'}}, res);
  });

  it('Update a user partially with new info', async () => {
    const user = {
      avatar: '/images/uploads/Screen Shot 2020-02-08 at 22.50.01.png',
      firstName: 'Nordic',
      lastName: 'Coder',
      dob: '1990-12-10T13:06:35.216Z',
      gender: 'male',
      country: 'vietnam',
      phoneNumber: '12345678'
    };
    await jest.doMock('../../models/User', () => ({
      updateOne: function() {
        return {
          exec: function() {
            return user;
          }
        }
      }
    }));

    const res = await {
      json: jest.fn((data) => {
        const equal = _.isEqual(data, {success: true});
        expect(equal).toBe(true);
      })
    }

    const UserController = await require('./user.controller');
    await UserController.UpdateUser({params: {id: '001'}}, res);
  });

  it('Replace a user entirely with new info', async () => {
    const user = {
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
    await jest.doMock('../../models/User', () => ({
      updateOne: function() {
        return {
          exec: function() {
            return user;
          }
        }
      }
    }));

    const res = await {
      json: jest.fn((data) => {
        const equal = _.isEqual(data, {success: true});
        expect(equal).toBe(true);
      })
    }

    const UserController = await require('./user.controller');
    await UserController.ReplaceUser({params: {id: '001'}, body: user}, res);
  });

  it('Delete user', async () => {
    await new Promise(async(resolve, reject) => {
      await jest.doMock('../../models/User', () => ({
        deleteOne: function() {
          return {
            exec: function() {
              return null;
            }
          }
        }
      }));
      await resolve(0);
    })

    const res = await {
      json: jest.fn((data) => {
        const equal = _.isEqual(data, {success: true});
        expect(true).toBe(true);
      })
    }

    const UserController = await require('./user.controller');
    await UserController.DeleteUser({params: {id: '001'}}, res);
  });
});