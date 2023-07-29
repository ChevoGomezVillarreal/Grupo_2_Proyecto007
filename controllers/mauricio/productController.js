const express = require('express');
const fs = require("fs");
const path = require('path');

productController = {

    getById: (req, res) => {
        let idProducto = parseInt(req.params.id);
        let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../database/productos.json")));

        let producto = productos.find((producto) => {
            return producto.id === idProducto ? true : false;
        });

        //console.log(producto);

        //res.render(path.resolve(__dirname,"../views/admin/administrar.ejs"), {motos: motos});
        console.log("Renderizando vista de edicion de productos");
        res.render("productEdit", { producto });

    },
    
    update: (req, res) => {

        let idProducto = parseInt(req.params.id);
        console.log("Actualizacion del producto -> Id obtenido del producto -> " + idProducto);
        let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../database/productos.json")));

        let producto = productos.find((p) => {
            return p.id === idProducto ? true : false;
        });

        console.log("Nombre de producto obtenido para la actualizacion: " + req.body.name);
        console.log("Descripcion de producto obtenido para la actualizacion: " + req.body.description.trim());        
        //obtenemos la imagen y la adicinamos tambien al request. Se hace if en caso de que la imagen no sea
        //actualizada y por lo tanto no se cargue nada.
        let prodImage = req.file ? req.file.filename : req.body.oldImage;
        console.log("Valor de req.body.imagen = " + req.body.imagen);
        //TOoDo adicional validaciones        
        producto.name = req.body.name;
        producto.description = req.body.description.trim();
        producto.price = req.body.price;
        producto.image = prodImage;//req.body.imagen;       

       
        //Escribir en el archivo JSON
        let archivoProductosActualizado = JSON.stringify(productos, null, 2);
        //console.log(archivoProductosActualizado);
        fs.writeFileSync(path.resolve(__dirname, "../../database/productos.json"), archivoProductosActualizado);
        
        console.log("Producto actualizado correctamente.");
        //res.render("productEdit", { producto });
        //ToDo redireccionar a la vista de listado de productos
        res.redirect("/");

    },
    delete: (req, res) => {
        let idProducto = parseInt(req.params.id);
        console.log("Eliminacion de producto -> Id obtenido del producto -> " + idProducto);
        let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../database/productos.json")));

        let producto = productos.find((p) => {
            return p.id === idProducto ? true : false;
        });

        console.log('ID del Producto a borrar: ' + JSON.stringify(producto));

        let indexOfProductToRemove = productos.indexOf(producto);

        console.log('indexOfProductToRemove = ' + indexOfProductToRemove);

        let temp1 = {};

        if (indexOfProductToRemove !== -1) {
            //splice recibe el index como primer argumento y la cantidad de elementos que se elimina de ahi en adelante, en este caso
            //solo sera el producto identificado
            console.log('producto encontrado');
            temp1 = productos.splice(indexOfProductToRemove, 1);
        } else {
            console.log('Producto no encontrado');
        }

        console.log("temp1 = " + JSON.stringify(temp1));
        //Escribir en el archivo JSON
        let archivoProductosActualizado = JSON.stringify(productos, null, 2);
        //console.log(archivoProductosActualizado);
        fs.writeFileSync(path.resolve(__dirname, "../../database/productos.json"), archivoProductosActualizado);

        console.log("Producto elimiando correctamente.");
        res.redirect("/products");
    }
}


module.exports = productController; 