const {Router,}= require('express');
const router = Router();
const { create,process,login,logout,access }= require('../controllers/userController');
const middlewaresLogin = require ('../middlewares/login')
const isAdmin = require('../middlewares/isAdmin')
const loginMiddlewares = require('../middlewares/logged')

router.get('/create',create)

router.post ('/create', process )

router.get('/login',[loginMiddlewares],login)

router.post('/access',middlewaresLogin,access)

router.get ('/logout',logout)


module.exports= router;