const product = require('./model')
const { connect } = require('mongoose')
require('dotenv').config()


const getAllProducts = async (req, res) => {


    try {
        await connect(process.env.MONGO_URL)
        const allProducts = await product.find()
        res.json({
            product: allProducts
        })
    }



    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const getProductByID = async (req, res) => {

    const { ProductId } = req.query

    try {
        await connect(process.env.MONGO_URL)
        const product = await product.findOne({ ProductId })
        res.json({ product })
    }



    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const createProduct = async (req, res) => {
    const { ProductId, ProductName, ProductDiscription, ProductPrice, ProductRating, ProductBrand, ProductCategory, ProductThumbnail, ProductImages } = req.body

    if (!ProductId || !ProductName || !ProductDiscription || !ProductPrice || !ProductBrand || !ProductCategory || !ProductThumbnail || !ProductImages) {
        res.status(403).json({
            message: "Missing Required Field"
        })
    }

    else {
        try {
            await connect(process.env.MONGO_URL)
            
            const checkExisting = await product.exists({ ProductName })
            if (checkExisting) {
                res.status(400).json({
                    message: "Product Already Exist"
                })
            }

            else {
                await product.create({ProductId, ProductName, ProductDiscription, ProductPrice, ProductBrand, ProductCategory, ProductThumbnail, ProductImages})
                const allProducts = await product.find()



                res.json({
                    message: "Created Successfully",
                    product: allProducts
                })
            }


        }
        catch (error) {
            res.status(400).json({
                message: error.message
            })
        }
    }
}

const updateProduct = async (req, res) => {
    const { ProductId, ProductName, ProductDiscription, ProductPrice, ProductRating, ProductBrand, ProductCategory, ProductThumbnail, ProductImages } = req.body

    const filter = { ProductId };
    const update = { ProductName, ProductDiscription, ProductPrice, ProductRating, ProductBrand, ProductCategory, ProductThumbnail, ProductImages };

    try {
        await connect(process.env.MONGO_URL)

        await product.findOneAndUpdate(filter, update, {
            new: true
        });
        const product = await product.find()

        res.json({
            message: "Successfully Updated",
            product
        })


    } catch (error) {
        res.status(400).json({
            message: error.message
        })

    }
}

const deleteProduct = async (req, res) => {

    const { ProductId} = req.body

    try {
        await connect(process.env.MONGO_URL)
        await product.deleteOne({ ProductId })
        const product = await product.find()

        res.status(200).json({
            message: "Deleted Successfully",
            product
        })
    }



    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const getProductByCategory = async (req, res) => {

    const { ProductCategory } = req.query

    try {
        await connect(process.env.MONGO_URL)
        const product = await product.find({ ProductCategory })
        res.json({ product })
    }



    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}


module.exports = {getAllProducts, getProductByID, createProduct, updateProduct, deleteProduct, getProductByCategory}


 
