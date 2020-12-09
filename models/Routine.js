const database = require('../Db'); 

module.exports = (sequelize, DataTypes) => {
    const Routine = sequelize.define('Routine', {
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
            allowNull: false
        } 
    })
    return Routine; 
}