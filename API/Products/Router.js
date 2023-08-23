const app = require('express')
const router = app.Router()
const {getAllProducts, getProductByID, createProduct, updateProduct, deleteProduct, getProductByCategory} = require('./Controller')




router.get('/get-all-products',getAllProducts)
router.get('/get-product-by-id',getProductByID)
router.get('/get-product-by-category',getProductByCategory) // New
router.post('/create-product',createProduct)
router.put('/update-product',updateProduct)
router.delete('/delete-product',deleteProduct)

  module.exports = router

 