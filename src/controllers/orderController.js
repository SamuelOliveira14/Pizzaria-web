const order = require('../models/orderModel')

const controller = {

    createOrder: async (req, res, next) => {
        const customer_id = req.userId
        let order_price = 0
        for(item of req.shoppingCartItems){
            order_price = order_price + parseFloat(item.total_price)
            console.log(parseFloat(item.total_price))
        }
        order_price = parseFloat(order_price)
        try{
            var response = await order.createOrder(customer_id, parseFloat(order_price), new Date())
        }catch(err){
            return res.status(500).json({error: `order error: ${err}`})
        }

        req.orderId = response[0].id

        for(item of req.shoppingCartItems){
            try{
                await order.addOrderItem(req.orderId, item.product_id, parseInt(item.quantity), parseFloat(item.total_price))
            }catch(err){
                return res.status(500).json({error: `order error: ${err}`})
            }
        }
        next()
    },

    getCustomerOrders: async (req, res, next) => {
        try{
            var response = await order.getCustomerOrders(req.userId)
        }catch{
            return res.status(500).json({erro: `Order error - $error`})
        }

        res.status(200).json(response)
    }

}

module.exports = controller