const fs = require('fs');
const path =require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");



function recordarMiddleware(req,res,next) {
    //console.log('Cookie stringify = ' + req.cookies.recordar);
    //console.log('req.session.usuarioLogueado = ' + JSON.stringify(req.session.usuarioLogueado,null,4));
    //next();
    if (req.cookies.recordar != undefined && req.session.usuarioLogueado == undefined) {
        //console.log('Entre a req.cookies.recordar SI definido, pero req.session.usuario NO definido');
        //console.log('El usuario no esta definido, voy a buscarlo');
        /*
        let usersJSON = fs.readFileSync(path.resolve(__dirname, '../database/usuarios.json'));
        let users;
        if(usersJSON==""){
            users=[]
        } else {
            users = JSON.parse(usersJSON);
        }

        
        
        for (let i=0; i < users.length; i++){
            if(users[i].email==req.cookies.recordar){
                usuarioALoguearse = users[i];
                
                break;
            }
        } 
        */
        
        let usuarioALoguearse;

        db.Usuario.findOne({
            //include: ['genre']
            where:{
                EMAIL: req.cookies.recordar
            }
        })
            .then((resUsuarios) => {

                if(resUsuarios != undefined ){
                    //Si SI encuentro al usuario asigno el valor de lo encontrado en resUsuarios
                    //a la variable usuarioALoguearse
                    //console.log('usuario si existe: ' + JSON.stringify(resUsuarios,null,4));
                    //console.log('1 email = ' + resUsuarios.EMAIL);
                    //console.log('1 usuario = ' + resUsuarios.USUARIO);
                    //console.log('1 nombre = ' + resUsuarios.NOMBRE);                        
                    usuarioALoguearse = resUsuarios;
                    //console.log('Si hay cookie, usuario:');
                    //console.log('json stringify = ' + JSON.stringify(resUsuarios));
                    //return JSON.stringify(resUsuarios);
                    //console.log('temp email = ' + usuarioALoguearse.EMAIL);
                    //console.log('temp usuario = ' + usuarioALoguearse.USUARIO);
                    //console.log('temp nombre = ' + usuarioALoguearse.NOMBRE);         
                    req.session.usuarioLogueado = usuarioALoguearse;
                    next();
                } else {
                    //Si no encuentro al usuario en la base de datos llamo a users/profile 
                    //le doy el me nsaje de error al usuario y
                    //me salgo del proceso
                    //console.log('Usuario inexistente');
                    return res.redirect('/users/profile');
                }

            })

            
    } else {
        //console.log('Entre a req.cookies.recordar NO definido o req.session.usuario SI definido');
        if (req.cookies.recordar != undefined) {
            //console.log('Cookie = ' + req.cookies.recordar);
            
        } else {
            //console.log('No hay cookie');
            //res.redirect('/');
        }
        next();
        /*
        if (req.session.usuarioLogueado != undefined) {
            console.log(JSON.stringify(req.session.usuarioLogueado,null,4));
        } else {
            console.log('usuarioLogueado undefined');
        }
        */
    }
}


function findUser(req,res) {

        //console.log('INICIO---de finduser');

        //Declaro la variable donde voy a poner los datos encontrados
        
        //Busco al usuario por email
        //console.log('Estoy buscando el email = ' + req.cookies.recordar)
        db.Usuario.findOne({
            //include: ['genre']
            where:{
                EMAIL: req.cookies.recordar
            }
        })
            .then((resUsuarios) => {

                if(resUsuarios != undefined ){
                    //Si SI encuentro al usuario asigno el valor de lo encontrado en resUsuarios
                    //a la variable usuarioALoguearse
                    /*
                    console.log('usuario si existe: ' + JSON.stringify(resUsuarios,null,4));
                    console.log('1 email = ' + resUsuarios.EMAIL);
                    console.log('1 usuario = ' + resUsuarios.USUARIO);
                    console.log('1 nombre = ' + resUsuarios.NOMBRE);                        
                    */
                    //usuarioALoguearse = JSON.stringify(resUsuarios);
                    //console.log('json stringify = ' + JSON.stringify(resUsuarios));
                    //return JSON.stringify(resUsuarios);
                    return resUsuarios;
                } else {
                    //Si no encuentro al usuario en la base de datos llamo a users/profile 
                    //le doy el me nsaje de error al usuario y
                    //me salgo del proceso
                    //console.log('Usuario inexistente');
                    return res.redirect('/users/profile');
                }

            })

}


module.exports = recordarMiddleware;