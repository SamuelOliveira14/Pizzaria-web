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

   getPriceAndType: async (id) => {
      const response = await connection.query(`SELECT price, type FROM "Products" WHERE id = $1`, [id])
      return response.rows
   },

   getSizeMultiplier: async (description) => {
      const response = await connection.query(`SELECT multiplier FROM public."Pizza_Sizes" WHERE description = $1;`, [description])
      return response.rows
   },

   getById: async (id) => {
      const response = await connection.query(`SELECT * FROM "Products" WHERE id = $1`, [id])
      return response.rows
   }
}

module.exports = product
