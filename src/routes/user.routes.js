const {Router,}= require('express');
const router = Router();
const { create,process, login,logout }= require('../controllers/userController');

router.get('/create',create)

router.post ('/create', process )

 /* router.get ('/edit/:id',edit )

router.post ('/edit/:id',edited )*/

router.get('/login',login)

router.post ('/logout',logout)

module.exports= router;