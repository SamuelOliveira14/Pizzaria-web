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

    getPrice: async (req, res, next) => {

        const {product_id} = req.body //id ou product_id?

        try{
            var response = await products.getPrice(product_id)
        }catch(err){
            return res.status(500).json({error: "Products - Internal error"})
        }

        req.product_price = response[0].price
        next()

    }
}

module.exports = controller