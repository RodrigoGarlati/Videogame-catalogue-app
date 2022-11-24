const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id : {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    releaseDate: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.FLOAT
    },
    platforms: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING(100000),
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }

  });
};
