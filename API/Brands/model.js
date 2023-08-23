const { Schema, model } = require('mongoose')

const BrandSchema = new Schema(

    {
      BrandName:{
        type: String,
        unique: true,
        required: true
      } ,
      BrandImage:{
        type: String,
        required: true
      }
    }

)
const Brand = model('brand', BrandSchema)

module.exports = Brand