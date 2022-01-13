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

    return User;
};
