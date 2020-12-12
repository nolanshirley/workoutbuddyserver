const router = require('express').Router(); 
const Favorite = require('../Db').import('../models/Favorite'); 
const Routine = require('../Db').import('../models/Routine'); 
const User = require('../Db').import('../models/User'); 
const validateSession = require('../middleware/validateSession'); 

router.get('/', (req, res) => {
    Favorite.findAll()
    .then(event => res.status(200).json({event}))
    .catch(err => res.status(500).json({ error: err }))
})

router.get('/:id', (req, res) => { 
    Favorite.findOne({
        where: { id: req.params.id }
    }) 
    .then(event => res.status(200).json(event))
    .catch(err => res.status(500).json({ error: err }))
})

router.post('/comment', validateSession, (req, res) => { 
    const createComment = {
        comment : req.body.comment, 
        userId : req.user.id, 
        routineId : req.body.routineId
    }
    Favorite.create(createComment)
    .then(event => res.status(200).json(event))
    .catch(err => res.status(500).json({ error: err }))
})

router.put('/edit/:userId/:routineId', validateSession, (req, res) => {
    Favorite.update(req.body, {
        where: {
            userId: req.user.id, 
            routineId: req.params.routineId
        }
    })
    .then(event => res.status(200).json(event))
    .catch(err => res.status(500).json({ error: err }))
})

router.delete('/delete/:userId/:routineId', validateSession, async (req, res) => {
    try {
        const deletion = await Favorite.destroy({
            where: {
                userId: req.user.id, 
                routineId: req.params.routineId
            }
        })
        res.status(200).json(deletion)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

module.exports = router; 