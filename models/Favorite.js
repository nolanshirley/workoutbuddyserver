const database = require('../Db'); 

module.exports = (sequelize, DataTypes) => {
    const favorite = sequelize.define('favorite', {
        comment: {
            type: DataTypes.STRING, 
            allowNull: true
        }
    })
    return favorite; 
}

