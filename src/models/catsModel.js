const {readFileSync,writeFileSync} = require('fs')
const { resolve } = require('path')
const model ={
    categorias: function(){
        let cats = resolve(__dirname,"../data","categorias.json")
        let data = readFileSync(cats,  {encoding: "utf-8"});
        return JSON.parse(data)
    },
    oneCat: function(id){
        let file = resolve(__dirname,'../data','categorias.json');
        let data = readFileSync(file, {encoding: "utf-8"});
        let cats = JSON.parse(data);
        return cats.find(cate => cate.id === id)

    }
}
    module.exports= model