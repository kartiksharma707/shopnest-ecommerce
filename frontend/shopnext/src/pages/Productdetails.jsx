
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { AuthContext } from "../context/Authcontext";
import axios from "axios";
import { Star } from "lucide-react";
import { toast } from "react-toastify";

const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch Product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `https://shopnest-ecommerce-ek0w.onrender.com/api/products/${id}`
        );
        setProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  // Fetch Reviews
  const fetchReviews = async () => {
    try {
      const res = await axios.get(
        `https://shopnest-ecommerce-ek0w.onrender.com/api/products/${id}/reviews`
      );

      setReviews(res.data.reviews || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [id]);

  // Add To Cart
  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success("Product added to cart!");
  };

  // Submit Review
  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to write a review");
      return;
    }

    if (rating === 0 || !comment.trim()) {
      toast.error("Please select rating and write a review");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      await axios.post(
        `https://shopnest-ecommerce-ek0w.onrender.com/api/products/${id}/reviews`,
        {
          rating,
          comment
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success("Review submitted successfully!");

      setRating(0);
      setComment("");

      await fetchReviews();

      // Refresh product average rating
      const productRes = await axios.get(
        `https://shopnest-ecommerce-ek0w.onrender.com/api/products/${id}`
      );
      setProduct(productRes.data);

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div style={styles.page}>

      {/* Product Details */}
      <div style={styles.container}>

        <div style={styles.imageBox}>
          <img
            src={product.imageUrl || product.image}
            alt={product.name}
            style={styles.image}
          />
        </div>

        <div style={styles.details}>

          <p style={styles.category}>
            {product.category}
          </p>

          <h1>{product.name}</h1>

          <p style={styles.description}>
            {product.description || product.discription}
          </p>

          <div style={styles.ratingSummary}>
            <Star size={20} fill="#f59e0b" color="#f59e0b" />
            <strong>{Number(product.rating || 0).toFixed(1)}</strong>
            <span>({product.numReviews || 0} Reviews)</span>
          </div>

          <h2 style={styles.price}>
            ₹{product.price}
          </h2>

          <p>
            <strong>Stock:</strong> {product.stock}
          </p>

          <button
            onClick={handleAddToCart}
            style={styles.button}
          >
            Add to Cart
          </button>

        </div>
      </div>

      {/* Reviews Section */}
      <div style={styles.reviewContainer}>

        <h2>Customer Reviews</h2>

        {/* Write Review */}
        <div style={styles.reviewForm}>

          <h3>Write a Review</h3>

          {!user ? (
            <p>Please login to write a review.</p>
          ) : (
            <form onSubmit={handleReviewSubmit}>

              <p>Select Rating:</p>

              <div style={styles.stars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={30}
                    color={star <= rating ? "#f59e0b" : "#ccc"}
                    fill={star <= rating ? "#f59e0b" : "none"}
                    style={{ cursor: "pointer" }}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>

              <textarea
                placeholder="Write your experience..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                style={styles.textarea}
                required
              />

              <button
                type="submit"
                style={styles.button}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Review"}
              </button>

            </form>
          )}

        </div>

        {/* All Reviews */}
        <div style={styles.reviewsList}>

          <h3>All Reviews ({reviews.length})</h3>

          {reviews.length === 0 ? (
            <p>No reviews yet. Be the first to review!</p>
          ) : (
            reviews.map((review) => (
              <div key={review._id} style={styles.reviewCard}>

                <h4>{review.name}</h4>

                <div style={styles.stars}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={17}
                      color={star <= review.rating ? "#f59e0b" : "#ccc"}
                      fill={star <= review.rating ? "#f59e0b" : "none"}
                    />
                  ))}
                </div>

                <p>{review.comment}</p>

                <small>
                  {new Date(review.createdAt).toLocaleDateString()}
                </small>

              </div>
            ))
          )}

        </div>

      </div>

    </div>
  );
};

const styles = {
  page: {
    minHeight: "70vh",
    padding: "60px 7%",
    background: "#faf9fd",
  },

  container: {
    maxWidth: "1100px",
    margin: "auto",
    background: "white",
    padding: "40px",
    borderRadius: "20px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "50px",
    alignItems: "center",
  },

  imageBox: {
    width: "100%",
    height: "450px",
    background: "#f5f3f8",
    borderRadius: "15px",
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  details: {
    padding: "20px",
  },

  category: {
    color: "#7c3aed",
    fontWeight: "600",
    textTransform: "uppercase",
    fontSize: "13px",
  },

  description: {
    color: "#666",
    lineHeight: "1.7",
    margin: "20px 0",
  },

  price: {
    color: "#24104f",
    fontSize: "30px",
    margin: "20px 0",
  },

  ratingSummary: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "15px",
  },

  button: {
    marginTop: "20px",
    padding: "14px 30px",
    border: "none",
    borderRadius: "10px",
    background: "#7c3aed",
    color: "white",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
  },

  reviewContainer: {
    maxWidth: "1100px",
    margin: "40px auto",
    background: "white",
    padding: "35px",
    borderRadius: "20px",
  },

  reviewForm: {
    marginTop: "25px",
    padding: "25px",
    background: "#faf9fd",
    borderRadius: "15px",
  },

  stars: {
    display: "flex",
    gap: "7px",
    margin: "15px 0",
  },

  textarea: {
    width: "100%",
    minHeight: "110px",
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    outline: "none",
    resize: "vertical",
    fontSize: "15px",
    boxSizing: "border-box",
  },

  reviewsList: {
    marginTop: "35px",
  },

  reviewCard: {
    padding: "20px",
    borderBottom: "1px solid #eee",
  },
};

export default Product;
