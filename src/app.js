const path = require('path');
const express = require('express');
const app = express();  
const public = path.resolve(__dirname, '../public');
 app.listen(2000,() => {console.log('el server esta en funcionamiento')});
 app.get('/', (req, res) => res.sendFile (__dirname + '/views/index.html'));
 app.use(express.static(public)); 