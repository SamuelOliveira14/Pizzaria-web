const product = require('../models/productModel')
const products = require('../models/productModel')

const controller = {
    getAll: async (req, res) => {
        try{
            const response = await products.getAll()
            res.status(200).json(response)
        }catch(err){
            return res.status(500).json({error: "Products - Internal error"})
        }
    },

    getPriceAndType: async (req, res, next) => {

        const {product_id} = req.body

        try{
            var response = await products.getById(product_id)
            req.product_price = response[0].price
            req.product_type = response[0].type
        }catch(err){
            return res.status(500).json({error: "Products - Internal error"})
        }

        req.multiplier = 1

        try{
            if (req.product_type == 1) { //Se for pizza
                const {size} = req.body
                response = await products.getSizeMultiplier(size)
                req.multiplier = response[0].multiplier
            }
        }catch(err){
            return res.status(500).json({error: "Products - Internal error"})
        }
        next()
    }
}

module.exports = controller