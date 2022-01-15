const { DataTypes } = require("Sequelize");

module.exports = (sequelize) => {

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: DataTypes.INTEGER,
        notesId: DataTypes.INTEGER
    }

    const Note_user_fav = sequelize.define("Note_user_fav", cols,
        {
        tableName: "note_user_fav",
        timestamps: false,
        }
    );

    Note_user_fav.associate = function (models) {

        Note_user_fav.belongsTo(models.Users, { 
            as: "note",
            foreignKey: "userId"
        })

        Note_user_fav.belongsTo(models.Notes, { 
            as: "user",
            foreignKey: "notesId"
        })

    };

    return Note_user_fav;
};
