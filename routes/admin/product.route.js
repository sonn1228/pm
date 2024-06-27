const express = require('express');
const controller = require('../../controllers/admin/product.controller');

const router = express.Router()
router.get('/', controller.index);

router.get('/detail/:id', controller.detail);

router.delete('/delete/:id', controller.delete);

router.patch('/change-status/:status/:id', controller.changeStatus);




module.exports = router;