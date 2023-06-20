const neighborhoodModel = require('../models/neighborhoodModel')

const neighborhoodController = {

   getAll: async (req, res) => {
      try{
         var neighborhoods = await neighborhoodModel.getAll()
      }catch(err) {
         res.status(500).json({error: 'Could not complete this request'})
      }

      let response = []
      for(item of neighborhoods){
         response.push({neighborhood: item.neighborhood})
      }
      res.status(200).json(response)
   },

   findByName: async (req, res, next) => {

      const {neighborhood} = req.body
      try{
         var dbResponse = await neighborhoodModel.findByName(neighborhood)
      }catch(err){
         return res.status(500).json({error: 'Could not complete this request'})
      }

      const {id} = dbResponse[0]
      req.neighborhood_id = id
      next()
   },

}

module.exports = neighborhoodController