const database = require('../Db'); 

module.exports = (sequelize, DataTypes) => {
    const Routine = sequelize.define('routine', {
        nameOfExercise: {
            type: DataTypes.STRING, 
            allowNull: false
        }, 
        equipment: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        weight: {
            type: DataTypes.INTEGER, 
            allowNull: false
        }, 
        duration: {
            type: DataTypes.INTEGER, 
            allowNull: true
        },
        sets: {
            type: DataTypes.INTEGER, 
            allowNull: false
        }, 
        reps: {
            type: DataTypes.STRING, 
            allowNull: false, 
            validate: {
                max: 200
            }
        } 
    })
    return Routine; 
}