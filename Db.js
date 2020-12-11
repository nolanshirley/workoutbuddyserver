const Sequelize = require('sequelize'); 

const database = new Sequelize(process.env.NAME, 'postgres', process.env.PASS, {
    host: 'localhost', 
    dialect: 'postgres'
})

database.authenticate()
    .then(() => console.log('postgres db is connected'))
    .catch(err => console.log(err)); 


User = database.import('./models/User'); 
Routine = database.import('./models/Routine'); 
Favorite = database.import('./models/Favorite'); 

User.hasMany(Favorite, { as: "favorites"});
Favorite.belongsTo(User); 

Routine.belongsTo(User, { as: "user"}); 
User.hasMany(Routine); 

Routine.hasMany(Favorite, { as: "favorites"});
Favorite.belongsTo(Routine);  



module.exports = database; 