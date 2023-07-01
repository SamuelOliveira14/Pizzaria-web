const flavor = require('../models/FlavorModel')

const controller = {
    getAll: async (req, res) => {
        try{
            var response = await flavor.getAll()
        }catch(err){
            return res.status(500).json({error: "Internal error - flavor"})
        }
        
        res.status(200).json(response)
    }
} 

module.exports = controller