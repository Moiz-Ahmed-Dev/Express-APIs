const Orders = require('./model')
const nodemailer = require("nodemailer")
var Mailgen = require('mailgen')
const { connect } = require("mongoose")
require('dotenv').config()

const placeOrder = async (req, res) => {
    const { customerName, customerEmail, customerId, customerContact, customerAddress } = req.body

    if (!customerName || !customerEmail || !customerId || !customerContact || !customerAddress) {
        res.status(403).json({
            message: "Missing Required"
        })
    }

    else {
        const config = {
            service: 'gmail',
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASSWORD
            }
        }

        const transporter = nodemailer.createTransport(config);


        var mailGenerator = new Mailgen({
            theme: 'default',
            product: {
                name: 'ShoeSavvy.com',
                link: 'https://mailgen.js/'
            }
        });


        try {
            await connect(process.env.MONGO_URL)
            const orders = await Orders.create({ customerName, customerEmail, customerId, customerContact, customerAddress })

            await transporter.sendMail({
                from: process.env.NODEMAILER_EMAIL,
                to: customerEmail,
                subject: "Place Order",
                html: mailGenerator.generate({
                    body: {
                        name: customerName,
                        intro: 'Welcome to Banoqabil! We\'re very excited to have you on board.',
                        table: {
                            data: [
                                {
                                    customerName,
                                    customerEmail,
                                    customerAddress,
                                    customerContact,
                                    tracking_id: orders._id
                                }
                            ]
                        },
                        outro: `Your Order will be delived at ${customerAddress}, please ensure to active your contact number ${customerContact}`
                    }
                })
            })

            res.json({
                message: "Order Placed Successfully, Please Check your Email",
                tracking_id: orders._id
            })

        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

}

const allOrders = async (req, res) => {
    try {
        await connect(process.env.MONGO_URL)
        const orders = await Orders.find()
        res.json({ orders })

    }

    catch (error) {
        res.json(500).json({ message: error.message })
    }

}

const trackOrder = async (req, res) => {
    const { _id } = req.query

    try {
        await connect(process.env.MONGO_URL)
        const order = await Orders.findOne({ _id })
        res.json({ order })
    }

    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { placeOrder, allOrders, trackOrder }