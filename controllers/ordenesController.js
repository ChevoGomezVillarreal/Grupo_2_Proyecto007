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
        return res.json({requestBody: req.body});

        db.Usuario
        .create(
            {
                NOMBRE: req.body.nombre,
                APELLIDO: req.body.apellido,
                USUARIO: req.body.usuario,
                EMAIL: req.body.email,
                FECHA_NACIMIENTO: req.body.nacimiento,
                DOMICILIO: req.body.domicilio,
                PAIS: req.body.pais_nombre,   
                PASSWORD1: passOriginal,
                PASSWORD2: passControl,        
                CATEGORIA: "general"             
            }
        )
            .then((data2)=> {
                //No estoy seguro si ya desde aqui hay que asignarle sesion al nuevo usuario
                req.session.usuarioLogueado = usuarioARegistrar;
                return res.redirect('/users/profile')
            })            
            .catch(error => res.send(error))                       
                
              
    }
}

//module.exports = ordenesController;