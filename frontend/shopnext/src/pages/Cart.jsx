import React from "react";
import { useDispatch, useSelector } from "react-redux";
import{useNavigate} from "react-router-dom";
import { AuthContext } from "../context/Authcontext";

import {
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = React.useContext(AuthContext);

  const cartItems = useSelector((state) => state.cart);

  // Total price
  const totalPrice = cartItems.reduce(
    (total, product) =>
      total + product.price * product.quantity,
    0
  );

  // Empty cart
  if (cartItems.length === 0) {
    return (
      <div style={styles.emptyCart}>
        <h2>Your Cart is Empty 🛒</h2>
        <p>Add some products to your cart.</p>
      </div>
    );
  }

  return (
    <div style={styles.page}>

      <h1 style={styles.heading}>Shopping Cart</h1>

      <div style={styles.container}>

        {/* Cart Products */}
        <div style={styles.products}>

          {cartItems.map((product) => (
            <div
              key={product._id}
              style={styles.product}
            >

              {/* Product Image */}
              <img
                src={product.imageUrl || product.image}
                alt={product.name}
                style={styles.image}
              />

              {/* Product Info */}
              <div style={styles.info}>

                <h3 style={styles.name}>
                  {product.name}
                </h3>

                <p style={styles.price}>
                  ${product.price}
                </p>

                {/* Quantity */}
                <div style={styles.quantityBox}>

                  <button
                    onClick={() =>
                      dispatch(
                        decreaseQuantity(product._id)
                      )
                    }
                    style={styles.quantityButton}
                  >
                    −
                  </button>

                  <span style={styles.quantity}>
                    {product.quantity}
                  </span>

                  <button
                    onClick={() =>
                      dispatch(
                        increaseQuantity(product._id)
                      )
                    }
                    style={styles.quantityButton}
                  >
                    +
                  </button>

                </div>

                {/* Product Total */}
                <p style={styles.productTotal}>
                  Total: $
                  {product.price * product.quantity}
                </p>

                {/* Remove */}
                <button
                  onClick={() =>
                    dispatch(
                      removeFromCart(product._id)
                    )
                  }
                  style={styles.removeButton}
                >
                  Remove
                </button>

              </div>
            </div>
          ))}

        </div>

        {/* Order Summary */}
        <div style={styles.summary}>

          <h2>Order Summary</h2>

          <div style={styles.summaryRow}>
            <span>Products</span>
            <strong>{cartItems.length}</strong>
          </div>

          <div style={styles.line}></div>

          <div style={styles.totalRow}>
            <span>Total</span>
            <strong>${totalPrice}</strong>
          </div>

          <button
  onClick={() => {
    if (!user) {
      navigate("/login");
      return;
    }

    navigate("/checkout");
  }}
  style={styles.checkoutButton}
>
  Proceed to Checkout
</button>

          <button
            onClick={() => dispatch(clearCart())}
            style={styles.clearButton}
          >
            Clear Cart
          </button>

        </div>

      </div>
    </div>
  );
};

const styles = {

  page: {
    minHeight: "70vh",
    padding: "50px 7%",
    background: "#faf9fd",
  },

  heading: {
    textAlign: "center",
    color: "#24104f",
    marginBottom: "35px",
  },

  container: {
    maxWidth: "1200px",
    margin: "auto",
    display: "grid",
    gridTemplateColumns: "1fr 350px",
    gap: "30px",
    alignItems: "start",
  },

  products: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },

  product: {
    display: "flex",
    gap: "22px",
    background: "white",
    padding: "20px",
    borderRadius: "16px",
    border: "1px solid #eee",
  },

  image: {
    width: "140px",
    height: "140px",
    objectFit: "cover",
    borderRadius: "12px",
    background: "#f5f3f8",
  },

  info: {
    flex: 1,
  },

  name: {
    margin: "0 0 10px",
    color: "#24104f",
    fontSize: "20px",
  },

  price: {
    margin: "0 0 15px",
    color: "#7c3aed",
    fontSize: "18px",
    fontWeight: "700",
  },

  quantityBox: {
    display: "flex",
    alignItems: "center",
    width: "fit-content",
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    marginBottom: "12px",
  },

  quantityButton: {
    width: "38px",
    height: "36px",
    border: "none",
    background: "#f3efff",
    color: "#6d28d9",
    fontSize: "20px",
    fontWeight: "600",
    cursor: "pointer",
  },

  quantity: {
    width: "42px",
    textAlign: "center",
    fontSize: "16px",
    fontWeight: "600",
  },

  productTotal: {
    margin: "8px 0 12px",
    fontWeight: "600",
    color: "#444",
  },

  removeButton: {
    border: "none",
    background: "#fee2e2",
    color: "#dc2626",
    padding: "8px 14px",
    borderRadius: "7px",
    cursor: "pointer",
    fontWeight: "600",
  },

  summary: {
    background: "white",
    padding: "25px",
    borderRadius: "16px",
    border: "1px solid #eee",
  },

  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
    color: "#555",
  },

  line: {
    height: "1px",
    background: "#eee",
    margin: "20px 0",
  },

  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "20px",
    color: "#24104f",
  },

  checkoutButton: {
    width: "100%",
    marginTop: "25px",
    padding: "13px",
    border: "none",
    borderRadius: "9px",
    background: "#7c3aed",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
  },

  clearButton: {
    width: "100%",
    marginTop: "10px",
    padding: "11px",
    border: "none",
    borderRadius: "9px",
    background: "#f3f3f3",
    color: "#555",
    cursor: "pointer",
  },

  emptyCart: {
    minHeight: "60vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "#faf9fd",
  },
};

export default Cart;