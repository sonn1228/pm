const express = require('express');
const controller = require('../../controllers/admin/products-category.controller');
const middleware = require('../../middleware/cloudUpload.middleware');

const validate = require('../../validate/admin/product-category.validate')
const multer = require('multer');

const fileUpload = multer();

// middleware


const router = express.Router()
router.get('/', controller.index);
router.delete('/delete/:id', controller.delete);
router.get('/create', controller.create);
router.post('/create', fileUpload.single('thumbnail'), middleware.uploadCloud, validate.createPost, controller.createPost);

router.get('/edit/:id', controller.edit);
router.patch('/edit/:id', fileUpload.single('thumbnail'), middleware.uploadCloud, validate.createPost, controller.editPatch);


module.exports = router;