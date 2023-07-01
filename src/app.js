const express = require("express")
const router = require("./router")
const cors = require('cors')
const cookieParser = require('cookie-parser')
const env = require('./env')

const app = express()

const PORT = env.port

app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
   res.header('Access-Control-Allow-Headers', '*');
   if ('OPTIONS' == req.method) {
      res.sendStatus(200);
   } else {
     next();
   }
 })

app.use(cookieParser())
app.use(express.json())

app.use(router)

app.listen(PORT, 'localhost', () => {
   console.log(`server running on port ${PORT}`)
})

module.exports = app