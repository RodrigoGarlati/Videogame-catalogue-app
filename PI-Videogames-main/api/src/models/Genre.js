const {DataTypes} = require('sequelize')

module.exports = (sequelize)=>{
    sequelize.define('genre', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING
        },
        games: {
            type: DataTypes.STRING
        },
        created: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    })
}