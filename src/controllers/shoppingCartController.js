const shoppingCart = require('../models/shoppingCartModel')

const controller = {

    addToCart: async (req, res) =>{

        const userId = req.userId //From authentication process
        const product_price = req.product_price * req.multiplier //From products table
        const product_type = req.product_type
        const {product_id, quantity} = req.body

        try{
            let response = await shoppingCart.getQuantityAndPrice(userId, product_id)

            if(response.length == 0){ //Se o item não está no carrinho
                const total_price = quantity * product_price
                await shoppingCart.addToCart(userId, product_id, quantity, total_price)
            }else{ //Se não, atualiza a quantidade
                const [item] = response
                const actual_quantity = item.quantity
                const actual_price = parseFloat(item.total_price)
                const new_quantity = actual_quantity + quantity
                const new_price = parseFloat((quantity * product_price) + actual_price)

                await shoppingCart.updateQuantityAndPrice(userId, product_id, new_quantity, new_price)
            }
        }catch(err){
            return res.status(500).json({error: `Shopping Cart - Internal error`})
        }

        res.status(200).json({message: "Product added to cart!"})
    },

    getAll: async (req, res, next) => {

        const customer_id = req.userId

        try{
            var response = await shoppingCart.getAllFromUserId(customer_id)
        }catch(err){
            return res.status(500).json({error: "Shopping Cart - Internal error"})
        }

        res.status(200).json(response)
    },

    clearCart: async (req, res, next) => {

        const customer_id = req.userId
        try{
            const response = await shoppingCart.clearCart(customer_id)
        }catch(err){
            return res.status(500).json({error: "Shopping Cart - Internal error"})
        }

        res.status(200).json({message: "Your cart is now empty!"})
    },

    finishOrder: async (req, res, next) => {
        
        const customer_id = req.userId

        try{
            const response = await shoppingCart.getAllFromUserId(customer_id)
            if(response.length == 0){
                return res.status(406).json({Warning: "Could not complete this request: Your Shopping Cart is empty"})
            }

            req.shoppingCartItems = response
        }catch(err){
            return res.status(500).json({error: "Shopping Cart - Internal error"})
        }

        next()
    },
}

module.exports = controller