const { validationResult } = require('express-validator');
const { index, one, create, write } = require("../models/usersModel");

const { resolve } = require('path');
const { isAdmin } = require('../middlewares/isAdmin');

const userController = {
    register = async (req, res) => {
        return res.render("./users/register", {
            title: "Registro",
            styles: ["header", "footer", "register"]
        })
    },
    process: async (req, res) => {
        let validaciones = validationResult(req)
        let { errors } = validaciones;

        if (errors && errors.length > 0) {
            return res.render("./users/register", {
                title: "Registro",
                styles: ["header", "footer", "register"],
                errors: validaciones, mapped()
            });
        }


        req.body.password = hashSync(req.body.password, 10);
        req.body.isAdmin = String(req.body.email).toLocaleLowerCase().includes('@.com');
        req.body.imagen = req.files[0].filename;

        if (req.files && req.files.length > 0) {

            let imagenUsuario = await imagen.create({
                nombre: req.files[0].filename
            })
            req.body.imagenId = imagenUsuario.id;
        }
        await usuarios.create(req.body)
        return res.redirect('/')
    },
    login: async function (req, res) {
        return res.render('users/login', {
            title: "Login",
            styles: ["style", "header", "footer", "login"]
        });
    },

    logout: async function (req, res) {
        delete req.session.user
        return res.redirect('/')
    },

}

module.exports = controller

