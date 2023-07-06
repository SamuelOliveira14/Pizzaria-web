const express = require('express')
const login = require('./utils/login')
const auth = require('./utils/auth')
const customer = require('./controllers/customerController')
const neighborhood = require('./controllers/neighborhoodController')
const address = require('./controllers/addressController')
const products = require('./controllers/productController')
const shoppingCart = require('./controllers/shoppingCartController')
const order = require('./controllers/orderController')
const flavor = require('./controllers/flavorController')
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
router.get('/orders', auth, order.getCustomerOrders)
router.get('/clearCart', auth, shoppingCart.clearCart)
router.get('/finishOrder', auth, shoppingCart.finishOrder, order.createOrder, shoppingCart.clearCart)
router.get('/flavors', flavor.getAll)

router.post('/login', customer.checkPassword, login)
router.post('/register', neighborhood.findByName, address.registerAddress, customer.registerCustomer)
router.post('/addToCart', auth, products.getPriceAndType, shoppingCart.addToCart)


module.exports = router