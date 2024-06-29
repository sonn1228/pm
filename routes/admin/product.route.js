const express = require('express');
const controller = require('../../controllers/admin/product.controller');

const router = express.Router()
router.get('/', controller.index);

router.get('/detail/:id', controller.detail);

router.delete('/delete/:id', controller.delete);

router.patch('/change-status/:status/:id', controller.changeStatus);

router.patch('/change-multi', controller.changeMulti);

router.get('/create', controller.create);

router.post('/create', controller.createPost);


module.exports = router;