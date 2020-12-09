const jwt = require('jsonwebtoken'); 
const User = require('../Db').import('../models/User'); 

module.exports = async (req, res, next) => {
    const token = req.headers.authorization; 

    try {
        const decoded = await jwt.verify(token, process.env.JWT); 

        const user = await User.findOne({ where: { id: decoded.id } })

        if (!user) throw new Error ('user not found'); 

        req.user = user; 

        next(); 
    } catch (err) {
        res.status(500).json({ error: err })
    }
}