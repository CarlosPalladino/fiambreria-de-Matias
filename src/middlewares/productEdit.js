const multer = require('multer');
const storage = require('../modules/storage');
const productEdit = require('../validaciones/productCreate');
const upload = multer({storage: storage('product-images')});
const isAdmin = require('../middlewares/isAdmin')

module.exports = [upload.any(), productEdit]//, isAdmin]