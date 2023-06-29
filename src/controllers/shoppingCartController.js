const shoppingCart = require('../models/shoppingCartModel')

const controller = {

    addToCart: async (req, res) =>{

        const userId = req.userId //From authentication process
        const product_price = req.product_price //From products table
        const {product_id, quantity} = req.body

        //TODO: Adicionar additional_info na tabela de carrinho, para inserir dados adicionais, tal como tamanho da pizza etc.
        //TODO: Adicionar uma etapa para verificar o preço da pizza de acordo com seu tamanho.
        //TODO: Adicionar a tabela Pizza_sizes


        try{
            let response = await shoppingCart.getQuantityAndPrice(userId, product_id)

            if(response.length == 0){
                const total_price = quantity * product_price
                await shoppingCart.addToCart(userId, product_id, quantity, total_price)
            }else{
                const [item] = response
                const actual_quantity = item.quantity

                const new_quantity = actual_quantity + quantity
                const new_price = new_quantity * product_price
                await shoppingCart.updateQuantityAndPrice(userId, product_id, new_quantity, new_price)
            }
            
        }catch(err){
            return res.status(500).json({error: `Shopping Cart - Internal error`})
        }

        res.status(200).json({message: "Product added to cart!"})
    },

    getAll: async (req, res) => {
        try{
            var response = await shoppingCart.getAllFromUserId(req.userId)
        }catch(err){
            return res.status(500).json({error: "Shopping Cart - Internal error"})
        }

        res.status(200).json(response)
    }
}

module.exports = controller