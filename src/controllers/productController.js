const {index, one, create, write}= require("../models/productsModel")
const {categorias} = require('../models/catsModel')
const controller={ 
    todasCategorias:(req,res)=> {  //HAY QUE REQUERIR DESDE CATEGORIAS EL MODELO
        return res.render('products/todasCategorias',{
            title :"Nuestros Productos",
            styles: ["header","footer", ],
            categorias: categorias()
        });
    },
    list: (req,res)=> { //LISTO
        let products = index();
        if(req.query && req.query.name){
          products = products.filter(product=> product.name.toLowerCase().indexOf(req.query.name.toLowerCase())> -1)
        }
        return res.render("products/list",{
            title: "Nuestros Productos",
            styles: ["header","footer" ],
            products: products
        })
    },   
    categoria: (req,res)=> { //LISTO
        let categoria = req.params.category;
        let productos = index()
        let pertenecen = productos.filter(element=>{
          if (element.category == categoria)
          return element
        })
        return res.render('products/categoria',{
            title: categoria.toUpperCase(),
            styles:["header","footer"],
            products: pertenecen
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
            styles:["header","footer","create"]
        })
    },
    created: (req,res)=> {// LISTO
        req.body.image = req.files[0].filename;
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
            "footer"
          ]
        })
    },
    edited:(req, res)=>{
        let product = one(parseInt(req.params.id))
        let products = index()
        let productsEdited = products.map(p=>{
            if(p.id == product.id){
                p.name = req.body.name
                p.description = req.body.description
                p.category = req.body.category
                p.price = parseInt(req.body.price)
                p.peso = parseInt(req.body.peso)
                p.destacado = req.body.destacado == "si"? true:false
                if(req.files && req.files.length > 0){
                    unlinkSync(join(__dirname, "../../public/images/", "products-images",p.image))
                    p.image = req.files[0].filename 
                  } else{
                    p.image = p.image
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
        unlinkSync(join(__dirname, "../../public/images/", "products-images",product.image))
        let products = index()
        let productsDeleted = products.filter(p=>p.id !== product.id)
        write(productsDeleted)
        return res.redirect("/products/")
      }
    
    //edited
    //destroy
}
module.exports=controller;