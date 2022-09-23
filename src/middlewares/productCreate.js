const multer = require('multer');
const storage = require('../modules/storage');
const productCreate = require('../validaciones/productCreate');
const upload = multer({storage: storage('productos')});
const isAdmin = require('../middlewares/isAdmin')

module.exports = [upload.any(), productCreate, isAdmin]