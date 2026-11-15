
import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  IndianRupee,
  Package,
  TrendingUp,
  ArrowUpRight,
  Clock,
  Truck,
  CheckCircle,
} from "lucide-react";

import { Link } from "react-router-dom";
import "../styles/AdminDashboard.css";

const API_URL = "https://shopnest-ecommerce-ek0w.onrender.com/api";

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState({
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch analytics and orders
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const [analyticsResponse, ordersResponse] =
          await Promise.all([
            axios.get(`${API_URL}/analytics`, config),
            axios.get(`${API_URL}/orders`, config),
          ]);

        setAnalytics(analyticsResponse.data);
        setOrders(ordersResponse.data.orders || []);
      } catch (error) {
        console.log("Dashboard Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Order status counts
  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const shippedOrders = orders.filter(
    (order) => order.status === "Shipped"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  // Dashboard cards
  const stats = [
    {
      title: "Total Revenue",
      value: `₹${Number(analytics.totalRevenue).toLocaleString("en-IN")}`,
      icon: IndianRupee,
      color: "#7c3aed",
      change: "Paid orders revenue",
    },
    {
      title: "Total Orders",
      value: analytics.totalOrders,
      icon: ShoppingBag,
      color: "#2563eb",
      change: "All orders",
    },
    {
      title: "Total Products",
      value: analytics.totalProducts,
      icon: Package,
      color: "#059669",
      change: "Listed products",
    },
    {
      title: "Total Users",
      value: analytics.totalUsers,
      icon: Users,
      color: "#ea580c",
      change: "Registered users",
    },
  ];

  // Last 7 days sales data
  const lastSevenDays = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));

    return {
      date,
      label: date.toLocaleDateString("en-IN", {
        weekday: "short",
      }),
      revenue: 0,
    };
  });

  orders.forEach((order) => {
    if (!order.isPaid || !order.createdAt) return;

    const orderDate = new Date(order.createdAt);

    const matchingDay = lastSevenDays.find(
      (day) =>
        day.date.getDate() === orderDate.getDate() &&
        day.date.getMonth() === orderDate.getMonth() &&
        day.date.getFullYear() === orderDate.getFullYear()
    );

    if (matchingDay) {
      matchingDay.revenue += Number(order.totalPrice || 0);
    }
  });

  const maxRevenue = Math.max(
    ...lastSevenDays.map((day) => day.revenue),
    1
  );

  // Recent 5 orders
  const recentOrders = [...orders]
    .sort(
      (a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
    )
    .slice(0, 5);

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <h2 className="admin-logo">
          Shop<span>nest.</span>
        </h2>

        <p className="sidebar-heading">MAIN MENU</p>

        <Link to="/admin" className="sidebar-link active">
          <LayoutDashboard size={19} />
          Dashboard
        </Link>

        <Link to="/admin/products" className="sidebar-link">
          <ShoppingBag size={19} />
          Products
        </Link>

        <Link to="/admin/orders" className="sidebar-link">
          <Package size={19} />
          Orders
        </Link>

        <Link to="/admin/customers"  className="sidebar-link">
    <Users size={20} />
    <span>Customers</span>
</Link>

        <div className="admin-sidebar-bottom">
          <p>SHOPNEST ADMIN PANEL</p>
          <span>Manage your store easily.</span>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header">
          <div>
            <h1>Dashboard Overview</h1>
            <p>
              Welcome back! Here's what's happening with your store.
            </p>
          </div>

          <div className="admin-profile">
            <div className="admin-avatar">A</div>
            <div>
              <strong>Administrator</strong>
              <span>Admin</span>
            </div>
          </div>
        </header>

        {/* Statistics Cards */}
        <section className="admin-stats">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div className="admin-stat-card" key={index}>
                <div
                  className="stat-icon"
                  style={{
                    background: `${item.color}18`,
                    color: item.color,
                  }}
                >
                  <Icon size={24} />
                </div>

                <p>{item.title}</p>
                <h2>{item.value}</h2>
                <span>{item.change}</span>
              </div>
            );
          })}
        </section>

        {/* Analytics */}
        <section className="admin-content-grid">
          <div className="admin-panel sales-panel">
            <div className="panel-heading">
              <div>
                <h2>Sales Analytics</h2>
                <p>Paid sales from the last 7 days</p>
              </div>

              <TrendingUp color="#16a34a" size={24} />
            </div>

            {loading ? (
              <div className="empty-chart">Loading sales...</div>
            ) : (
              <div className="sales-chart">
                {lastSevenDays.map((day, index) => (
                  <div className="chart-column" key={index}>
                    <span className="chart-amount">
                      ₹{day.revenue.toLocaleString("en-IN")}
                    </span>

                    <div className="chart-bar-area">
                      <div
                        className="chart-bar"
                        style={{
                          height: `${Math.max(
                            (day.revenue / maxRevenue) * 100,
                            3
                          )}%`,
                        }}
                      />
                    </div>

                    <span className="chart-day">
                      {day.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="admin-panel order-summary">
            <h2>Order Summary</h2>
            <p>Track your order status</p>

            <div className="order-summary-item">
              <Clock color="#f59e0b" />

              <div>
                <strong>Pending</strong>
                <span>Orders awaiting processing</span>
              </div>

              <b>{pendingOrders}</b>
            </div>

            <div className="order-summary-item">
              <Truck color="#2563eb" />

              <div>
                <strong>Shipped</strong>
                <span>Orders on the way</span>
              </div>

              <b>{shippedOrders}</b>
            </div>

            <div className="order-summary-item">
              <CheckCircle color="#16a34a" />

              <div>
                <strong>Delivered</strong>
                <span>Successfully delivered</span>
              </div>

              <b>{deliveredOrders}</b>
            </div>
          </div>
        </section>

        {/* Recent Orders */}
        <section className="admin-panel recent-orders">
          <div className="panel-heading">
            <div>
              <h2>Recent Orders</h2>
              <p>Latest customer orders</p>
            </div>

            <Link to="/admin/orders" className="view-all-orders">
              View All <ArrowUpRight size={18} />
            </Link>
          </div>

          {loading ? (
            <div className="empty-orders">
              Loading orders...
            </div>
          ) : recentOrders.length === 0 ? (
            <div className="empty-orders">
              <ShoppingBag size={35} />
              <h3>No orders to display</h3>
              <p>Customer orders will appear here.</p>
            </div>
          ) : (
            <div className="recent-orders-table-wrapper">
              <table className="recent-orders-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order._id}>
                      <td>#{order._id.slice(-6)}</td>

                      <td>
                        {order.user?.name ||
                          order.user?.email ||
                          "Customer"}
                      </td>

                      <td>
                        {new Date(
                          order.createdAt
                        ).toLocaleDateString("en-IN")}
                      </td>

                      <td>
                        ₹{Number(order.totalPrice || 0).toLocaleString("en-IN")}
                      </td>

                      <td>
                        <span
                          className={`recent-status ${(
                            order.status || "Pending"
                          ).toLowerCase()}`}
                        >
                          {order.status || "Pending"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <footer className="admin-footer">
          © 2026 Shopnest. All rights reserved.
        </footer>
      </main>
    </div>
  );
};

export default AdminDashboard;
