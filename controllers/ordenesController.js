const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');

module.exports = {

    //seccion para registrar nuevas ordenes de compra
    saveNew: function(req,res) {

        console.log('Nombre de producto = ' + req.body['producto-nombre-1']);
        console.log('Body = ' + JSON.stringify(req.body,null,4));
        //console.log('ID del 1er articulo = ' + req.body.);
        //return res.json({requestBody: req.body});

        db.Orden
        .create(
            {
                id_cliente: req.body['orden-id-cliente'],
                total: req.body['inputtotaldeorden'],
                tipo_operacion: req.body['orden-tipo-operacion'],
                email_cliente: req.body['orden-email-cliente'],
                sub_total: req.body['orden-sub-total'],
                impuestos: req.body['orden-impuestos'],
                nombre_cliente: req.body['orden-nombre-cliente'],
                apellido_cliente: req.body['orden-apellido-cliente'],
                domicilio: req.body['orden-domicilio'],
                usuario_cliente: req.body['orden-usuario'],
                pais: req.body['orden-pais'],             
            }
        )
            .then((data2)=> {
                let cantArticulos = req.body['articulos-totales'];
                let articulo;
                let articuloString;
                let articuloJson;
                let arrayArticulos=[];
                for(i=1; i <= cantArticulos ; i++) {
                    articulo = {
                        /*id_orden: req.body['orden-id-cliente'],*/
                        num_articulo: i,
                        id_articulo: req.body['producto-id-' + i],
                        producto_nombre: req.body['producto-nombre-' + i],
                        producto_descripcion: req.body['producto-descripcion-' + i],
                        cantidad: req.body['producto-cantidad-' + i],
                        precio: req.body['producto-precio-' + i],
                        total: req.body['orden-id-cliente'],
                    };
                    articuloString = JSON.stringify(articulo);
                    console.log('articuloString ' + i + ' = ' + articuloString);
                    articuloJson = JSON.parse(articuloString);
                    console.log('articulo convertido' + i + ' = ' + JSON.stringify(articuloJson,null,4));
                    arrayArticulos.push(articulo);

                }
                console.log('array = ' + JSON.stringify(arrayArticulos,null,4));
                
                
                db.Ordenarticulo
                .bulkCreate(
                    arrayArticulos
                )
                    .then((x)=>{
                        return res.send('Operacion registrada');
                    })
                    .catch(error => res.send(error))
                


                

            })            
            .catch(error => res.send(error))                       
                
              
    }
}

//module.exports = ordenesController;