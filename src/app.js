const path = require('path');

const express = require('express');

const { application } = require('express');

const app = express();  

const mainRoutes= require('./routes/main.routes')

const public = path.resolve(__dirname, '../public');

/// app.use ///

 app.listen(2000,() => {console.log('el server esta en funcionamiento')});

 app.use('/index', mainRoutes);
 app.use(require('./routes/main.routes'))


 app.use(express.static(public)); 

 

 app.set ("view engine", "ejs");
 
 app.set('views', path.join(__dirname, 'views'));

 