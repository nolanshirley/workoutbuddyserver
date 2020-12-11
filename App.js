require('dotenv').config(); 

const Express = require('express'); 
const app = Express(); 

const database = require('./Db'); 

database.sync({force: true});

app.use(Express.json()); 

app.use(Express.static(__dirname + '/public')); 

app.use(require('./middleware/headers'));

app.get('/', (req, res) => res.render('index'));  

const User = require('./controllers/usercontroller'); 
app.use('/user', User); 

// const routine = require('./controllers/routinecontroller'); 
// app.use('/routine', routine); 

app.listen(process.env.PORT, function(){console.log(`app is listening on port ${process.env.PORT}`)})