const address = require('../models/addressModel')

const controller = {

   registerAddress: async (req, res, next) => {

      const {street,number,CEP,additional_info} = req.body
      const neighborhood_id = req.neighborhood_id

      try{
         let dbResponse = await address.registerAddress(street,number,CEP,additional_info,neighborhood_id)
         const {id} = dbResponse[0]  
         req.address_id = id
      }catch(err){
         return res.status(500).send({error: 'Could not complete this operation'})
      }
      next()
   },

   getById: async (req, res) => {
      const user = {} //Precisa da informação do user

      try{
         var rows = address.getById(user.id)
      }catch(err){
         res.status(500).json({error: "Server error"})
      }

      res.status(200).json(rows[0])

   }
}

module.exports = controller