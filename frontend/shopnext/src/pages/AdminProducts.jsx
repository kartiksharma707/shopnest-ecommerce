
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Plus, Pencil, Trash2, ArrowLeft, X, Package
} from "lucide-react";
import "../styles/AdminProducts.css";

const API = "http://localhost:3000/api/products";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    discription: "",
    price: "",
    category: "",
    stock: "",
    image: null
  });

  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(API);
      setProducts(data);
    } catch (error) {
      console.log("Products Error:", error);
      alert("Products load nahi ho paye.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setForm({
      ...form,
      [name]: files ? files[0] : value
    });
  };

  const openAddForm = () => {
    setEditId(null);
    setForm({
      name: "",
      discription: "",
      price: "",
      category: "",
      stock: "",
      image: null
    });
    setShowForm(true);
  };

  const openEditForm = (product) => {
    setEditId(product._id);
    setForm({
      name: product.name,
      discription: product.discription,
      price: product.price,
      category: product.category,
      stock: product.stock,
      image: null
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!editId && !form.image) {
      alert("Please select product image.");
      return;
    }

    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("discription", form.discription);
      formData.append("price", form.price);
      formData.append("category", form.category);
      formData.append("stock", form.stock);

      if (form.image) {
        formData.append("image", form.image);
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      if (editId) {
        await axios.put(`${API}/${editId}`, formData, config);
        alert("Product updated successfully!");
      } else {
        await axios.post(API, formData, config);
        alert("Product added successfully!");
      }

      setShowForm(false);
      fetchProducts();

    } catch (error) {
      console.log("Save Product Error:", error);
      alert(error.response?.data?.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert("Product deleted successfully!");
      fetchProducts();

    } catch (error) {
      console.log("Delete Error:", error);
      alert(error.response?.data?.message || "Product delete nahi hua.");
    }
  };

  return (
    <div className="admin-products-page">

      <header className="products-topbar">
        <Link to="/admin" className="back-dashboard">
          <ArrowLeft size={19} />
          Dashboard
        </Link>

        <h2>Shopnest Admin</h2>
      </header>

      <main className="products-container">

        <div className="products-heading">
          <div>
            <h1>Product Management</h1>
            <p>Manage your store products here.</p>
          </div>

          <button className="add-product-btn" onClick={openAddForm}>
            <Plus size={19} />
            Add Product
          </button>
        </div>

        <div className="products-count">
          <Package size={22} />
          <div>
            <strong>{products.length}</strong>
            <span>Total Products</span>
          </div>
        </div>

        {loading ? (
          <p className="products-message">Loading products...</p>
        ) : products.length === 0 ? (
          <div className="products-empty">
            <Package size={45} />
            <h3>No Products Found</h3>
            <p>Click Add Product to create your first product.</p>
          </div>
        ) : (
          <div className="products-table-wrapper">
            <table className="products-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>
                      <div className="product-info">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                        />
                        <strong>{product.name}</strong>
                      </div>
                    </td>

                    <td>{product.category}</td>

                    <td>₹{Number(product.price).toLocaleString("en-IN")}</td>

                    <td>{product.stock}</td>

                    <td>
                      <div className="product-actions">
                        <button
                          className="edit-product-btn"
                          onClick={() => openEditForm(product)}
                          title="Edit Product"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          className="delete-product-btn"
                          onClick={() => handleDelete(product._id)}
                          title="Delete Product"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </main>

      {showForm && (
        <div className="product-modal-overlay">
          <div className="product-modal">

            <div className="product-modal-heading">
              <h2>{editId ? "Edit Product" : "Add New Product"}</h2>

              <button
                type="button"
                onClick={() => setShowForm(false)}
              >
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>

              <label>Product Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter product name"
                required
              />

              <label>Description</label>
              <textarea
                name="discription"
                value={form.discription}
                onChange={handleChange}
                placeholder="Enter product description"
                required
              />

              <div className="product-form-row">
                <div>
                  <label>Price (₹)</label>
                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    min="0"
                    required
                  />
                </div>

                <div>
                  <label>Stock</label>
                  <input
                    type="number"
                    name="stock"
                    value={form.stock}
                    onChange={handleChange}
                    min="0"
                    required
                  />
                </div>
              </div>

              <label>Category</label>
              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Enter category"
                required
              />

              <label>Product Image {editId && "(Optional)"}</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                required={!editId}
              />

              <button
                type="submit"
                className="save-product-btn"
                disabled={saving}
              >
                {saving
                  ? "Please wait..."
                  : editId
                    ? "Update Product"
                    : "Save Product"}
              </button>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminProducts;
