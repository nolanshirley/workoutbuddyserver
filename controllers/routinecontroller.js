const router = require('express').Router(); 
const Routine = require('../Db').import('../models/Routine'); 
const Favorite = require('../Db').import('../models/Favorite'); 
const User = require('../Db').import('../models/User'); 

router.get('/', (req, res) => {
    Routine.findAll()
        .then(event => res.status(200).json(event))
        .then(events => console.log(events))
        .catch(err => res.status(500).json({error: err}))
})

router.get('/:id', (req, res) => {
    Routine.findOne({
        where: { id: req.params.id } 
    })
    .then(event => res.status(200).json({event: event}))
    .catch(err => res.status(500).json({ error: err }))
})

router.post('/workout', (req, res) => {
    const workout = {
        nameOfExercise = req.body.nameOfExercise, 
        equipment = req.body.equipment, 
        weight = req.body.weight, 
        duration = req.body.duration, 
        sets = req.body.sets, 
        reps = req.body.reps
    }
    Routine.create(workout) 
    .then(event => res.status(200).json(event))
    .catch(err => res.status(500).json({ error: err })); 
});

router.put('/edit/:id', (req, res) => {
    Routine.update(req.body, {
        where: { id = req.params.id }
    })
    .then(event => res.status(200).json(event))
    .catch(err => res.status(500).json({ error: err }))
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const deletion = await Routine.destroy({
            where: { id = req.params.id }
        })
        res.status(200).json(deletion)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

router.get('/findMyRoutines/:userId/:routineId', (req, res) => {
    Routine.findAll({include: "favorites", 
        where : { 
            userId : req.params.userId, 
            routineId : req.params.routineId
        }
    })
    .then(event => res.status(200).json(event))
    .catch(err => res.status(500).json({ error: err }))
})



module.exports = router; 