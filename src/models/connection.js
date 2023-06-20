const Pool = require('pg').Pool
const env = require('../env')
const connection = new Pool({
   user: 'postgres',
   password: env.dbPassword,
   host: env.dbHost,  
   port: 5432,
   database: env.database,

})
connection.connect()
module.exports = connection
