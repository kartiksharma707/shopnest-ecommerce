const Order = require("../model/order");
const { sendEmail } = require("../utils/sendEmail");


// CREATE ORDER
const createOrder = async (req, res) => {

    try {

        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            totalPrice
        } = req.body;


        if (!orderItems || orderItems.length === 0) {

            return res.status(400).json({
                message: "No order items found"
            });

        }


        const order = new Order({

            user: req.user._id,

            orderItems,

            shippingAddress,

            paymentMethod,

            totalPrice

        });


        const createdOrder = await order.save();

        await sendEmail(req.user.email, "Order Confirmation", `Your order has been placed successfully. Order ID: ${createdOrder._id}`);


        return res.status(201).json({

            message: "Order created successfully",

            success: true,

            order: createdOrder

        });


    } catch (error) {

        return res.status(500).json({

            message: "Error creating order",

            error: error.message

        });

    }

};



// GET ALL ORDERS
const getOrders = async (req, res) => {

    try {

        const orders = await Order.find().populate("user", "name email");


        return res.status(200).json({

            success: true,

            orders

        });


    } catch (error) {

        return res.status(500).json({

            message: "Error getting orders",

            error: error.message

        });

    }

};



// GET SINGLE ORDER
const getOrderById = async (req, res) => {

    try {

        const order = await Order.findById(req.params.id)
            .populate("user", "name email");


        if (!order) {

            return res.status(404).json({

                message: "Order not found"

            });

        }


        return res.status(200).json({

            success: true,

            order

        });


    } catch (error) {

        return res.status(500).json({

            message: "Error getting order",

            error: error.message

        });

    }

};

   

// UPDATE ORDER STATUS
const updateOrderStatus = async (req, res) => {

    try {

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        const { status } = req.body;

        order.status = status;

        if (status === "Delivered") {
    order.isDelivered = true;
    order.deliveredAt = new Date();
} else {
    order.isDelivered = false;
    order.deliveredAt = undefined;
}

        await order.save();

        return res.status(200).json({
            message: "Order status updated successfully",
            success: true,
            order
        });

    } catch (error) {

        return res.status(500).json({
            message: "Error updating order",
            error: error.message
        });

    }
};

const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.user._id
        });

        return res.status(200).json({
            success: true,
            orders
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error getting my orders",
            error: error.message
        });
    }
};

module.exports = {

    createOrder,
    
    getMyOrders,

    getOrders,

    getOrderById,

    updateOrderStatus

};