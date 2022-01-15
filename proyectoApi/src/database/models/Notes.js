const { DataTypes } = require("Sequelize");

module.exports = (sequelize) => {

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: DataTypes.STRING,
        image: DataTypes.STRING,
        text: DataTypes.STRING,
        deleted: DataTypes.TINYINT,
    }

    const Notes = sequelize.define("Notes", cols,
        {
        tableName: "notes",
        timestamps: false,
        }
    );

    Notes.associate = function (models) {

        Notes.belongsTo(models.Categories, {
          as: "category",
          foreignKey: "categoryId",
        });

        Notes.belongsTo(models.Users, {
            as: "users",
            foreignKey: "userId",
          });

          Notes.belongsToMany(models.Users, {
            as: "userfaved", 
            through: "note_user_fav",
            foreignKey: "notesId",
            otherKey: "userId",
            timestamps: false
        })
    }

    return Notes;
};
