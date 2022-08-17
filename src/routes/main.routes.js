const {Router}= require('express');
const router= Router();
const {home, contacto}= require('../controllers/mainController');

router.get("/",home);
router.get("/contacto",contacto)
module.exports = router;