
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AdminOrders.css";

const API_URL = "http://localhost:3000/api";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `${API_URL}/orders`,
        config
      );

      setOrders(data.orders || []);
    } catch (error) {
      console.log("Orders Error:", error);
      alert(
        error.response?.data?.message || "Unable to fetch orders"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Update order status
  const updateStatus = async (orderId, status) => {
    try {
      await axios.put(
        `${API_URL}/orders/${orderId}/status`,
        { status },
        config
      );

      alert("Order status updated successfully!");
      fetchOrders();

      if (selectedOrder?._id === orderId) {
        setSelectedOrder({
          ...selectedOrder,
          status,
        });
      }
    } catch (error) {
      console.log("Status Update Error:", error);
      alert(
        error.response?.data?.message || "Status update failed"
      );
    }
  };

  if (loading) {
    return <div className="admin-orders-loading">Loading orders...</div>;
  }

  return (
    <div className="admin-orders-container">
      <div className="admin-orders-header">
        <div>
          <h2>Orders Management</h2>
          <p>Manage and track all customer orders</p>
        </div>

        <button onClick={fetchOrders} className="refresh-btn">
          Refresh Orders
        </button>
      </div>

      <div className="orders-table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Items</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="8" className="no-orders">
                  No orders found
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id}>
                  <td>#{order._id.slice(-6)}</td>

                  <td>
                    {order.user?.name || order.user?.email || "Customer"}
                  </td>

                  <td>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                  <td>{order.orderItems?.length || 0}</td>

                  <td>₹{order.totalPrice}</td>

                  <td>
                    {order.isPaid ? "Paid" : "Unpaid"}
                  </td>

                  <td>
                    <select
                      className="order-status-select"
                      value={order.status || "Pending"}
                      onChange={(e) =>
                        updateStatus(order._id, e.target.value)
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>

                  <td>
                    <button
                      className="view-order-btn"
                      onClick={() => setSelectedOrder(order)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div
          className="order-modal-overlay"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="order-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="order-modal-header">
              <h2>Order Details</h2>

              <button
                className="close-modal-btn"
                onClick={() => setSelectedOrder(null)}
              >
                ×
              </button>
            </div>

            <p>
              <strong>Order ID:</strong> {selectedOrder._id}
            </p>

            <p>
              <strong>Customer:</strong>{" "}
              {selectedOrder.user?.name || "Customer"}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {selectedOrder.user?.email || "N/A"}
            </p>

            <p>
              <strong>Payment Method:</strong>{" "}
              {selectedOrder.paymentMethod || "N/A"}
            </p>

            <p>
              <strong>Payment Status:</strong>{" "}
              {selectedOrder.isPaid ? "Paid" : "Unpaid"}
            </p>

            <p>
              <strong>Order Status:</strong>{" "}
              {selectedOrder.status}
            </p>

            <h3>Shipping Address</h3>

            <p>
              {selectedOrder.shippingAddress?.address},{" "}
              {selectedOrder.shippingAddress?.city},{" "}
              {selectedOrder.shippingAddress?.postalCode},{" "}
              {selectedOrder.shippingAddress?.country}
            </p>

            <h3>Ordered Products</h3>

            {selectedOrder.orderItems?.map((item, index) => (
              <div className="order-product-item" key={index}>
                <img
                  src={item.image}
                  alt={item.name}
                />

                <div>
                  <strong>{item.name}</strong>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ₹{item.price}</p>
                </div>
              </div>
            ))}

            <h3 className="order-total">
              Total Amount: ₹{selectedOrder.totalPrice}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
