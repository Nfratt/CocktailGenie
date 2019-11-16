module.exports = (sequelize, DataTypes) => {
    const recipe = sequelize.define("recipe", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        instruction: {
            type: DataTypes.TEXT
        },
        vegan: {
            type: DataTypes.BOOLEAN,

        },
        ingredients: {
            type: DataTypes.TEXT
        }

    })
    return recipe;
}