const category = require ('./model')
const { connect } = require('mongoose')
require('dotenv').config()


const getAllCategories = async (req, res) => {


    try {
        await connect(process.env.MONGO_URL)
        const allCategories = await category.find()
        res.json({
            category: allCategories
        })
    }



    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const getCategoryByID = async (req, res) => {

    const { _id } = req.query

    try {
        await connect(process.env.MONGO_URL)
        const category = await category.findOne({ _id })
        res.json({ category })
    }



    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const createCategory = async (req, res) => {
    const { CategoryName, CategoryImage } = req.body

    if (!CategoryName || !CategoryImage) {
        res.status(403).json({
            message: "Missing Required Field"
        })
    }

    else {
        try {
            await connect(process.env.MONGO_URL)
            const checkExisting = await category.exists({ CategoryName })
            if (checkExisting) {
                res.status(400).json({
                    message: "Category Already Exist"
                })
            }

            else {
                await category.create({ CategoryName, CategoryImage })
                const allCategories = await category.find()



                res.json({
                    message: "DB Connected",
                    category: allCategories
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

const updateCategory = async (req, res) => {
    const { _id, CategoryName, CategoryImage } = req.body

    const filter = { _id };
    const update = { CategoryName, CategoryImage };

    try {
        await connect(process.env.MONGO_URL)

        await category.findOneAndUpdate(filter, update, {
            new: true
        });
        const category = await category.find()

        res.json({
            message: "Successfully Updated",
            category
        })


    } catch (error) {
        res.status(400).json({
            message: error.message
        })

    }
}

const deleteCategory = async (req, res) => {

    const { _id } = req.body

    try {
        await connect(process.env.MONGO_URL)
        await category.deleteOne({ _id })
        const category = await category.find()

        res.status(200).json({
            message: "Deleted Successfully",
            category
        })
    }



    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}


module.exports = { getAllCategories, getCategoryByID, createCategory, updateCategory, deleteCategory }