const {readFileSync,writeFileSync} = require('fs')
const { resolve } = require('path')
const model ={
    categorias: function(){
        let cats = resolve(__dirname,"../data","categorias.json")
        let data = readFileSync(cats);
        return JSON.parse(data)
    }}
    module.exports= model