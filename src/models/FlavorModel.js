const connection = require('./connection')

const flavor = {
    getAll: async () => {
        const response = connection.query(`SELECT * FROM "Flavors"`)
        return response.rows
    }
}

module.exports = flavor