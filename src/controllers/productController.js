const {index, one, create, write}= require("../models/productsModel")
const {categorias, oneCat} = require('../models/catsModel')
const controller={ 
    todasCategorias:(req,res)=> {  //HAY QUE REQUERIR DESDE CATEGORIAS EL MODELO
        return res.render('products/todasCategorias',{
            title :"Nuestros Productos",
            styles: ["header","footer","todasCategorias" ],
            categorias: categorias()
        });
    },
    list: (req,res)=> { //LISTO
        let productss = index();
        if(req.query && req.query.name){
          products = productss.filter(product=> product.name.toLowerCase().indexOf(req.query.name.toLowerCase())> -1)
        }
        return res.render("products/list",{
            title: "Nuestros Productos",
            styles: ["header","footer" ],
            products: products
        })
    },   
    categoria: (req,res)=> { //LISTO
        let cat = oneCat(parseInt(req.params.id))
        
        let productos = index()
         
        let pertenecen = productos.filter(e=>e.category.toLowerCase()== cat.name.toLowerCase())
          console.log(cat)
          console.log(productos)
          console.log(pertenecen)
          
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