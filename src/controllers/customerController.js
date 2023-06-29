const customer = require('../models/customerModel')

const controller = {
   getAll: async (req, res) => {
      try{
         var customers = await customer.getAll()
      }catch(err){
         res.status(500).json({error: "Server error."})
      }

      res.status(200).json(customers)
   },
   
   findById: async (req, res) => {
      try {
         var user = await customer.findById(req.params.id)
      } catch (err) {
         res.status(500).json({error: "Server error"})
      }

      user = user[0]
      res.status.json(user)
   },

   findByEmail: async (req, res) => {
      try{
         var user = await customer.findByEmail(req.params.email)
      }catch (err) {
         res.status(500).json({error: "Server error"})
      }
      
      user = user[0]
      if(!user){
         return res.status(404).json({error: 'Wrong credentials.'})
      } 
      res.status(200).json(user)
   },

   checkPassword: async (req, res, next) => {
      const {email, password} = req.body
      try {
         var user = await customer.findByEmail(email)
      }catch (err) {
         res.status(500).json({error: "Server error"})
      }

      user = user[0]
      if(!user){
         res.clearCookie('token')
         return res.status(404).json({error: 'User Not Found'})
      }
      const userPassword = user.password
      if(password == userPassword){
         req.userId = user.id
         next()
      }else{
         res.clearCookie('token')
         res.status(403).json({error: 'Wrong credentials'})
      }
   },

   registerCustomer: async (req, res) => {

      const {name, cpf, email, password} = req.body
      const address_id = req.address_id

      try{
         let dbResponse = await customer.registerCustomer(name, cpf, email, password, address_id)
      }catch(err){
         return res.status(500).json({message: `Server error. Could not complete this operation`})
      }
      
      res.status(200).json({message: "User registered."})
   }
}

module.exports = controller