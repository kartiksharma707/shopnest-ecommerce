
const Order = require("../model/order");
const Product = require("../model/product");
const User = require("../model/user");

const getAnalytics = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();

    const paidOrders = await Order.find({ isPaid: true });

    const totalRevenue = paidOrders.reduce(
      (total, order) => total + order.totalPrice,
      0
    );

    res.status(200).json({
      totalOrders,
      totalProducts,
      totalUsers,
      totalRevenue,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { getAnalytics };
