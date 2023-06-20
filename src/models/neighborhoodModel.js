const connection = require('./connection')

const neighborhoodModel = {

   getAll: async () => {
      const {rows} = await connection.query('SELECT * FROM "Accepted_Neighborhoods"') 
      return rows
   },

   findByName: async (name) => {
      const {rows} =  await connection.query(`SELECT * FROM "Accepted_Neighborhoods" where neighborhood = $1`, [name])
      return rows
   }


}

module.exports = neighborhoodModel