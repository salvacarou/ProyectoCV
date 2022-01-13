const { DataTypes } = require("Sequelize");

// Si agregamos o borramos columnas de la base de datos, recien
// ahí es cuando tenemos que venir aca a modificar algo.

module.exports = (sequelize) => {

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        fullName: DataTypes.STRING,
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        birthdate: DataTypes.DATE,
        password: DataTypes.STRING,
        deleted: DataTypes.TINYINT,
        image: DataTypes.STRING

    }

    const User = sequelize.define("Users", cols,
        {
        tableName: "users",
        timestamps: false,
        }
    );

    // User.associate = function (models){
    //     User.belongsToMany(models.N, {
    //         as: "notes", 
    //         through: "product_user_fav",
    //         foreignKey: "userId",
    //         otherKey: "productId",
    //         timestamps: false
    //     })
    //     User.associate = function (models) {
    //         User.hasMany(models.Carts, {
    //           as: "cart",
    //           foreignKey: "userId",
    //         });
    //     }; 
    //     // EN EL CONTROLADOR ESCRIBIR ESTO PARA LLAMAR ^^
    //     // db.Usurs.findAll({
    //     //     include: [{association:"cart"}]
    //     // })

    //     User.hasOne(models.Roles, {
    //         as: "role",
    //         foreignKey: "rolesId",
    //     });

    // }

    return User;
};
