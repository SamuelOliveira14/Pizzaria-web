const connection =  require('./connection')

const addressModel = {

   registerAddress: async (street,number,CEP,additional_info,neighborhood_id) => {  
      
      const {rows} = await connection.query(`INSERT INTO public."Address"("street", "number", "CEP", "additional_info", "neighborhood_id")
      VALUES ($1,$2,$3,$4,$5) RETURNING *;`,[street,number,CEP,additional_info,neighborhood_id])
      return rows
   },

   getById: async (id) => {
      const {rows} = await connection.query(`SELECT * FROM "Address" WHERE id = $1`, [id])
      return rows
   }
}

module.exports = addressModel