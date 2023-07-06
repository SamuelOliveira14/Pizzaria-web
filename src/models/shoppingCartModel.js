const connection = require('./connection')

const shoppingCart = {
    getAllFromUserId: async (customer_id) => {

        const response = await connection.query(`SELECT product_id, quantity, total_price, name, description, image_link 
        FROM public."Shopping_Cart" join "Products" ON product_id = id 
        where customer_id = $1;`, [customer_id])

        return response.rows
    },

    addToCart: async (customer_id, product_id, quantity, total_price) => {
        
        const response = await connection.query(`INSERT INTO public."Shopping_Cart"(
            customer_id, product_id, quantity, total_price)
            VALUES ($1, $2, $3, $4) RETURNING *;`, [customer_id, product_id, quantity, total_price])
        
        return response.rows
    },

    getQuantityAndPrice: async (customer_id,product_id) => {
        const response = await connection.query(`SELECT quantity, total_price
        FROM public."Shopping_Cart" 
        WHERE customer_id = $1 and product_id = $2;`, [customer_id,product_id])

        return response.rows
    },

    updateQuantityAndPrice: async (customer_id, product_id, quantity, total_price) => {
        const response = await connection.query(`UPDATE public."Shopping_Cart"
        SET quantity = $3, total_price = $4 
        WHERE customer_id = $1 and product_id = $2;`, [customer_id, product_id, quantity, total_price])

        return response
    },

    clearCart: async (customer_id) => {
        const response = await connection.query(`DELETE FROM public."Shopping_Cart"
        WHERE customer_id = $1;`, [customer_id])

        return response
    }

}

module.exports = shoppingCart