const connection = require('./connection')

const product = {
   getAll: async () => {
      const allProducts = await connection.query('select * from "Products"')
      const {rows} = allProducts
      return rows
   }
}

module.exports = product
