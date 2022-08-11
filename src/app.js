const path = require('path');
const express = require('express');
const app = express();  
 app.listen(2000,() => {console.log('el server esta en funcionamiento')});
 app.get('/', (req, res) => res.sendFile (__dirname + '/views/index.html'));