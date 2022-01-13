const { DataTypes } = require("Sequelize");

module.exports = (sequelize) => {

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: DataTypes.STRING,
    }

    const Category = sequelize.define("Categories", cols,
        {
        tableName: "category",
        timestamps: false,
        }
    );

    Category.associate = function (models) {
        Category.hasMany(models.Notes, {
          as: "notes",
          foreignKey: "categoryId",
        });
    };

    return Category;
};