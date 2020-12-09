const database = require('../Db'); 

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        email: {
            type: DataTypes.STRING, 
            allowNull: false
        }, 
        password: {
            type: DataTypes.STRING, 
            allowNull: false, 
            unique: true
        }, 
        username: {
            type: DataTypes.STRING, 
            allowNull: false
        }
    })
    return User; 
}
