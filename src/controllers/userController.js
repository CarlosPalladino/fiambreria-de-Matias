const { index, one, create, write } = require("../models/usersModel");
const { hashSync } = require("bcryptjs")
const { resolve } = require('path');

const userController = {
    create: (req, res) => {
        return res.render("users/create", {
            title: "Crear usuario",
            styles: ["header", "footer", "forms"],


        })
    },
    process: function (req, res) {
        req.body.password = hashSync(req.body.password, 10);
        req.body.isAdmin = req.body.admin == "adminSi" ? true : false;
        let newUser = create(req.body)
        let users = index()
        users.push(newUser);
        write(users);
        return res.redirect('/')
    },
    access: function (req, res) {
        if (errors && errors.length > 0) {
        
            return res.redirect('users/login', {
                title: 'Login',
                styles: ['style', 'header', 'footer', 'login'],
                
            });}
        let users = index();
        let user = users.find(u => u.email === req.body.email);
        req.session.user = user;
        return res.redirect("/")

    },




    login: function (req, res) {
        return res.render('users/login', {
            title: "Login",
            styles: ["style", "header", "footer", "forms"]
         
    });
    },

logout: function (req, res) {
    delete req.session.user
    return res.redirect('/')
}
}

module.exports = userController
