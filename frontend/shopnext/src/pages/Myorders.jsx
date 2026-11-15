import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Package,
  MapPin,
  CreditCard,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Truck,
  XCircle,
  ShoppingBag,
} from "lucide-react";
import "../styles/myorders.css";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/orders/myorders",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setOrders(response.data.orders);
      } catch (error) {
        console.log(
          "Error fetching orders:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle2 size={17} />;

      case "Shipped":
        return <Truck size={17} />;

      case "Processing":
        return <Package size={17} />;

      case "Cancelled":
        return <XCircle size={17} />;

      default:
        return <Clock3 size={17} />;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Delivered":
        return "delivered";

      case "Shipped":
        return "shipped";

      case "Processing":
        return "processing";

      case "Cancelled":
        return "cancelled";

      default:
        return "pending";
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="orders-loading">
        <div className="loading-spinner"></div>
        <p>Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="my-orders-page">

      {/* HEADER */}

      <div className="orders-header">
        <div>
          <span className="orders-small-title">SHOPNEST</span>

          <h1>My Orders</h1>

          <p>
            Track your orders and check your purchase details
          </p>
        </div>

        <div className="orders-count">
          <Package size={22} />
          <div>
            <strong>{orders.length}</strong>
            <span>Total Orders</span>
          </div>
        </div>
      </div>


      {/* NO ORDERS */}

      {orders.length === 0 ? (
        <div className="empty-orders">

          <div className="empty-icon">
            <ShoppingBag size={45} />
          </div>

          <h2>No orders yet</h2>

          <p>
            You haven't placed any orders yet.
            Start shopping and your orders will appear here.
          </p>

          <button
            onClick={() => (window.location.href = "/shop")}
          >
            Start Shopping
          </button>

        </div>
      ) : (

        /* ORDERS */

        <div className="orders-list">

          {orders.map((order) => (

            <div className="order-card" key={order._id}>

              {/* ORDER TOP */}

              <div className="order-top">

                <div className="order-id">

                  <div className="order-icon">
                    <Package size={21} />
                  </div>

                  <div>
                    <span>ORDER ID</span>

                    <h3>
                      #{order._id.slice(-8).toUpperCase()}
                    </h3>
                  </div>

                </div>


                <div
                  className={`order-status ${getStatusClass(
                    order.status
                  )}`}
                >
                  {getStatusIcon(order.status)}
                  {order.status}
                </div>

              </div>


              {/* ORDER INFO */}

              <div className="order-info">

                <div className="info-box">

                  <CalendarDays size={18} />

                  <div>
                    <span>ORDER DATE</span>
                    <strong>
                      {formatDate(order.createdAt)}
                    </strong>
                  </div>

                </div>


                <div className="info-box">

                  <CreditCard size={18} />

                  <div>
                    <span>PAYMENT</span>

                    <strong>
                      {order.paymentMethod}
                    </strong>

                    <small
                      className={
                        order.isPaid
                          ? "paid"
                          : "unpaid"
                      }
                    >
                      {order.isPaid
                        ? "Payment completed"
                        : "Payment pending"}
                    </small>

                  </div>

                </div>


                <div className="info-box">

                  <Package size={18} />

                  <div>
                    <span>ITEMS</span>

                    <strong>
                      {order.orderItems.length}{" "}
                      {order.orderItems.length === 1
                        ? "Item"
                        : "Items"}
                    </strong>
                  </div>

                </div>


                <div className="info-box total-box">

                  <span>TOTAL AMOUNT</span>

                  <strong>
                    ₹{order.totalPrice.toLocaleString("en-IN")}
                  </strong>

                </div>

              </div>


              {/* PRODUCTS */}

              <div className="products-section">

                <h4>Order Items</h4>

                <div className="products-list">

                  {order.orderItems.map((item) => (

                    <div
                      className="order-product"
                      key={item.product}
                    >

                      <img
                        src={item.image}
                        alt={item.name}
                      />

                      <div className="product-details">

                        <h3>{item.name}</h3>

                        <p>
                          ₹{item.price.toLocaleString("en-IN")}
                        </p>

                        <span>
                          Quantity: {item.quantity}
                        </span>

                      </div>

                      <div className="product-total">

                        <span>Total</span>

                        <strong>
                          ₹
                          {(
                            item.price * item.quantity
                          ).toLocaleString("en-IN")}
                        </strong>

                      </div>

                    </div>

                  ))}

                </div>

              </div>


              {/* SHIPPING */}

              <div className="shipping-section">

                <div className="shipping-title">

                  <MapPin size={19} />

                  <strong>Delivery Address</strong>

                </div>

                <p>
                  {order.shippingAddress.address},{" "}
                  {order.shippingAddress.city},{" "}
                  {order.shippingAddress.postalCode},{" "}
                  {order.shippingAddress.country}
                </p>

              </div>


              {/* FOOTER */}

              <div className="order-footer">

                <span>
                  Thank you for shopping with{" "}
                  <strong>Shopnest</strong> ❤️
                </span>

                <strong className="footer-total">
                  ₹{order.totalPrice.toLocaleString("en-IN")}
                </strong>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default MyOrders;