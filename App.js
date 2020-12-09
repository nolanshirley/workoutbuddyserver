require('dotenv').config(); 

const Express = require('express'); 
const app = Express(); 

app.use(Express.static(__dirname + '/public')); 

app.get('/', (req, res) => res.render('index')); 

app.use(Express.json()); 

app.use('/test', (req, res) => [ res.send('This is a test endpoint')])

const database = require('./Db'); 

database.sync(); 

//require headers below when made 
app.use(require('./middleware/headers')); 

const User = require('./controllers/usercontroller'); 
app.use('/user', User); 

const Routine = require('./controllers/routinecontroller'); 
app.use('/routine', Routine); 