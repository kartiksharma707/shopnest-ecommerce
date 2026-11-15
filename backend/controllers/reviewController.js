
const Review = require("../model/review");
const Product = require("../model/product");
const User = require("../model/user");

// Add Product Review
const addReview = async (req, res) => {

 const user = await User.findById(req.user._id);
   if (!user) {
  return res.status(404).json({
    message: "User not found"
  });
}
  try {
    const { rating, comment } = req.body;
    const productId = req.params.id;

    if (!rating || !comment) {
      return res.status(400).json({
        message: "Rating and comment are required"
      });
    }

    if (Number(rating) < 1 || Number(rating) > 5) {
      return res.status(400).json({
        message: "Rating must be between 1 and 5"
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    const alreadyReviewed = await Review.findOne({
      product: productId,
      user: req.user._id
    });

    if (alreadyReviewed) {
      return res.status(400).json({
        message: "You have already reviewed this product"
      });
    }

    const review = await Review.create({
      product: productId,
      user: req.user._id,
     name: user.name || "Customer",
      rating: Number(rating),
      comment
    });

    const reviews = await Review.find({ product: productId });

    const averageRating =
      reviews.reduce((total, item) => total + item.rating, 0) /
      reviews.length;

    product.rating = averageRating;
    product.numReviews = reviews.length;

    await product.save();

    res.status(201).json({
      message: "Review added successfully",
      review
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Get Product Reviews
const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      product: req.params.id
    }).sort({ createdAt: -1 });

    res.status(200).json({
      totalReviews: reviews.length,
      reviews
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = { addReview, getProductReviews };
