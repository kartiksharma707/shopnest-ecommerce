const express = require("express");
const {admin}= require("../middlewares/admin");
const router = express.Router();
const { registerUser, loginUser, getusers,updateProfile,changePassword } = require("../controllers/logic");
const {protect} = require("../middlewares/authmiddleware");
const { sendContactMessage } = require("../controllers/contactController");


const multer=require("multer")
const upload=multer({dest:"uploads/"})
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct,  verifyEmail} = require("../controllers/product");
const { createOrder, getOrders, getOrderById, updateOrderStatus, getMyOrders } = require("../controllers/order");
router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/users",protect,admin, getusers);
router.get("/products", getProducts);
router.get("/products/:id", getProductById);
router.post("/products", protect, upload.single("image"), admin, createProduct);
router.put("/products/:id", protect, upload.single("image"), admin, updateProduct);
router.delete("/products/:id", protect, upload.single("image"), admin, deleteProduct);
router.post("/verify-email", verifyEmail);
const { createRazorpayOrder, verifyPayment } = require("../controllers/paymentcontroller");

const {
  addReview,
  getProductReviews
} = require("../controllers/reviewController");
const { getAnalytics } = require("../controllers/analyticsController");

// Order routes

router.post("/orders", protect, createOrder);

router.get("/orders/myorders", protect, getMyOrders);

router.get("/orders", protect, admin, getOrders);

router.get("/orders/:id", protect, getOrderById);

router.put("/orders/:id/status", protect, admin, updateOrderStatus);



// Payment routes
router.post("/contact", sendContactMessage);

router.post("/payment/create-order", protect,createRazorpayOrder);

router.post( "/payment/verify", protect, verifyPayment);
router.put("/users/profile", protect, updateProfile);
router.put("/users/change-password", protect, changePassword);
router.post("/products/:id/reviews", protect, addReview);// Add Product Review
router.get("/products/:id/reviews", getProductReviews); // Get Product Reviews
router.get("/analytics", protect, admin, getAnalytics);



module.exports = router;