import { useSelector, useDispatch } from "react-redux";

import { removeFromWishlist } from "../redux/wishlistSlice";

import { addToCart } from "../redux/cartSlice";

import { Link } from "react-router-dom";

import "../styles/wishlist.css";


const Wishlist = () => {

  const dispatch = useDispatch();

  const wishlist = useSelector((state) => state.wishlist);


  const handleRemove = (id) => {

    dispatch(removeFromWishlist(id));

  };


  const handleAddToCart = (product) => {

    dispatch(addToCart(product));

  };


  return (

    <div className="wishlist-page">


      {/* Header */}

      <div className="wishlist-header">

        <h1>My Wishlist</h1>

        <p>
          {wishlist.length}{" "}
          {wishlist.length === 1 ? "item" : "items"} saved
        </p>

      </div>


      {wishlist.length === 0 ? (

        /* Empty Wishlist */

        <div className="empty-wishlist">

          <div className="empty-heart">
            ♡
          </div>

          <h2>Your Wishlist is Empty</h2>

          <p>
            Save your favorite products here and find them
            easily later.
          </p>

          <Link
            to="/shop"
            className="shop-button"
          >
            Continue Shopping
          </Link>

        </div>


      ) : (


        /* Wishlist Products */

        <div className="wishlist-grid">

          {wishlist.map((product) => (

            <div
              className="wishlist-card"
              key={product._id}
            >


              {/* Product Image */}

              <div className="wishlist-image-box">

                <img
                  src={product.imageUrl || product.image}
                  alt={product.name}
                />


                {/* Remove Wishlist */}

                <button
                  className="remove-wishlist"
                  onClick={() =>
                    handleRemove(product._id)
                  }
                >
                  ♥
                </button>

              </div>


              {/* Product Details */}

              <div className="wishlist-details">

                <h3>
                  {product.name}
                </h3>


                <p>
                  {product.description ||
                    product.discription}
                </p>


                {/* Price + Cart */}

                <div className="wishlist-bottom">

                  <span className="wishlist-price">
                    ${product.price}
                  </span>


                  <button
                    className="wishlist-cart"
                    onClick={() =>
                      handleAddToCart(product)
                    }
                  >
                    Add to Cart
                  </button>

                </div>


                {/* View Product */}

                <Link
                  to={`/product/${product._id}`}
                  className="wishlist-view"
                >
                  View Product
                </Link>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );
};


export default Wishlist;