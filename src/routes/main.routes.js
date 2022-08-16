const express= require ('express');
const router= express.Router();
const {index}= require ( '../controllers/mainController');

router.get('/',index);
router.get('/contacto',)
module.exports = router;