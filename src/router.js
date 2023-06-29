const express = require('express')
const login = require('./utils/login')
const auth = require('./utils/auth')
const customer = require('./controllers/customerController')
const neighborhood = require('./controllers/neighborhoodController')
const address = require('./controllers/addressController')
const products = require('./controllers/productController')
const shoppingCart = require('./controllers/shoppingCartController')
const router = express.Router()


router.get('/', (req, res) => {
   res.send('Main page')
})

router.get('/customers', customer.getAll)
router.get('/customers/:email', customer.findByEmail)
router.get('/neighborhoods',neighborhood.getAll)
router.get('/private', auth, (req, res) =>{ res.json({message: 'You entered in a private section', id: req.userId})})
router.get('/products', products.getAll)
router.get('/getShoppingCart', auth, shoppingCart.getAll)

router.post('/login', customer.checkPassword, login)
router.post('/register', neighborhood.findByName, address.registerAddress, customer.registerCustomer)
router.post('/addToCart', auth, products.getPrice, shoppingCart.addToCart)

module.exports = router