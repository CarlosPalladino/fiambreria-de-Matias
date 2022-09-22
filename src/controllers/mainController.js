const {categorias} = require('../models/catsModel')
const {index} = require ('../models/productsModel')
const controller={ 
    home:(req,res)=> { 
        let products = index()
        return res.render('index',{
            title :"La Maria",
            styles: ["index","header","footer" ],
            categorias:categorias(),
            products: products 
        });
    },
    contacto: (req,res)=> {
        return res.render('contacto',{
            title: "Contactanos", 
            styles:["header", "footer", "contacto"]})
    },
    
 
}
module.exports=controller;
