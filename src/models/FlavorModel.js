const connection = require('./connection')

const flavor = {
    getAll: async () => {
        const response = await connection.query(`SELECT description
        FROM public."Flavors";`)
        return response.rows
    }
}

module.exports = flavor