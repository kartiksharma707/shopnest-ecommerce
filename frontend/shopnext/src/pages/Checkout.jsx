import React, { useState } from "react";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  MapPin,
  Phone,
  User,
  CreditCard,
  Banknote,
  ShoppingBag,
  ShieldCheck,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";

import { clearCart } from "../redux/cartSlice";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart);

  // Delivery Address
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState("COD");



  // Loading
  const [loading, setLoading] = useState(false);

  // Total Price
  const totalPrice = cartItems.reduce(
    (total, product) =>
      total + product.price * product.quantity,
    0
  );

  // Handle Input Change
  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  // Place Order
  // Place Order
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Cart products ko backend ke order format me convert karna
      const orderItems = cartItems.map((product) => ({
        name: product.name,
        quantity: product.quantity,
        image: product.imageUrl || product.image,
        price: product.price,
        product: product._id,
      }));

      // Backend ke according shipping address
      const shippingAddress = {
        address: address.address,
        city: address.city,
        postalCode: address.pincode,
        country: "India",
      };

      // =========================
      // RAZORPAY ONLINE PAYMENT
      // =========================
      if (paymentMethod === "Razorpay") {

        const paymentResponse = await axios.post(
          "https://shopnest-ecommerce-ek0w.onrender.com/api/payment/create-order",
          {
            amount: totalPrice,
            currency: "INR",
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        console.log("Razorpay Order Created:", paymentResponse.data);

        const razorpayOrder = paymentResponse.data.order;
        console.log("Razorpay Key:", import.meta.env.VITE_RAZORPAY_KEY_ID);

        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,

          amount: razorpayOrder.amount,

          currency: razorpayOrder.currency,

          name: "Shopnest",

          description: "Shopnest Order",

          order_id: razorpayOrder.id,

          handler: async function (response) {
            console.log("Payment Success:", response);

            try {
              const verifyResponse = await axios.post(
                "https://shopnest-ecommerce-ek0w.onrender.com/api/payment/verify",
                {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,

                  orderItems,
                  shippingAddress,
                  paymentMethod,
                  totalPrice,
                },
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );

              console.log("Payment Verification:", verifyResponse.data);

              dispatch(clearCart());

              alert("Payment successful! Order placed 🎉");

              navigate("/");
            } catch (error) {
              console.log(
                "Payment Verification Error:",
                error.response?.data || error.message
              );

              alert("Payment successful, but order verification failed.");
            }
          },

          prefill: {
            name: address.name,
            contact: address.phone,
          },

          theme: {
            color: "#7c3aed",
          },
        };

        const razorpay = new window.Razorpay(options);

        razorpay.open();

        return;
      }
      // =========================
      // COD ORDER
      // =========================

      const response = await axios.post(
        "https://shopnest-ecommerce-ek0w.onrender.com/api/orders",
        {
          orderItems,
          shippingAddress,
          paymentMethod,
          totalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Order created:", response.data);

      // Cart clear
      dispatch(clearCart());

      // Success message
      alert("Order placed successfully! 🎉");

      // Home page
      navigate("/");
    } catch (error) {
      console.log("Order / Payment error:", error);

      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  // Empty Cart
  if (cartItems.length === 0) {
    return (
      <>
        <style>{styles}</style>

        <div className="checkout-empty">
          <div className="empty-icon">
            <ShoppingBag size={38} />
          </div>

          <h2>Your Cart is Empty</h2>

          <p>
            Add some products to your cart before checkout.
          </p>

          <button
            className="continue-shopping"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>

      <div className="checkout-page">

        {/* HEADER */}

        <div className="checkout-header">

          <button
            className="back-button"
            onClick={() => navigate("/cart")}
          >
            <ArrowLeft size={18} />
            Back to Cart
          </button>

          <div className="checkout-title">
            <h1>Checkout</h1>
            <p>Complete your order securely</p>
          </div>

          <div className="secure-badge">
            <ShieldCheck size={17} />
            Secure Checkout
          </div>

        </div>

        {/* STEPS */}

        <div className="checkout-steps">

          <div className="checkout-step active">
            <span>1</span>
            <p>Delivery</p>
          </div>

          <div className="step-line"></div>

          <div className="checkout-step">
            <span>2</span>
            <p>Payment</p>
          </div>

          <div className="step-line"></div>

          <div className="checkout-step">
            <span>3</span>
            <p>Confirmation</p>
          </div>

        </div>

        {/* FORM */}

        <form onSubmit={handleSubmit}>

          <div className="checkout-container">

            {/* LEFT SIDE */}

            <div className="checkout-left">

              {/* DELIVERY ADDRESS */}

              <div className="checkout-card">

                <div className="card-heading">

                  <div className="heading-icon">
                    <MapPin size={21} />
                  </div>

                  <div>
                    <h2>Delivery Address</h2>

                    <p>
                      Enter the address where you want your
                      order delivered.
                    </p>
                  </div>

                </div>

                <div className="form-grid">

                  {/* NAME */}

                  <div className="form-group">

                    <label>Full Name</label>

                    <div className="input-wrapper">

                      <User size={18} />

                      <input
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                        value={address.name}
                        onChange={handleChange}
                        required
                      />

                    </div>

                  </div>

                  {/* PHONE */}

                  <div className="form-group">

                    <label>Phone Number</label>

                    <div className="input-wrapper">

                      <Phone size={18} />

                      <input
                        type="tel"
                        name="phone"
                        placeholder="Enter phone number"
                        value={address.phone}
                        onChange={handleChange}
                        required
                      />

                    </div>

                  </div>

                  {/* ADDRESS */}

                  <div className="form-group full-width">

                    <label>Complete Address</label>

                    <textarea
                      name="address"
                      placeholder="House no, street, area, landmark..."
                      value={address.address}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  {/* CITY */}

                  <div className="form-group">

                    <label>City</label>

                    <input
                      className="normal-input"
                      type="text"
                      name="city"
                      placeholder="Enter city"
                      value={address.city}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  {/* STATE */}

                  <div className="form-group">

                    <label>State</label>

                    <input
                      className="normal-input"
                      type="text"
                      name="state"
                      placeholder="Enter state"
                      value={address.state}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  {/* PINCODE */}

                  <div className="form-group">

                    <label>Pincode</label>

                    <input
                      className="normal-input"
                      type="text"
                      name="pincode"
                      placeholder="Enter pincode"
                      value={address.pincode}
                      onChange={handleChange}
                      required
                    />

                  </div>

                </div>

              </div>

              {/* PAYMENT */}

              <div className="checkout-card">

                <div className="card-heading">

                  <div className="heading-icon">
                    <CreditCard size={21} />
                  </div>

                  <div>
                    <h2>Payment Method</h2>

                    <p>
                      Choose your preferred payment method.
                    </p>
                  </div>

                </div>

                {/* COD */}

                <label
                  className={`payment-option ${paymentMethod === "COD"
                    ? "selected"
                    : ""
                    }`}
                >

                  <input
                    type="radio"
                    name="payment"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={(e) =>
                      setPaymentMethod(e.target.value)
                    }
                  />

                  <div className="payment-icon">
                    <Banknote size={21} />
                  </div>

                  <div className="payment-content">

                    <strong>Cash on Delivery</strong>

                    <span>
                      Pay when your order arrives
                    </span>

                  </div>

                  {paymentMethod === "COD" && (
                    <CheckCircle
                      className="selected-icon"
                      size={21}
                    />
                  )}

                </label>

                {/* RAZORPAY */}

                <label
                  className={`payment-option ${paymentMethod === "Razorpay"
                    ? "selected"
                    : ""
                    }`}
                >

                  <input
                    type="radio"
                    name="payment"
                    value="Razorpay"
                    checked={
                      paymentMethod === "Razorpay"
                    }
                    onChange={(e) =>
                      setPaymentMethod(e.target.value)
                    }
                  />

                  <div className="payment-icon">
                    <CreditCard size={21} />
                  </div>

                  <div className="payment-content">

                    <strong>Online Payment</strong>

                    <span>
                      Pay securely using Razorpay
                    </span>

                  </div>

                  {paymentMethod === "Razorpay" && (
                    <CheckCircle
                      className="selected-icon"
                      size={21}
                    />
                  )}

                </label>

              </div>

            </div>

            {/* RIGHT SIDE */}

            <div className="order-summary">

              <div className="summary-heading">

                <div>
                  <h2>Order Summary</h2>
                  <p>Review your items</p>
                </div>

                <span>
                  {cartItems.length} Items
                </span>

              </div>

              {/* PRODUCTS */}

              <div className="summary-products">

                {cartItems.map((product) => (

                  <div
                    className="summary-product"
                    key={product._id}
                  >

                    <div className="product-image-wrapper">

                      <img
                        src={
                          product.imageUrl ||
                          product.image
                        }
                        alt={product.name}
                      />

                      <span className="quantity-badge">
                        {product.quantity}
                      </span>

                    </div>

                    <div className="summary-product-info">

                      <h4>{product.name}</h4>

                      <p>
                        ${product.price} ×{" "}
                        {product.quantity}
                      </p>

                    </div>

                    <strong>
                      $
                      {product.price *
                        product.quantity}
                    </strong>

                  </div>

                ))}

              </div>

              <div className="summary-line"></div>

              {/* PRICE */}

              <div className="price-row">

                <span>Subtotal</span>

                <strong>
                  ${totalPrice}
                </strong>

              </div>

              <div className="price-row">

                <span>Delivery</span>

                <strong className="free">
                  FREE
                </strong>

              </div>

              <div className="summary-line"></div>

              <div className="grand-total">

                <span>Total Amount</span>

                <strong>
                  ${totalPrice}
                </strong>

              </div>

              {/* PLACE ORDER */}

              <button
                type="submit"
                className="place-order-button"
                disabled={loading}
              >
                <ShieldCheck size={19} />

                {loading
                  ? "Placing Order..."
                  : "Place Order"}
              </button>

              <div className="secure-note">

                <ShieldCheck size={15} />

                <span>
                  Your payment information is secure
                  and protected.
                </span>

              </div>

            </div>

          </div>

        </form>

      </div>
    </>
  );
};

const styles = `

* {
  box-sizing: border-box;
}

.checkout-page {
  min-height: 100vh;
  background: #f8f7fc;
  padding: 35px 6% 70px;
  color: #24104f;
}

.checkout-header {
  max-width: 1250px;
  margin: 0 auto 28px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 7px;
  border: none;
  background: transparent;
  color: #6d28d9;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

.back-button:hover {
  color: #4c1d95;
}

.checkout-title {
  text-align: center;
}

.checkout-title h1 {
  margin: 0;
  font-size: 38px;
  font-weight: 800;
  color: #24104f;
}

.checkout-title p {
  margin: 6px 0 0;
  color: #888;
  font-size: 13px;
}

.secure-badge {
  justify-self: end;
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 9px 14px;
  border-radius: 30px;
  background: #eee7ff;
  color: #6d28d9;
  font-size: 13px;
  font-weight: 600;
}

.checkout-steps {
  max-width: 650px;
  margin: 0 auto 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkout-step {
  display: flex;
  align-items: center;
  gap: 7px;
  color: #aaa;
  font-size: 13px;
  font-weight: 600;
}

.checkout-step span {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e9e6ed;
  color: #888;
  font-size: 12px;
}

.checkout-step.active {
  color: #7c3aed;
}

.checkout-step.active span {
  background: #7c3aed;
  color: white;
}

.step-line {
  width: 60px;
  height: 1px;
  background: #ddd;
  margin: 0 14px;
}

.checkout-container {
  max-width: 1250px;
  margin: auto;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 390px;
  gap: 28px;
  align-items: start;
}

.checkout-left {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.checkout-card,
.order-summary {
  background: white;
  border: 1px solid #ebe7f2;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(45, 25, 80, 0.05);
}

.checkout-card {
  padding: 30px;
}

.card-heading {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 28px;
}

.heading-icon {
  width: 46px;
  height: 46px;
  border-radius: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0eaff;
  color: #7c3aed;
}

.card-heading h2 {
  margin: 0 0 5px;
  font-size: 21px;
  font-weight: 750;
  color: #24104f;
}

.card-heading p {
  margin: 0;
  color: #888;
  font-size: 13px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  font-size: 13px;
  font-weight: 650;
  color: #40384d;
}

.input-wrapper {
  height: 47px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 13px;
  border: 1px solid #ddd8e8;
  border-radius: 10px;
  background: #fcfbfe;
  color: #927cae;
  transition: 0.2s;
}

.input-wrapper:focus-within {
  border-color: #8b5cf6;
  background: white;
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.08);
}

.input-wrapper input {
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  color: #333;
}

.input-wrapper input::placeholder,
.normal-input::placeholder,
.form-group textarea::placeholder {
  color: #aaa;
}

.normal-input {
  width: 100%;
  height: 47px;
  padding: 0 13px;
  border: 1px solid #ddd8e8;
  border-radius: 10px;
  background: #fcfbfe;
  outline: none;
  font-size: 14px;
  color: #333;
  transition: 0.2s;
}

.normal-input:focus {
  border-color: #8b5cf6;
  background: white;
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.08);
}

.form-group textarea {
  width: 100%;
  min-height: 100px;
  resize: vertical;
  padding: 13px;
  border: 1px solid #ddd8e8;
  border-radius: 10px;
  background: #fcfbfe;
  outline: none;
  font-family: inherit;
  font-size: 14px;
  color: #333;
  transition: 0.2s;
}

.form-group textarea:focus {
  border-color: #8b5cf6;
  background: white;
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.08);
}

.payment-option {
  min-height: 78px;
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 15px 17px;
  margin-bottom: 12px;
  border: 1px solid #e3deeb;
  border-radius: 13px;
  cursor: pointer;
  transition: 0.2s;
}

.payment-option:hover {
  border-color: #c8b5e8;
  background: #fcfaff;
}

.payment-option.selected {
  border: 2px solid #7c3aed;
  background: #faf7ff;
}

.payment-option input {
  accent-color: #7c3aed;
  width: 16px;
  height: 16px;
}

.payment-icon {
  width: 42px;
  height: 42px;
  flex-shrink: 0;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #eee7ff;
  color: #7c3aed;
}

.payment-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.payment-content strong {
  color: #30263b;
  font-size: 14px;
}

.payment-content span {
  color: #888;
  font-size: 12px;
}

.selected-icon {
  color: #7c3aed;
}

.order-summary {
  padding: 25px;
  position: sticky;
  top: 20px;
}

.summary-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 22px;
}

.summary-heading h2 {
  margin: 0 0 5px;
  font-size: 21px;
}

.summary-heading p {
  margin: 0;
  color: #999;
  font-size: 12px;
}

.summary-heading span {
  padding: 6px 10px;
  border-radius: 20px;
  background: #eee7ff;
  color: #6d28d9;
  font-size: 12px;
  font-weight: 700;
}

.summary-products {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.summary-product {
  display: flex;
  align-items: center;
  gap: 11px;
}

.product-image-wrapper {
  position: relative;
  flex-shrink: 0;
}

.product-image-wrapper img {
  width: 58px;
  height: 58px;
  object-fit: cover;
  border-radius: 10px;
  background: #f5f3f8;
}

.quantity-badge {
  position: absolute;
  top: -6px;
  right: -6px;
  min-width: 19px;
  height: 19px;
  padding: 0 4px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #7c3aed;
  color: white;
  font-size: 10px;
  font-weight: 700;
}

.summary-product-info {
  flex: 1;
  min-width: 0;
}

.summary-product-info h4 {
  margin: 0 0 5px;
  color: #30263b;
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.summary-product-info p {
  margin: 0;
  color: #999;
  font-size: 12px;
}

.summary-product > strong {
  color: #24104f;
  font-size: 14px;
}

.summary-line {
  height: 1px;
  background: #eee;
  margin: 22px 0;
}

.price-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 13px;
  color: #666;
  font-size: 14px;
}

.price-row strong {
  color: #30263b;
}

.price-row .free {
  color: #16a34a;
  font-size: 12px;
}

.grand-total {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.grand-total span {
  color: #30263b;
  font-size: 16px;
  font-weight: 600;
}

.grand-total strong {
  color: #24104f;
  font-size: 22px;
}

.place-order-button {
  width: 100%;
  margin-top: 23px;
  padding: 14px;
  border: none;
  border-radius: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: #7c3aed;
  color: white;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 8px 18px rgba(124, 58, 237, 0.25);
  transition: 0.2s;
}

.place-order-button:hover {
  background: #6d28d9;
  transform: translateY(-1px);
}

.place-order-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.secure-note {
  margin-top: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  color: #999;
  font-size: 11px;
}

.checkout-empty {
  min-height: 70vh;
  background: #f8f7fc;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.empty-icon {
  width: 78px;
  height: 78px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #eee7ff;
  color: #7c3aed;
  margin-bottom: 18px;
}

.checkout-empty h2 {
  margin: 0 0 8px;
  color: #24104f;
  font-size: 25px;
}

.checkout-empty p {
  margin: 0;
  color: #888;
  font-size: 14px;
}

.continue-shopping {
  margin-top: 20px;
  padding: 12px 24px;
  border: none;
  border-radius: 9px;
  background: #7c3aed;
  color: white;
  font-weight: 600;
  cursor: pointer;
}

@media (max-width: 900px) {

  .checkout-header {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .checkout-title {
    order: -1;
  }

  .back-button {
    justify-self: center;
  }

  .secure-badge {
    justify-self: center;
  }

  .checkout-container {
    grid-template-columns: 1fr;
  }

  .order-summary {
    position: static;
  }
}

@media (max-width: 650px) {

  .checkout-page {
    padding: 25px 15px 50px;
  }

  .checkout-title h1 {
    font-size: 30px;
  }

  .checkout-steps {
    margin-bottom: 28px;
  }

  .step-line {
    width: 25px;
    margin: 0 7px;
  }

  .checkout-step p {
    display: none;
  }

  .checkout-card,
  .order-summary {
    padding: 20px;
    border-radius: 16px;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .form-group.full-width {
    grid-column: auto;
  }

  .card-heading {
    align-items: flex-start;
  }

  .card-heading h2 {
    font-size: 18px;
  }

  .card-heading p {
    font-size: 12px;
  }

  .grand-total strong {
    font-size: 20px;
  }
}
`;

export default Checkout;