const connection = require('./connection')

const customer = {
   getAll: async () => {
      const allCustomers = await connection.query('select * from "Customers"')
      const {rows} = allCustomers
      return rows
   },

   findById: async (id) => {
      const {rows} = await connection.query(`select * from "Customers" where id = $1`, [id])
      return rows
   },

   findByEmail: async (email) => {
      const {rows} = await connection.query(`select * from "Customers" where email = $1`, [email])
      return rows
   },

   registerCustomer: async (userName, cpf, email, password, address_id) => {

      const {rows} = await connection.query(`INSERT INTO public."Customers"(name, cpf, email, password, address_id)
         VALUES ($1,$2,$3,$4,$5) RETURNING *;`,[userName, cpf, email, password, address_id])
      return rows
   }
}

module.exports = customer
