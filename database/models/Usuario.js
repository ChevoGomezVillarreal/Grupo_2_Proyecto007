module.exports = (sequelize,dataTypes)=>{
    let alias = "Usuario";
    let cols = {
        ID:{
            type: dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        NOMBRE: {
            type: dataTypes.STRING
        },
        APELLIDO: {
            type: dataTypes.STRING
        },
        USUARIO: {
            type: dataTypes.STRING
        },
        EMAIL: {
            type: dataTypes.STRING
        },        
        FECHA_NACIMIENTO: {
            type: dataTypes.DATE 
        },
        DOMICILIO: {
            type: dataTypes.STRING
        },
        PAIS: {
            type: dataTypes.STRING
        },
        PASSWORD1: {
            type: dataTypes.STRING
        },
        PASSWORD2: {
            type: dataTypes.STRING
        },
        CATEGORIA: {
            type: dataTypes.STRING
        }
    };

    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    };

    const Usuario = sequelize.define(alias,cols,config);

    return Usuario;
}