const {categorias} = require('../models/catsModel')

const controller={ 
    home:(req,res)=> { 
        return res.render('index',{
            title :"Las Marias",
            styles: ["styles","header","footer" ],
            categorias:categorias()
        });
    },
    contacto: (req,res)=> {
        return res.render('contacto',{
            title: "Contactanos", 
        styles:["header", "footer", "contacto"]})

       
    }
}
module.exports=controller;
