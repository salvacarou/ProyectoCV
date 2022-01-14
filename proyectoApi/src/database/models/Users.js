const { DataTypes } = require("Sequelize");

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

    User.associate = function (models) {
        User.hasMany(models.Notes, {
          as: "notes",
          foreignKey: "userId",
        });
    }

    return User;
};
