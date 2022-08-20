const{Router, }= require('express');
const router = Router()
const {todasCategorias, list,categoria,detail,create,created,edit,edited,destroy}= require("../controllers/productController")

router.get("/categorias",todasCategorias)
router.get("/categorias/:category", categoria)
router.get("/", list)
router.get("/detail/:id", detail)
router.get("/create", create)
router.post("/created", created)
router.get("/edit/:id",edit)
router.put("/edit/:id",edited)
router.delete("/delete/:id",destroy)

module.exports = router;