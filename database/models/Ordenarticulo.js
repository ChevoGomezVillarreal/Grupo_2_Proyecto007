module.exports = (sequelize,dataTypes)=>{
    let alias = "Ordenarticulo";
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        id_orden: {
            type: dataTypes.INTEGER
        },
        num_articulo: {
            type: dataTypes.INTEGER
        },
        id_articulo: {
            type: dataTypes.INTEGER
        },
        producto_nombre: {
            type: dataTypes.STRING
        },             
        producto_descripcion: {
            type: dataTypes.STRING
        },
        cantidad: {
            type: dataTypes.INTEGER
        },  
        precio: {
            type: dataTypes.INTEGER
        },  
        total: {
            type: dataTypes.INTEGER
        },
        session_id: {
            type: dataTypes.STRING
        },  
        orden_hora: {
            type: dataTypes.STRING
        }                                                   
    };

    let config = {
        tableName:'ordenes_articulos',
        timeStamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    };

    const Ordenarticulo = sequelize.define(alias,cols,config);

    Ordenarticulo.associate = function(models) {
        Ordenarticulo.hasMany(models.Orden, { // models.Movies -> Movie es el valor de alias en movie.js
            as: "ordenes", // El nombre del modelo pero en plural
            foreignKey: "id_orden"
        })
    }

    return Ordenarticulo;
}