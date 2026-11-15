const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        orderItems: [
            {
                name: {
                    type: String,
                    required: true
                },

                quantity: {
                    type: Number,
                    required: true
                },

                image: {
                    type: String,
                    required: true
                },

                price: {
                    type: Number,
                    required: true
                },

                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                }
            }
        ],

        shippingAddress: {
            address: {
                type: String,
                required: true
            },

            city: {
                type: String,
                required: true
            },

            postalCode: {
                type: String,
                required: true
            },

            country: {
                type: String,
                required: true
            }
        },

        paymentMethod: {
            type: String,
            required: true
        },

        paymentResult: {
            id: String,
            status: String
        },

        totalPrice: {
            type: Number,
            required: true,
            default: 0
        },

        isPaid: {
            type: Boolean,
            default: false
        },

        paidAt: {
            type: Date
        },

        isDelivered: {
            type: Boolean,
            default: false
        },

        deliveredAt: {
            type: Date
        },
        status: {   
         type: String,
         enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
         default: 'Pending'
        }
    },
    {
        timestamps: true
    }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;