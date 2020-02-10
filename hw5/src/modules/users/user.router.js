const app = require('express');
const router = app.Router();

const controller = require('./user.controller');

router.get('/admin/users', controller.users);

// API
router.get('/api/users', controller.GetAllUsers); //	GET	Get all the users.
router.post('/api/users', controller.CreateUsers); //	POST	Create a new user.
router.get('/api/users/:id', controller.GetUser); //	GET	Get a single user.
router.patch('/api/users/:id', controller.UpdateUser); //	PATCH	Update a user partially with new info.
router.put('/api/users/:id', controller.ReplaceUser); //	PUT	Replace a user entirely with new info.
router.delete('/api/users/:id', controller.DeleteUser); //	DELETE	Delete a user.

module.exports = router;
