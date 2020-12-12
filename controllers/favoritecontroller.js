const router = require('express').Router(); 
const Favorite = require('../Db').import('../models/Favorite'); 
const Routine = require('../Db').import('../models/Routine'); 
const User = require('../Db').import('../models/User'); 

router.get('/', (req, res) => {
    Favorite.findAll()
    .then(event => res.status(200).json({event}))
    .catch(err => res.status(500).json({ error: err }))
})

router.get('/:id', (req, res) => { //     /:routineId ??
    Favorite.findOne({
        where: { id: req.params.id }
    }) 
    .then(event => res.status(200).json(event))
    .catch(err => res.status(500).json({ error: err }))
})

router.post('/comment', (req, res) => { //   /comment/:userId ??
    const createComment = {
        comment : req.body.comment
    }
    Favorite.create(createComment)
    .then(event => res.status(200).json(event))
    .catch(err => res.status(500).json({ error: err }))
})

router.put('/edit/:userId/:routineId', (req, res) => {
    Favorite.update(req.body, {
        where: {
            userId: req.params.userId, 
            routineId: req.params.userId
        }
    })
    .then(event => res.status(200).json(event))
    .catch(err => res.status(500).json({ error: err }))
})

router.delete('/delete/:userId/:routineId', async (req, res) => {
    try {
        const deletion = await Favorite.destroy({
            where: {
                userId: req.params.userId, 
                routineId: req.params.routineId
            }
        })
        res.status(200).json(deletion)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

module.exports = router; 