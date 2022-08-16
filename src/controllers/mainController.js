const controller={ 
    index:(req,res)=> { 
        return res.render('index',{
            title :"Las marias",
            styles: ["index", ]
        });


},
contacto: (req,res)=> {
    return res.render('contacto',{
        title: "Contactanos"})
}
}
module.exports=controller;
