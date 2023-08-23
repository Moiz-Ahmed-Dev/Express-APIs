const { Schema, model } = require('mongoose')

const ProductSchema = new Schema(

    {
      ProductId:{
        type: Number,
        unique: true,
        required: true
      } ,
      ProductName:{
        type: String,
        unique: true,
        required: true
      } ,
      ProductDiscription:{
        type: String,
        required: true
      } ,
      ProductPrice:{
        type: String,
        required: true
      } ,
      ProductRating:{
        type: Number,
        default: 4.9
      } ,
      ProductBrand:{
        type: String,
        required: true
      } ,
      ProductCategory:{
        type: String,
        required: true
      } ,
      ProductThumbnail:{
        type: String,
        required: true
      } ,
      ProductImages:{
        type: Array,
        required: true
      } 
    }

)
const Product = model('product', ProductSchema)

module.exports = Product