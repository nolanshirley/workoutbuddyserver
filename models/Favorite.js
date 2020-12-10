const { DataTypes } = require('sequelize/types');
const database = require('../Db'); 

module.exports = (sequelize, DataTypes) => {
    const favorite = sequelize.define('favorite', {
        comments: {
            type: DataTypes.STRING, 
            allowNull: true
        }
    })
    return favorite; 
}

