const express = require('express');
const fs = require('fs');
const { validationResult } = require('express-validator');
const path = require('path');
let bcrypt = require("bcryptjs");

const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');


//Aqui tienen otra forma de llamar a cada uno de los modelos
const Usuarios = db.Usuario;
//const Genres = db.Genre;
//const Actors = db.Actor;


const usersController = {
    //seccion para registrar nuevos usuarios - mostrar la vista
    register: function(req,res) {
        if(req.session.usuarioLogueado) {
            return res.render('profile', {userData: req.session.usuarioLogueado});
        } else {
            return res.render('register');
        }
    },
    //seccion para registrar nuevos usuarios - procesar el registro cuando dan click a REGISTRAR
    processRegister: function(req,res) {
        let errors = validationResult(req);

        //console.log(JSON.stringify(errors,null,4) );
        console.log('DATOS ORIGINALES DEL FORMULARIO');
        console.log('nombre = ' + req.body.nombre);
        console.log('apellido = ' + req.body.apellido);
        console.log('usuario = ' + req.body.usuario);
        console.log('email = ' + req.body.email);
        console.log('fecha de nacimiento = ' + req.body.nacimiento);
        console.log('domicilio = ' + req.body.domicilio);
        console.log('pais value = ' + req.body.pais);
        console.log('pais texto = ' + req.body.pais_nombre);
        console.log('pais index = ' + req.body.pais_index);
        console.log('DOM completo = ' + JSON.stringify(req.body));
        //return;
 
        let usuarioARegistrar = {
            ID:0,
            NOMBRE: req.body.nombre,
            APELLIDO: req.body.apellido,
            USUARIO: req.body.usuario,
            EMAIL: req.body.email,
            DOMICILIO: req.body.domicilio,
            PAIS: req.body.pais_nombre,  
            PAIS_NOMBRE: req.body.pais_nombre,
            PAIS_INDEX: req.body.pais_index,
            FECHA_NACIMIENTO: req.body.nacimiento,                     
            CATEGORIA: "general"
        };
        let passOriginal = bcrypt.hashSync(req.body.pass1, 10);
        let passControl = bcrypt.hashSync(req.body.pass2, 10);
        usuarioARegistrar.password1 = passOriginal;
        usuarioARegistrar.password2 = passControl;

        //Checo si hay errores de validacion de los datos entrantes
        if (errors.isEmpty()){
            //NO hay errores y continuo adelante
            console.log('NO hay errores');
            console.log('EMAIL = ' + req.body.email);
        } else {
            //SI hay errores, redirijo al usuario a la vista register con la
            //lista de errores y hago return para salirme de este proceso
            console.log('Hay errores al registrar nuevo usuario');
            console.log(JSON.stringify(errors,null,4));
            console.log(JSON.stringify(usuarioARegistrar,null,4));
            return res.render('register', {errors: errors.errors, oldData: usuarioARegistrar});
        }

        //Buscar en la base de datos si ya hay un usuario con este email
        db.Usuario.findOne({
            where:{
                EMAIL: req.body.email
            }
        })
            .then(resUsuarios => {

                if(resUsuarios != undefined){
                    //Si el usuario ya existe le envio un mensaje al usuario
                    //en la vista register y hago return para salirme del proceso
                    console.log('Usuario ya existe en bd');
                    return res.render('register', {errors:[
                        {msg: 'Este correo ya esta registrado'}
                    ], oldData: usuarioARegistrar});
                } else {
                    console.log('Usuario inexistente');
                    
                    console.log('Entre a registrar al usuario nuevo');
                    //Si no hay errores de validacion
                    //y si no existe previamente el correo electronico,
                    //Entonces lo creo en la base de datos
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
            })  
    },    

    //seccion para hacer login - mostrar la vista
    login: function(req,res) {
        
        if(req.session.usuarioLogueado) {
        //if(req.cookies.recordar) {
            return res.render('profile', {userData: req.session.usuarioLogueado});
        } else {
            return res.render('login');
        }        
    },
    //seccion para hacer login - cuando el usuario da click en LOGIN
    processLogin: function(req,res) {
        console.log('INICIO---de ProcessLogin');
        let errors = validationResult(req);
        

        //Checo si hay errores de validacion
        if (errors.isEmpty()){
            //Si no hay errores continuo
            console.log('email = ' + req.body.email);

        } else {
            //Si SI hay errores le envio la descripcion del error
            //al usuario y hago return para salirme de este proceso
            console.log('Entre a errores al ahcer processLogin');
            return res.render('login', {errors: errors.errors});
        }

        //Declaro la variable donde voy a poner los datos encontrados
        let usuarioALoguearse;
        
        //Busco al usuario por email
        db.Usuario.findOne({
            //include: ['genre']
            where:{
                EMAIL: req.body.email
            }
        })
            .then((resUsuarios) => {

                if(resUsuarios != undefined ){
                    //Si SI encuentro al usuario asigno el valor de lo encontrado en resUsuarios
                    //a la variable usuarioALoguearse
                    /*
                    console.log('usuario si existe: ' + JSON.stringify(resUsuarios));
                    console.log('1 email = ' + resUsuarios.EMAIL);
                    console.log('1 usuario = ' + resUsuarios.USUARIO);
                    console.log('1 nombre = ' + resUsuarios.NOMBRE);                        
                    */
                    //usuarioALoguearse = JSON.stringify(resUsuarios);
                    usuarioALoguearse = resUsuarios;
                    
                } else {
                    //Si no encuentro al usuario en la base de datos llamo a users/profile 
                    //le doy el me nsaje de error al usuario y
                    //me salgo del proceso
                    console.log('Usuario inexistente');
                    return res.redirect('/users/profile');
                }

                console.log('usuarioALoguearse = ' + JSON.stringify(usuarioALoguearse));
                //usuarioALoguearse = JSON.parse(usuarioALoguearse);
                if(usuarioALoguearse == undefined){
                    console.log('Entre a usuario o contrasena invalidos');
                    return res.render('login', { errors:[
                        {msg: 'Usuario o contrasena inválidos'}
                    ]})
                } else {
                    console.log('Usuario si esta definido');
                    /*
                    console.log('2 email = ' + usuarioALoguearse.EMAIL);
                    console.log('2 usuario = ' + usuarioALoguearse.USUARIO);
                    console.log('2 nombre = ' + usuarioALoguearse.NOMBRE);
                    */
                }

                req.session.usuarioLogueado = JSON.stringify(usuarioALoguearse);
                console.log('req.session.usuarioLogueado = ' + req.session.usuarioLogueado);
                req.session.usuarioLogueado = JSON.parse(req.session.usuarioLogueado);
                /*
                console.log('3 user ID = ' + req.session.usuarioLogueado.ID);
                console.log('3 session email = ' + req.session.usuarioLogueado.EMAIL);
                console.log('3 session usuario = ' + req.session.usuarioLogueado.USUARIO);
                console.log('3 session nombre = ' + req.session.usuarioLogueado.NOMBRE);
                */

                if (req.body.recordar != undefined) {
                    res.cookie('recordar', req.session.usuarioLogueado.EMAIL, {maxAge: 600000});
                    console.log('Cookie recordar = ' + req.cookies.recordar);
                    console.log('El usuario SI sera recordado');
                } else {
                    console.log('El usuario no quiere ser recordado');
                }

                res.redirect('/users/profile');
            })

    },

    getProfile: function(req,res) {
        console.log('Etnre a getProfile');
        res.render('profile',{userData: req.session.usuarioLogueado})
    },

    editProfile: function(req,res) {
        res.render('registerEdit',{oldData: req.session.usuarioLogueado})
    },

    processRegisterEdit: function(req,res) {
        let errors = validationResult(req);

        //console.log(JSON.stringify(errors,null,4) );
        console.log('DATOS ORIGINALES DEL FORMULARIO');
        console.log('nombre = ' + req.body.nombre);
        console.log('apellido = ' + req.body.apellido);
        console.log('usuario = ' + req.body.usuario);
        console.log('email = ' + req.body.email);
        console.log('fecha de nacimiento = ' + req.body.nacimiento);
        console.log('domicilio = ' + req.body.domicilio);
        console.log('pais value = ' + req.body.pais);
        console.log('pais texto = ' + req.body.pais_nombre);
        console.log('pais index = ' + req.body.pais_index);
        console.log('DOM completo = ' + JSON.stringify(req.body));
        //return;
 
        let usuarioARegistrar = {
            ID:0,
            NOMBRE: req.body.nombre,
            APELLIDO: req.body.apellido,
            USUARIO: req.body.usuario,
            EMAIL: req.body.email,
            DOMICILIO: req.body.domicilio,
            PAIS: req.body.pais_nombre,  
            PAIS_NOMBRE: req.body.pais_nombre,
            PAIS_INDEX: req.body.pais_index,
            FECHA_NACIMIENTO: req.body.nacimiento,                     
            CATEGORIA: "general"
        };

        //No se actualizan los passwords aqui
        /*
        let passOriginal = bcrypt.hashSync(req.body.pass1, 10);
        let passControl = bcrypt.hashSync(req.body.pass2, 10);
        usuarioARegistrar.password1 = passOriginal;
        usuarioARegistrar.password2 = passControl;
        */

        //Checo si hay errores de validacion de los datos entrantes
        if (errors.isEmpty()){
            //NO hay errores y continuo adelante
            console.log('NO hay errores');
            console.log('EMAIL = ' + req.body.email);
        } else {
            //SI hay errores, redirijo al usuario a la vista register con la
            //lista de errores y hago return para salirme de este proceso
            console.log('Hay errores al registrar nuevo usuario');
            console.log(JSON.stringify(errors,null,4));
            console.log(JSON.stringify(usuarioARegistrar,null,4));
            return res.render('registerEdit', {errors: errors.errors, oldData: usuarioARegistrar});
        }

        //Buscar en la base de datos si ya hay un usuario con este email
        db.Usuario.update(
            {
                NOMBRE: req.body.nombre,
                APELLIDO: req.body.apellido,
                //Ni el usuario ni el email se pueden modificar
                //USUARIO: req.body.usuario,
                //EMAIL: req.body.email,
                FECHA_NACIMIENTO: req.body.nacimiento,
                DOMICILIO: req.body.domicilio,
                PAIS: req.body.pais_nombre,               
            },
            {
                where:{EMAIL: req.body.email}
            }
        )
            .then(resUsuarios => {
                
                req.session.usuarioLogueado = usuarioARegistrar;
                return res.redirect('/users/profile')
                    
            })
            .catch(error => res.send(error))
    },      
    
    logout: function(req,res) {
        res.clearCookie('recordar');
        req.session.destroy();
        return res.redirect('/');
        /*
        req.session.destroy(function (err) {
          res.redirect('/'); //Inside a callback… bulletproof!
         })
         */
    }
};

module.exports = usersController;