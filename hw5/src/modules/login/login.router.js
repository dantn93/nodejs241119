const app = require('express');
const router = app.Router();

const controller = require('./login.controller');

router.get('/', controller.Intro);
router.post('/login', controller.Login);

module.exports = router;