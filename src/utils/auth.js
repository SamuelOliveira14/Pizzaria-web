const jwt = require('jsonwebtoken')
const env = require('../env')


module.exports = (req, res, next) => {
   
   const token = req.cookies.token
   
   try {
      const userId = jwt.verify(token, env.secret)
      req.userId = userId
      next()
   } catch (error) {
      res.clearCookie('token')
      res.status(403).json({error: 'Authentication failure'})
   }

}