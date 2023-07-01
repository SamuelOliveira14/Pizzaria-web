const connection = require('./connection')

const order = {
    getCustomerOrders: async (customer_id) => {
        const response = await connection.query(`SELECT * FROM "Orders" WHERE customer_id = $1`, [customer_id])
        return response.rows
    },

    getDetailedOrder: async (id) => {
        const response = await connection.query() // order join order items
        return response.rows
    },

    addOrderItem: async (order_id, product_id, quantity, price) => {
        const response = await connection.query(`INSERT INTO public."Order_items"(order_id, product_id, quantity, price)
        VALUES ($1,$2,$3,$4);`, [order_id, product_id, quantity, price])

        return response
    },
    
    createOrder: async (customer_id, total_price, date) => {
        const response = await connection.query(`INSERT INTO public."Orders"(customer_id, total_price, date)
        VALUES ($1,$2,$3) RETURNING *;`, [customer_id,total_price,date])
        return response.rows
    }
}

module.exports = order