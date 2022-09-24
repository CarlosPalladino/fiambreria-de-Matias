const{Router, }= require('express');
const router = Router()
const {todasCategorias, list,categoria,detail,create,created,edit,edited,destroy}= require("../controllers/productController")
const isAdmin =require('../middlewares/isAdmin')
const middlearesProductCreate = require('../middlewares/productCreate')
const middlearesProductEdit = require('../middlewares/productEdit')

router.get("/categorias",todasCategorias)
router.get("/categorias/:id", categoria)
router.get("/", list)
router.get("/detail/:id", detail)
router.get("/create", create)
router.post("/created",middlearesProductCreate,created)
router.get("/edit/:id",edit)
router.put("/edit/:id",middlearesProductEdit, edited)
router.delete("/delete/:id",destroy)

module.exports = router;