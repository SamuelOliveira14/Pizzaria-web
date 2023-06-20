const jwt = require('jsonwebtoken')
const env = require('../env')

const secret = env.secret

module.exports = (req, res, next) => {
   const token = jwt.sign(req.userId, secret)
   res.cookie('token',token, {
      httpOnly: true,
   })

   res.status(200).json({status: 'Logged'})

}
