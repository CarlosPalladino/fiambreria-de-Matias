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

app.set('views', resolve(__dirname, 'views'));
app.set ("view engine", "ejs");

app.use(method("m"))
app.use(session({
    secret: "nodejs", 
    saveUninitialized: true,
    resave: true
}))
app.use(cookieParser())

//FALTA EL RECORDAME Y EL MIDDLEWARE DEL USER



//RUTAS
app.use(require("./routes/main.routes"))
app.use("/products",require("./routes/product.routes"))
app.use ("/users",require("./routes/user.routes"))




 


 