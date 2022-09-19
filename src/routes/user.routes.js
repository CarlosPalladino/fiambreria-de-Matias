const {Router,}= require('express');
const router = Router();
const { create,process, login,logout,access }= require('../controllers/userController');
const middlewaresLogin = require ('../middlewares/login')

router.get('/create',create)

router.post ('/create', process )

router.get('/login',login)

router.post('/access',middlewaresLogin,access)

router.post ('/logout',logout)

module.exports= router;