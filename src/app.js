const path = require('path');

const express = require('express');

const { application } = require('express');

const app = express();  

const mainRoutes= require('./routes/mainRoutes')

const public = path.resolve(__dirname, '../public');

/// app.use ///

 app.listen(2000,() => {console.log('el server esta en funcionamiento')});

 app.use('/index', mainRoutes);
 app.use(require('./routes/mainRoutes'))


 app.use(express.static(public)); 

 app.get("/contacto", (req,res) => res.sendFile(path.resolve(__dirname, './views/contacto.ejs')));

 app.set ("view engine", "ejs");
 
 app.set('views', path.join(__dirname, 'views'));

 