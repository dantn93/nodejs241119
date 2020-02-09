const app = require('express');
const router = app.Router();

const controller = require('./categories.controller');

router.get('/admin/categories', controller.categories);


module.exports = router;