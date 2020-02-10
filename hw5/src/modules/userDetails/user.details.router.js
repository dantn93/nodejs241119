const app = require('express');
const router = app.Router();
const controller = require('./user.details.controller');
const _ = require('lodash');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images/uploads')
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    }
});
var upload = multer({storage: storage});


router.get('/admin/users/:_id', controller.userDetails);
router.post('/admin/users/fileUpload', upload.single('image'), controller.uploadAvatar);

module.exports = router;