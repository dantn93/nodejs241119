const app = require('express');
const router = app.Router();

const controller = require('./user.details.controller');

router.get('/admin/users/:_id', controller.userDetails);

module.exports = router;