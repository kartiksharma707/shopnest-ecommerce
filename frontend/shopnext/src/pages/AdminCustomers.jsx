
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search, Users, UserCheck, RefreshCw } from "lucide-react";
import "../styles/AdminCustomers.css";

const AdminCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchCustomers = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.get(
                "https://shopnest-ecommerce-ek0w.onrender.com/api/users",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const users = response.data.users || [];

            // Sirf normal customers show honge
            setCustomers(users.filter(user => user.role === "user"));

        } catch (error) {
            console.log("Customers Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const filteredCustomers = customers.filter(customer =>
        customer.name?.toLowerCase().includes(search.toLowerCase()) ||
        customer.email?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="customers-page">

            <div className="customers-header">
                <div>
                    <h1>Customers</h1>
                    <p>Manage your Shopnest customers</p>
                </div>

                <button className="customer-refresh" onClick={fetchCustomers}>
                    <RefreshCw size={17} />
                    Refresh
                </button>
            </div>

            <div className="customer-stats">

                <div className="customer-stat-card">
                    <div className="customer-stat-icon purple">
                        <Users size={25} />
                    </div>
                    <div>
                        <p>Total Customers</p>
                        <h2>{customers.length}</h2>
                    </div>
                </div>

                <div className="customer-stat-card">
                    <div className="customer-stat-icon green">
                        <UserCheck size={25} />
                    </div>
                    <div>
                        <p>Registered Customers</p>
                        <h2>{customers.length}</h2>
                    </div>
                </div>

            </div>

            <div className="customers-table-section">

                <div className="customers-table-header">
                    <div>
                        <h2>All Customers</h2>
                        <p>View and search registered customers</p>
                    </div>

                    <div className="customer-search">
                        <Search size={18} />
                        <input
                            type="text"
                            placeholder="Search customers..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className="customers-table-wrapper">
                    <table className="customers-table">
                        <thead>
                            <tr>
                                <th>Customer</th>
                                <th>Email Address</th>
                                <th>Role</th>
                                <th>Verification</th>
                                <th>Registration Date</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="5">Loading customers...</td>
                                </tr>
                            ) : filteredCustomers.length === 0 ? (
                                <tr>
                                    <td colSpan="5">No customers found</td>
                                </tr>
                            ) : (
                                filteredCustomers.map(customer => (
                                    <tr key={customer._id}>
                                        <td>
                                            <div className="customer-name">
                                                <div className="customer-avatar">
                                                    {customer.name?.charAt(0).toUpperCase()}
                                                </div>
                                                <strong>{customer.name}</strong>
                                            </div>
                                        </td>

                                        <td>{customer.email}</td>

                                        <td>
                                            <span className="customer-role">
                                                {customer.role}
                                            </span>
                                        </td>

                                        <td>
                                            <span className={
                                                customer.verified
                                                    ? "verified-badge"
                                                    : "unverified-badge"
                                            }>
                                                {customer.verified ? "Verified" : "Pending"}
                                            </span>
                                        </td>

                                        <td>
                                            {customer.createdAt
                                                ? new Date(customer.createdAt).toLocaleDateString("en-IN")
                                                : "Not available"}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

            </div>

        </div>
    );
};

export default AdminCustomers;
