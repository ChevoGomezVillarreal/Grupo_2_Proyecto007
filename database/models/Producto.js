module.exports = (sequelize,dataTypes)=>{
    let alias = "Producto";
    let cols = {
        ID:{
            type: dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        NOMBRE: {
            type: dataTypes.STRING
        },
        DESCRIPCION: {
            type: dataTypes.STRING
        },
        IMAGEN: {
            type: dataTypes.STRING
        },
        PRECIO: {
            type: dataTypes.FLOAT
        }             

    };

    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    };

    const Producto = sequelize.define(alias,cols,config);

    return Producto;
}