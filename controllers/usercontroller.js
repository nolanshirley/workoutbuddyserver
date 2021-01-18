const router = require('express').Router(); 
const User = require('../Db').import('../models/User'); 
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 
const validateSession = require('../middleware/validateSession'); 

router.post('/signup', (req, res) => {
    User.create({
        email: req.body.email, 
        password: bcrypt.hashSync(req.body.password, 12), 
        username: req.body.username,
        role: "user" 
    })
    .then(user => {
        const token = jwt.sign({id: user.id}, process.env.JWT, {expiresIn: '7d'})

        res.status(200).json({
            user: user, 
            message: 'user created successfully', 
            sessionToken: token
        })
    })
    .catch(err => res.status(500).json({error: err}))
}); 

router.post('/signin', (req, res) => {
    User.findOne({ where: { email: req.body.email }})
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password, (err, matches) => {
                    if(matches) {
                        const token = jwt.sign({ id: user.id }, process.env.JWT, {expiresIn: '7d'}); 

                        res.status(200).json({
                            user: user, 
                            message: 'user successfully authenticated', 
                            sessionToken: token
                        })
                    } else {
                        res.status(500).json({error: 'password mismatch'})
                    }
                })
            } else {
                res.status(500).json({ error: 'user not found'})
            }
        })
        .catch(err => res.status(500).json({ error: err }))
})


router.get('/adminSearch/:username', validateSession, (req, res) => {
    if (req.user.role === "admin") {
        User.findOne({
            where: { username : req.params.username }
        })
        .then(event => res.status(200).json(event)) 
        .catch(err => res.status(500).json({ error: err }))
    } else {
        res.status(504).json({
            message: "unauthorized user"
        })
    }
})

router.get('/search/:username', (req, res) => {
    User.findOne({
        where: { username: req.params.username} 
    })
    .then(res.status('User found!'))
    .catch(err => res.status(500).json({error : err}))
})

router.get('/:id', (req, res) => {
    User.findOne({
        where: { id : req.params.id }
    })
    .then(event => res.status(200).json({event}))
    .catch(err => res.status(500).json({ error: err }))
})

router.put('/edit/:id', (req, res) => {
    User.update(req.body, {
        where: { id: req.params.id }
    })
    .then(event => res.status(200).json({ event }))
    .catch(err => res.status(500).json({ error: err }))
}); 

router.delete('/delete/:email', async (req, res) => {
    try {
        const destroy = await User.destroy({
            where: { email: req.params.email }
        })
        res.status(200).json(destroy)
    } catch (err) {
        res.status(500).json({message: "user not deleted", err})
    }
})

router.delete('/adminDelete/:email', validateSession, async (req, res) => {
    if (req.user.role === "admin") {
        try {
            const destroy = await User.destroy({
                where: { email: req.params.email }
            })
            res.status(200).json(destroy)
        } catch (err) {
            res.status(500).json({message: "user not deleted", err})
        }
    } else {
        res.status(504).json({
            message: "unauthorized user"
        })
    }
})


module.exports = router; 
