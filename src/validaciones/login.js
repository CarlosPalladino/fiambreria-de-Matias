const { compareSync } = require('bcryptjs');
const { body } = require('express-validator');
const { index } = require('../models/usersModel');
const login =[
 //email
body('email').notEmpty().custom(value=>{
    let users= index()
    users= user.map(u=>u.email)
    if(!users.includes(value)){
}}),
// password
body('password').notEmpty().custom((value,{req})=>{
    let {email} = req.body
    let users= index()
    let user =users.find(u=>u.email === email)
    if(!user){
        throw new error ('usuario no encontrado')
    }
    if (!compareSync(value,user.password)){
        throw new Error ('Las contraseñas no coinciden' )
    }
    return  true
})

]
   
  


module.exports = login