const {index, one, create, write}= require("../models/productsModel")
const {categorias, oneCat} = require('../models/catsModel')
const { validationResult } = require('express-validator')
const controller={ 
    todasCategorias:(req,res)=> {  //HAY QUE REQUERIR DESDE CATEGORIAS EL MODELO
        return res.render('products/todasCategorias',{
            title :"Nuestros Productos",
            styles: ["header","footer","todasCategorias" ],
            categorias: categorias()
        });
    },
    list: (req,res)=> { //LISTO
        let products = index();
        let marcas= products.map(p => p.marca)
        function unique(arr) { //con esta funcion filtramos por todas las marcas que haya pero que no se repitan
          let result = [];
        
          for (let str of arr) {
            if (!result.includes(str)) {
              result.push(str);
            }
          }
        
          return result;
        }
        marcas = unique(marcas)
        
        if(req.query && req.query.name){
           products = products.filter(product=> product.name.toLowerCase().indexOf(req.query.name.toLowerCase())> -1)
        }
        if(req.query && req.query.marca && req.query.marca != "todas"){
          products = products.filter(product=> product.marca.toLowerCase().indexOf(req.query.marca.toLowerCase())> -1)
        }
        if(req.query && req.query.category && req.query.category != "todas"){
          products = products.filter(product=> product.category.toLowerCase().indexOf(req.query.category.toLowerCase())> -1)
        }
        if (req.query && req.query.price){
          if(req.query.price == "asc"){
            products.sort((a,b)=> a.price - b.price)
          } else{
            products.sort((a,b)=> b.price -a.price)
          }
        }
        return res.render("products/list",{
            title: "Nuestros Productos",
            styles: ["header","footer","list" ],
            products: products,
            marca:marcas,
            categorias: categorias()
        })
    },   
    categoria: (req,res)=> { //LISTO
        let cat = oneCat(parseInt(req.params.id))
        
        let productos = index()
         
        let pertenecen = productos.filter(e=>e.category.toLowerCase()== cat.name.toLowerCase())
          
          
        return res.render('products/categoria',{
            title:cat.name.toUpperCase(),
            styles:["header","footer", "categoria"],
            products: pertenecen,
            categoria:cat
        })
    },
    detail:(req,res)=>{ //LISTO
        let product = one(parseInt(req.params.id))
        if(!product){
        return res.redirect('/')
        }
        return res.render("products/detail",{
            title:product.name.toUpperCase(),
            styles:["header","footer", "productDetail"],
            product:product
        })
    }, 
    create: (req,res)=> { //LISTO
        return res.render("products/create",{
            title:"Crear Producto",
            styles:["header","footer", "forms"]
        })
    },
    created: (req,res)=> {// LISTO
      let validaciones = validationResult(req)
      let { errors } = validaciones
      if (errors && errors.length > 0) {

          return res.render('products/create', {
              title: 'Crear Producto',
              styles: ["header","footer", "forms"],
              oldData: req.body,
              errors:validaciones.mapped()
          });
      }
        req.body.image = req.files.map(f=> f.filename);
        let newProduct = create(req.body)
        let products = index()
        products.push(newProduct)
        write(products)
        return res.redirect("/products/")
    },
    edit:(req, res)=>{ //LISTO
        let product = one(parseInt(req.params.id))
        if(!product){
          return res.redirect('/products/')
        }
        return res.render('products/edit', {
          title: "Editar el producto",
          product: product,
          styles: [
            "header",
            "footer",
            "forms"
          ]
        })
    },
    edited:(req, res)=>{
        let product = one(parseInt(req.params.id))
        let products = index()
        console.log(req.body)
        let productsEdited = products.map(p=>{
            if(p.id == product.id){
                p.name = req.body.name
                p.category = req.body.category
                p.marca = req.body.marca
                p.peso = parseFloat(req.body.peso)
                p.price = parseFloat(req.body.price)
                p.description = req.body.description
                p.descuento= req.body.descuento
                p.destacado = req.body.destacado == "si"? true:false
                if(req.files && req.files.length > 0){
                  product.image.forEach(img=>{
                    unlinkSync(join(__dirname, "../../public/images/", "products-images",img))
                  })
                  p.image = req.files.map(f=> f.filename)
                } else{
                  p.image  = product.image
                }
            }
            return p
        })
        write(productsEdited)
        return res.redirect("/products/detail/"+ product.id)
    },
    destroy: (req, res)=>{
        let product = one(parseInt(req.params.id))
        if(!product){
          return res.redirect("/products/")
        }
        product.image.forEach(img => {
          unlinkSync(join(__dirname, "../../public/images/", "products-images",img))
        })
        
        let products = index()
        let productsDeleted = products.filter(p=>p.id !== product.id)
        write(productsDeleted)
        return res.redirect("/products/")
      }
    
    //edited
    //destroy
}
module.exports=controller;