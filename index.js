const express = require('express')
const app = express()
require('dotenv').config()
const CategoryRouter = require('./API/Category/Router')
const UserRouter = require('./API/User/Router')
const ProductRouter = require('./API/Products/Router')
const BrandRouter = require('./API/Brands/Router')
const OrderRouter = require('./API/Orders/Router')
const cors = require('cors')

const port = process.env.SERVER_PORT || 3200

app.use(express.json())
app.use (cors())
app.use ('/api', CategoryRouter)
app.use ('/api', UserRouter)
app.use ("/api", BrandRouter)
app.use ("/api", ProductRouter)
app.use ("/api", OrderRouter)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})