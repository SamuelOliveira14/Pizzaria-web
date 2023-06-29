const connection = require('./connection')

const product = {
   getAll: async () => {
      let response = await connection.query('select id, price, description, image_link from "Products" where type = 1') //Pizzas
      const pizzas = response.rows

      response = await connection.query('select id, price, description, image_link from "Products" where type = 2') //Pizza2Sabores
      const twoFlavorPizza = response.rows

      response = await connection.query('select id, price, description, image_link from "Products" where type = 3') //Combos
      const combos = response.rows

      response = await connection.query('select id, price, description, image_link from "Products" where type = 4') //Drinks
      const drinks = response.rows

      return {
         pizzas: pizzas,
         twoFlavorPizza: twoFlavorPizza,
         combos: combos,
         drinks: drinks,
      }
   },

   getPrice: async (id) => {
      const response = await connection.query(`select price from "Products" where id = $1`, [id])
      return response.rows
   }
}

module.exports = product
