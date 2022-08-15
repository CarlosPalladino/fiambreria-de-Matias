const path = require('path');
const express = require('express');
const { application } = require('express');
const app = express();  
const public = path.resolve(__dirname, '../public');
/// app.use ///
 app.listen(2000,() => {console.log('el server esta en funcionamiento')});

 app.get('/', (req, res) => res.sendFile (__dirname + '/views/index.html'));


 app.use(express.static(public)); 

 app.get("/contacto", (req,res) => res.sendFile(path.resolve(__dirname, './views/contacto.html')));
