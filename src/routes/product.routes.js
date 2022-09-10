const{Router, }= require('express');
const router = Router()
const {todasCategorias, list,categoria,detail,create,created,edit,edited,destroy}= require("../controllers/productController")
const multer = require('multer');
const storage = require('../modules/storage')
const upload = multer({storage: storage('product-images')});

router.get("/categorias",todasCategorias)
router.get("/categorias/:category", categoria)
router.get("/", list)
router.get("/detail/:id", detail)
router.get("/create", create)
router.post("/created",[upload.any()], created)
router.get("/edit/:id",edit)
router.put("/edit/:id",[upload.any()],edited)
router.delete("/delete/:id",destroy)

module.exports = router;