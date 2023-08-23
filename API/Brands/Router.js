const app = require('express')
const router = app.Router()
const {getAllBrands, getBrandByID, createBrand, updateBrand, deleteBrand} = require('./Controller')




router.get('/get-all-brands',getAllBrands)
router.get('/get-brand-by-id',getBrandByID)
router.post('/create-brand',createBrand)
router.put('/update-brand',updateBrand)
router.delete('/delete-brand',deleteBrand)

  module.exports = router