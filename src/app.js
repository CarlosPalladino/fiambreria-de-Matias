const {resolve} = require('path');
const express = require('express');
const {port, callback} = require("./modules/port")
const public = require ("./modules/public")
const app = express();
const method = require("method-override")
const session = require("express-session")
const cookieParser = require("cookie-parser")


/// app.use ///
//public y port
app.listen(port, callback)
app.use(public)

app.set ("view engine", "ejs");
app.set('views', resolve(__dirname, 'views'));

app.use(method("m"))
app.use(session({
    secret: "nodejs", 
    saveUninitialized: true,
    resave: true
}))
app.use(cookieParser())



//RUTAS
app.use(require("./routes/main.routes"))
app.use("/products",require("./routes/product.routes"))




 


 