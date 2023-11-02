const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require("multer");
const { check, validationResult, body } = require('express-validator');

//const currentPath = path.resolve(__dirname,'../controllers/chevo/productController.js');
const currentPath = require('../controllers/chevo/productController.js');

const controllersAdminProdChevo = require('../controllers/chevo/productController.js');
//const productController = require(path.resolve(__dirname,'../controllers/mauricio/productController'));
const productController = require('../controllers/mauricio/productController.js');

const validaciones = [
    body('nombre').notEmpty().withMessage('El nombre no puede estar vacio'),
    body('descripcion').notEmpty().withMessage('El apellido no puede estar vacio'),
    body('costo').notEmpty().withMessage('El nombre de usuario no puede estar vacio')
];

//Uso de multer para almacenamiento de imagenes 
const multerDiskStorage = multer.diskStorage(
    //Objeto literal con dos funciones
    {
        destination: function (req, file, cb) {
            cb(null, path.resolve(__dirname,"../public/images/productos"));
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + path.extname(file.originalname));
        }
    }

);

//Variable que sirve como middleware para la carga con multer
const uploadFile = multer({ storage: multerDiskStorage });


/** Chevo **/
router.get('/products', controllersAdminProdChevo.index);
router.get('/products/crud', controllersAdminProdChevo.crud);
router.get('/products/create', controllersAdminProdChevo.create);
router.post('/products/savenew',  uploadFile.single("imagenProducto"), controllersAdminProdChevo.savenew);
//router.get('/products/:id', controllersAdminProdChevo.show);
//router.post('/products/create', controllersAdminProdChevo.save);
/** Mauricio **/
/* Ver los detalles de un producto especifico */
router.get('/products/:id', productController.details);
/* Entrega el formulario de edicion de productos */
router.get('/products/:id/edit', productController.getById);
/* Actualiza un producto especifico */
router.put('/products/:id', uploadFile.single("imagenProducto"), productController.update);
/* Borra un producto especifico */
router.delete('/products/:id', productController.delete);



module.exports = router;

/*
1. /products (GET)
Listado de productos
2. /products/create (GET)
Formulario de creación de productos
3. /products/:id (GET)
Detalle de un producto particular
4. /products (POST)
Acción de creación (a donde se envía el formulario)
5. /products/:id/edit (GET)
Formulario de edición de productos
6. /products/:id (PUT)
Acción de edición (a donde se envía el formulario):
7. /products/:id (DELETE)
Acción de borrado
*/


//Requerir las rutas
//const adminProductos = require('./routes/adminProductos');
//const adminUsuarios = require('./routes/adminUsuarios');
//const adminRoutes = require('./routes/admin');

//Para usar las rutas
//app.use(adminProductos);
//app.use(adminUsuarios);
//app.use(adminRoutes);

/*


*/