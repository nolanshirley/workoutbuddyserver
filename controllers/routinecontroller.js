const router = require('express').Router(); 
const Routine = require('../Db').import('../models/Routine'); 
const Favorite = require('../Db').import('../models/Favorite'); 
const User = require('../Db').import('../models/User'); 
const validateSession = require('../middleware/validateSession');

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
    .then(event => res.status(200).json(event))
    .catch(err => res.status(500).json({ error: err }))
})

router.post('/workout', validateSession, (req, res) => {
    const workout = {
        exercise : req.body.exercise, 
        equipment : req.body.equipment, 
        weight : req.body.weight, 
        duration : req.body.duration, 
        sets : req.body.sets, 
        reps : req.body.reps, 
        userId: req.user.id
    } 
    Routine.create(workout) 
    .then(event => res.status(200).json(event))
    .catch(err => res.status(500).json({ error: err })); 
});

router.put('/edit/:id', validateSession, (req, res) => {
    Routine.update(req.body, {
        where: { id : req.params.id, userId : req.user.id }
    })
    .then(event => res.status(200).json(event))
    .catch(err => res.status(500).json({ error: err }))
})

router.delete('/delete/:id', validateSession, async (req, res) => {
    try {
        const deletion = await Routine.destroy({
            where: { id : req.params.id, userId : req.user.id } // second one is to check to see what user the routine belongs to 
        })
        res.status(200).json(deletion)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

router.delete('/adminRoutineDelete/:id', validateSession, async (req, res) => {
    if (req.user.role === process.env.ADMIN) {
        try {
            const deletion = await Routine.destroy({
                where: { id : req.params.id }
            })
            res.status(200).json(deletion)
        } catch (err) {
            res.status(500).json({ error: err })
        }
    } else {
        res.status(504).json({
            message: "unauthorized user"
        })
    }        
})


router.get('/findRoutines/:userId/:routineId', (req, res) => {
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