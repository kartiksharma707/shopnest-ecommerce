const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../model/order");
const dotenv = require("dotenv");

dotenv.config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});


// CREATE RAZORPAY ORDER
const createRazorpayOrder = async (req, res) => {
    try {
        const { amount, currency } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid amount"
            });
        }

        const options = {
            amount: Math.round(amount * 100),
            currency: currency || "INR",
            receipt: "receipt_" + Date.now()
        };

        const razorpayOrder = await razorpay.orders.create(options);

        return res.status(200).json({
            success: true,
            message: "Razorpay order created successfully",
            order: razorpayOrder
        });

    } catch (error) {
        console.log("Razorpay Create Order Error:", error);

        return res.status(500).json({
            success: false,
            message: "Error creating Razorpay order",
            error: error.message
        });
    }
};


// VERIFY PAYMENT
const verifyPayment = async (req, res) => {
    try {

      const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    orderItems,
    shippingAddress,
    paymentMethod,
    totalPrice
} = req.body;

        // Check required data
       if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !orderItems ||
    !shippingAddress ||
    !totalPrice
){
            return res.status(400).json({
                success: false,
                message: "Payment verification data is missing"
            });
        }


        // Create signature
        const body =
            razorpay_order_id + "|" + razorpay_payment_id;


        const expectedSignature = crypto
            .createHmac(
                "sha256",
                process.env.RAZORPAY_KEY_SECRET
            )
            .update(body)
            .digest("hex");


        // Compare signature
        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Payment verification failed"
            });
        }


        // Find MongoDB order
        const order = new Order({
    user: req.user._id,
    orderItems,
    shippingAddress,
    paymentMethod,
    totalPrice,
    isPaid: true,
    paidAt: new Date(),
    paymentResult: {
        id: razorpay_payment_id,
        status: "Paid"
    }
});

await order.save();

        return res.status(200).json({
            success: true,
            message: "Payment verified successfully",
            order
        });

    } catch (error) {

        console.log("Payment Verification Error:", error);

        return res.status(500).json({
            success: false,
            message: "Error verifying payment",
            error: error.message
        });
    }
};


module.exports = {
    createRazorpayOrder,
    verifyPayment
};