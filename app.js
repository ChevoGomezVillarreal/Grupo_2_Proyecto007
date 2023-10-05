const express = require("express");
const app = express();
const path = require("path");
let session = require('express-session');
let bcrypt = require("bcryptjs");
/* Importamos method-override para poder usar acciones PUT y DELETE desde los formularios HTML */
const methodOverride = require("method-override");
const cookie = require('cookie-parser');
const recordarMiddleware = require('./middlewares/recordarMiddleware');

const publicPath = path.resolve(__dirname, "./public");
/*Seccion app.use*/
app.use(express.static(publicPath));
//Configuracion para procesamiento de envios POST
app.use(express.json());
//Uso de method-override dentro de esta aplicacion
app.use(methodOverride("_method"));
//URL encode  - Para que nos pueda llegar la información desde el formulario al req.body
app.use(express.urlencoded({ extended: false }));
//Indicamos que el template-engine a usar es ejs
app.set('view engine','ejs');
//Indicacion del uso de la session
app.use(session({secret: "Es un secreto"}));
//Las cookies
app.use(cookie());
//Recordar la cookies y reabrir session
app.use(recordarMiddleware);


//Requerir las rutas
const rutasProductos = require('./routes/productos');
const rutasUsuarios = require('./routes/usuarios');
const rutasOrdenes = require('./routes/ordenes');
const rutasMain = require("./routes/main");
const cookieParser = require("cookie-parser");


//Para usar las rutas
app.use(rutasMain);
app.use(rutasProductos);
app.use(rutasUsuarios);
app.use(rutasOrdenes);


app.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000");
    console.log("Folder Path = " + publicPath);
});