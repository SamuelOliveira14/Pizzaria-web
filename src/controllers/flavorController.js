const flavor = require('../models/flavorModel')

const controller = {
    getAll: async (req, res) => {
        let flavors = []
        try{
            var response = await flavor.getAll()
            for(item of response){
                flavors.push(item.description)
            }
        }catch(err){
            return res.status(500).json({error: "Internal error - flavor"})
        }
        
        res.status(200).json(flavors)
    }
} 

module.exports = controller