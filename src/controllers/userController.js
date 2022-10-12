const { index, one, create, write } = require("../models/usersModel");
const { hashSync } = require("bcryptjs")
const { resolve } = require('path');
const { validationResult } = require('express-validator')

const userController = {
    login: function (req, res) {
        return res.render('users/login', {
            title: "Login",
            styles: ["header", "footer", "forms"]

        });
    },
    access: function (req, res) {
        let validaciones = validationResult(req)
        let { errors } = validaciones
        if (errors && errors.length > 0) {

            return res.render('users/login', {
                title: 'Login',
                styles: [ 'header', 'footer', 'forms'],
                oldData: req.body,
                errors:validaciones.mapped()

            });
        }
        let users = index();
        let user = users.find(u => u.email === req.body.email);
        req.session.user = user;
        
        if (req.body.recordame != undefined) {
            res.cookie("recordame", user.email , { maxAge: 172800000 })
        }
        return res.redirect("/")
    },

    logout: function (req, res) {
        delete req.session.user
        return res.redirect('/')
    }
}

module.exports = userController
