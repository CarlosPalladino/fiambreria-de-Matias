const {Router,}= require('express');
const router = Router();
const { login,logout,access }= require('../controllers/userController');
const middlewaresLogin = require ('../middlewares/login')
const isAdmin = require('../middlewares/isAdmin')
const loginMiddlewares = require('../middlewares/logged')



router.get('/login',login)

router.post('/access',[loginMiddlewares],middlewaresLogin,access)

router.get ('/logout',logout)


module.exports= router;