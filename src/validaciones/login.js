const { compareSync } = require('bcryptjs');
const { body } = require('express-validator');
const { index } = require('../models/usersModel');
const login =[
 //email
body('email').notEmpty().withMessage('el email no puede quedar vacia').bail().custom(value=>{
    let users= index()
    users= users.map(u=>u.email)
    if(!users.includes(value)){
        throw new Error('El email es incorrecto')
} return true 
}
).bail(),
// password
body('password').notEmpty().withMessage('La contraseña no puede quedar vacia').bail().custom((value,{req})=>{
    let {email} = req.body
    let users= index()
    let user =users.find(u=>u.email === email)
    if(!user){
        throw new Error('Usuario no encontrado')
    }
    if (!compareSync(value,user.password)){
        throw new Error('Las contraseña es Incorrecta' )
    }
    return  true
})

]
   
  


module.exports = login