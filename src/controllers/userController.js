const { index, one, create, write } = require("../models/usersModel");
const {hashSync} = require ("bcryptjs")
const { resolve } = require('path');

const userController = {

    create: (req, res) => {
        return res.render("users/create", {
            title: "Crear usuario",
            styles: ["header", "footer", "register"]
        })
    },
    process: function (req, res) 
    {
        
        req.body.password = hashSync(req.body.password, 10);
        req.body.isAdmin = req.body.admin == "adminSi" ? true :false
        
        return res.redirect('/')
    },
  login: function (req, res) {
        return res.render('users/login', {
            title: "Login",
            styles: ["style", "header", "footer", "login"]
        });
    },

    logout: function (req, res) {
        delete req.session.user
        return res.redirect('/')
    }, 
}

module.exports = userController

