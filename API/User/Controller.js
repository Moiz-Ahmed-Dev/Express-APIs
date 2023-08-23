const { connect } = require('mongoose')
const User = require('./model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET_KEY = "helloMoiz "
require('dotenv').config()

const getUser = async (req, res) => {
    try {
        await connect(process.env.MONGO_URL)
        const allUsers = await User.find()
        res.json({
            User: allUsers
        })
    }



    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const signupUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(403).json({
            message: "Missing Required Field"
        })
    }
    else {
        try {

            await connect(process.env.MONGO_URL)
            const existingUser = await User.findOne({ email: email });
            if (existingUser) {
                res.status(400).json({
                    message: "User Already Exist"
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const result = await User.create({
                email: email,
                password: hashedPassword,
                username: username
            });

            const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);
            res.status(201).json({
                user: result, token: token
            });

        }
        catch (error) {
            res.status(400).json({
                message: error.message

            })
        }
    }


}

const loginUser = async (req, res) => {

    const { email, password } = req.body

    if (!email || !password) {
        res.status(403).json({
            message: "Missing Required Field"
        })
    }

    else {
        try {
            await connect(process.env.MONGO_URL);
            const existingUser = await User.findOne({ email: email })
            if (!existingUser) {
                res.status(404).json({
                    message: "User Not Found"
                });
            }

            const matchPassword = await bcrypt.compare(password, existingUser.password);
            if (!matchPassword) {
                res.status(400).json({
                    message: "Invalid username or password"
                })
            }

            else {
                const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRET_KEY);
                res.status(201).json({
                    User: existingUser, token: token
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

const deleteUser = async (req, res) => {

    const { email} = req.body

    try {
        await connect(process.env.MONGO_URL)
        await User.deleteOne({ email})
        const user = await User.find()

        res.status(200).json({
            message: "Deleted Successfully",
            user
        })
    }



    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const updateUser = async (req, res) => {
    const {  username } = req.body

    const filter = { _id };
    const update = { username};

    try {
        await connect(process.env.MONGO_URL)

        await User.findOneAndUpdate(filter, update, {
            new: true
        });
        const user = await User.find()

        res.json({
            message: "Successfully Updated",
            user
        })


    } catch (error) {
        res.status(400).json({
            message: error.message
        })

    }
} 

const getUserByID = async (req, res) => {

    const { _id } = req.query

    try {
        await connect(process.env.MONGO_URL)
        const user = await User.findOne({ _id })
        res.json({ user })
    }



    catch (error) {
        res.status(400).json({
            message:"User not exist" 
        })
    }
}

const getUserByEmail = async (req, res) => {

    const { email } = req.query

    try {
        await connect(process.env.MONGO_URL)
        const user = await User.findOne({ email })
        res.json({ user })
    }



    catch (error) {
        res.status(400).json({
            message:"User not exist" 
        })
    }
}



module.exports = { getUser, signupUser, loginUser, deleteUser, updateUser, getUserByID, getUserByEmail }