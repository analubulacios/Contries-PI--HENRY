const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        min:1,max:5
      }
    },
    season: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        isIn:[['Summer','Autumn','Winter','Spring']]
      }
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        min:1,max:24
      }
    } 
  },{
    timestamps: false // cambie a false 
  } );
};
