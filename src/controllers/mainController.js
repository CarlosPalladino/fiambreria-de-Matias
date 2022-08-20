const {categorias} = require('../models/catsModel')

const controller={ 
    home:(req,res)=> { 
        return res.render('index',{
            title :"Las Marias",
            styles: ["index","footer" ],
            categorias:categorias()
        });
    },
    contacto: (req,res)=> {
        return res.render('contacto',{
            title: "Contactanos",
        styles:["index", "footer"

        ]})
    }
}
module.exports=controller;
