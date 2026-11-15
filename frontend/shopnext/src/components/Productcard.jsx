
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { addToCart } from "../redux/cartSlice";
import { toast } from "react-toastify";

import {
  addToWishlist,
  removeFromWishlist,
} from "../redux/wishlistSlice";

import css from "../styles/productcard.module.css";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  // Wishlist se products lena
  const wishlist = useSelector((state) => state.wishlist);

  // Check karna ki product wishlist me hai ya nahi
  const isWishlisted = wishlist.some(
    (item) => item._id === product._id
  );

  // Add to cart
  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success("Product added to cart! 🛒");
  };

  // Add / Remove wishlist
  const handleWishlist = () => {
    if (isWishlisted) {
      dispatch(removeFromWishlist(product._id));
      toast.info("Removed from wishlist!");
    } else {
      dispatch(addToWishlist(product));
      toast.success("Added to wishlist! ❤️");
    }
  };

  return (
    <div className={css.card}>
      {/* Product Image */}
      <div className={css.imageBox}>
        <img
          src={product.imageUrl || product.image}
          alt={product.name}
          className={css.image}
        />

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className={css.wishlistButton}
          aria-label="Add to wishlist"
        >
          <Heart
            size={18}
            strokeWidth={2.2}
            fill={isWishlisted ? "#e11d48" : "none"}
            color={isWishlisted ? "#e11d48" : "#555"}
          />
        </button>
      </div>

      {/* Product Details */}
      <div className={css.details}>
        <h3 className={css.title}>{product.name}</h3>

        <p className={css.description}>
          {product.description || product.discription}
        </p>

        {/* Price + Add to Cart */}
        <div className={css.bottom}>
          <span className={css.price}>${product.price}</span>

          <button
            onClick={handleAddToCart}
            className={css.cartButton}
          >
            Add to Cart
          </button>
        </div>

        {/* View Product */}
        <Link
          to={`/product/${product._id}`}
          className={css.viewButton}
        >
          View Product
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
