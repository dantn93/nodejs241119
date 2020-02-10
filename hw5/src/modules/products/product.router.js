const app = require('express');
const router = app.Router();

const controller = require('./product.controller');

router.get('/admin/products', controller.product);


module.exports = router;
