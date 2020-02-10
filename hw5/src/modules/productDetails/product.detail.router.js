const app = require('express');
const router = app.Router();

const controller = require('./product.detail.controller');

router.get('/admin/products/:_id', controller.productDetail);
router.get('/api/products', controller.FilterProducts);

module.exports = router;