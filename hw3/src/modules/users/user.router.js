const app = require('express');
const router = app.Router();

const controller = require('./user.controller');

router.get('/admin/users', controller.users);

module.exports = router;
