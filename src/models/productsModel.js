const {readFileSync,writeFileSync, fdatasync} = require('fs')
const { resolve } = require('path')
const model ={
    index: function(){
        let prods = resolve(__dirname,"../data","products.json")
        let data = readFileSync(prods)
        return JSON.parse(data)
    },
    one:function(id){
        let file = resolve(__dirname,'../data','products.json');
        let data = readFileSync(file, {encoding: "utf-8"});
        let products = JSON.parse(data);
        return products.find(product => product.id === id)
    },
    create:function(data){
        let file = resolve(__dirname,"../data","products.json")
        let datosViejos = readFileSync(file,{encoding: "utf-8"});
        let products = JSON.parse(datosViejos);
        let last = products[products.length-1]
        return Object({
            id:products.length == 0 ? 1 : last.id + 1,
            name: data.name,
            category: data.category,
            marca:data.marca,
            peso:parseFloat(data.peso),
            price: parseFloat(data.price),
            description: data.description,
            descuento:data.descuento,
            destacado: data.destacado == "si"? true : false,
            image: data.image
        })
    },
    write:function(data){
        let file = resolve(__dirname,"../data","products.json");
        let info = JSON.stringify(data, null,2);
        return writeFileSync(file,info); 
    }
}

module.exports = model