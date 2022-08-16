const express= require ('express');
const router= express.Router();
const {index, contacto}= require ( '../controllers/mainController');

router.get('/',index);
router.get('/contacto',contacto)
module.exports = router;