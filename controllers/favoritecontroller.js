const router = require('express').Router(); 
const Favorite = require('../Db').import('../models/Favorite'); 
const Routine = require('../Db').import('../models/Routine'); 
const User = require('../Db').import('../models/User'); 

router.get('/routines/:userId/:routineId', (req, res) => {
    
})
