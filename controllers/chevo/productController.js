const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');


//Aqui tienen otra forma de llamar a cada uno de los modelos
const Productos = db.Producto;
//const Genres = db.Genre;
//const Actors = db.Actor;

/*let motos = mainController.leerJSON("motos.json");
res.render(path.resolve(__dirname,"../views/admin/administrar.ejs"), {motos: motos});*/

module.exports = {
    
    index: (req, res)=>{
        /*
        let inventario = fs.readFileSync(path.resolve(__dirname,'../../database/productos.json'));
        inventario = JSON.parse(inventario);
        */
        console.log("Vista de listado de productos");
        let inventario = [];

        Productos.findAll()
            .then(productos => {
                //res.render('moviesList.ejs', {productos})

                console.log('Productos = ' + JSON.stringify(productos));
                console.log('Productos length = ' + productos.length);
                res.render(path.resolve(__dirname,"../../views/productIndex.ejs"), 
                {inventario: productos,
                userData: req.session.usuarioLogueado, 
                sessionId: req.sessionID
                }
                );
            })       


        /*
        let counter = 0;
        inventario.forEach(element => {
            counter++;
            console.log("Estoy imprimiendo un objeto. El ciclo es: " + counter);
            console.log("El ID es: " + element.id);
            console.log("El nombre es: " + element.name);
            console.log("La descripcion es: " + element.description);
            console.log("La imagen es: " + element.image);
            console.log("El precio es: " + element.price + "\n");
        });
        */
        //console.log(inventario);
        //res.render(path.resolve(__dirname,"../../views/productIndex.ejs"), {inventario});

    },

    create: (req, res) => {
        res.render(path.resolve(__dirname,"../../views/productCreate.ejs"));
     
    },

  

    savenew: (req,res) => {

  

        console.log('Entrando a save new');
        
        console.log('nombre = ' + req.body.nombre);
        console.log('descripcion = ' + req.body.descripcion);
        console.log('costo = ' + req.body.costo);
        console.log('Body = ' + JSON.stringify(req.body));
        let prodImage = req.file ? req.file.filename : req.body.oldImage;
        console.log("Valor de req.body.imagenProducto = " + req.body.imagenProducto);

        let newProd = {
            id: 100,
            name: req.body.nombre.trim(),
            description: req.body.descripcion.trim(),
            image: prodImage,
            price: Number(req.body.costo)
        };

        Productos
        .create(
            {
                /*
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                release_date: req.body.release_date,
                length: req.body.length,
                genre_id: req.body.genre_id
                */
                //ID: 100,
                NOMBRE: req.body.nombre.trim(),
                DESCRIPCION: req.body.descripcion.trim(),
                IMAGEN: prodImage,
                PRECIO: Number(req.body.costo)               
            }
        )
        .then(()=> {
            return res.redirect('/products')})            
        .catch(error => res.send(error))           
        
        //newProd = JSON.stringify(newProd);
        /*
        let inventario = fs.readFileSync(path.resolve(__dirname,'../../database/productos.json'));
        inventario = JSON.parse(inventario);
        
        let arrayOfIds = [];

        for (let i=0; i < inventario.length; i++) {
            arrayOfIds.push(inventario[i].id);
            //console.log('Valor de ID = ' + inventario[i].id);
        };

        counter = 0;
        arrayOfIds.forEach(element => {
            counter++;
            //console.log("arrayOfIds [" + counter + "] = " + element);
        });        

        let maxID = Math.max(...arrayOfIds);

        console.log('Maximo ID = ' + maxID);

        newProd.id = maxID + 1;
      
        inventario.push(newProd);
        inventario = JSON.stringify(inventario, null, 4);
        //console.log(inventario);
        fs.writeFileSync(path.resolve(__dirname,'../../database/productos.json'),inventario);
        //res.send('Producto agregado');
        inventario = JSON.parse(inventario);
        res.render(path.resolve(__dirname,"../../views/productIndex.ejs"), {inventario});
        */
    }
    
}