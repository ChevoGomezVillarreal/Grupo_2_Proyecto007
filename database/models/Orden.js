module.exports = (sequelize,dataTypes)=>{
    let alias = "Orden";
    let cols = {
        id_orden:{
            type: dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        id_cliente: {
            type: dataTypes.INTEGER
        },
        total: {
            type: dataTypes.INTEGER
        },
        tipo_operacion: {
            type: dataTypes.STRING
        },
        email_cliente: {
            type: dataTypes.STRING
        },             
        sub_total: {
            type: dataTypes.INTEGER
        },
        impuestos: {
            type: dataTypes.INTEGER
        },  
        nombre_cliente: {
            type: dataTypes.STRING
        },  
        apellido_cliente: {
            type: dataTypes.STRING
        },   
        domicilio: {
            type: dataTypes.STRING
        },  
        usuario_cliente: {
            type: dataTypes.STRING
        },  
        pais: {
            type: dataTypes.STRING
        }                                             
    };

    let config = {
        tableName:'ordenes',
        timeStamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    };

    const Orden = sequelize.define(alias,cols,config);

    Orden.associate = function(models){
        
        Orden.belongsTo(models.Ordenarticulo, { // models.Genre -> Genres es el valor de alias en genres.js
            as: "articulos",
            foreignKey: "id_orden"
        })
        

        /*
        Orden.belongsToMany(models.Ordenarticulo, { // models.Actor -> Actors es el valor de alias en actor.js
            as: "articulos",
            through: 'actor_movie',
            foreignKey: 'movie_id',
            otherKey: 'actor_id',
            timestamps: false
        })
        */       
    }

    return Orden;
}