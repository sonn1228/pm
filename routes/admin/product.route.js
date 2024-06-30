const express = require('express');
const controller = require('../../controllers/admin/product.controller');
const validate = require('../../validate/admin/product.validate');

const multer = require('multer');
const fileUpload = multer();
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

cloudinary.config({
  cloud_name: 'di5h6fj4a',
  api_key: '171191531728459',
  api_secret: 'ZuoaRv1uSOlWmnJZxS5sPxy9D5E',
  secure: true,
});

const router = express.Router()
router.get('/', controller.index);

router.get('/detail/:id', controller.detail);

router.delete('/delete/:id', controller.delete);

router.patch('/change-status/:status/:id', controller.changeStatus);

router.patch('/change-multi', controller.changeMulti);

router.get('/create', controller.create);

router.post('/create', validate.createPost, fileUpload.single('thumbnail'), function (req, res, next) {
  if (req.file) {
    let streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    async function upload(req, next) {
      let result = await streamUpload(req);
      req.body[req.file.fieldname] = result.secure_url;
      next();
    }
    upload(req, next);
  }
  else {
    next();
  }
}, controller.createPost);


module.exports = router;