
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  Search,
  ShoppingCart,
  UserRound,
  Heart,
  Menu,
  X,
  Package,
} from "lucide-react";

import { AuthContext } from "../context/Authcontext";
import "../styles/navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const cartItem = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishlist);

  const { user, logout } = useContext(AuthContext);

  // Search Function
  const handleSearch = (e) => {
  e.preventDefault();

  const searchValue = search.trim();

  if (!searchValue) {
    return;
  }

  navigate(`/?search=${encodeURIComponent(searchValue)}#products`);

  setMenuOpen(false);
};

  return (
    <header className="navbar">

      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="logo">
          <div className="logo-icon">
            <ShoppingCart size={21} />
          </div>

          <div className="logo-text">
            <h2>
              Shop<span>nest</span>
            </h2>
            <p>Everything you love</p>
          </div>
        </Link>

        {/* Desktop Search */}
        <form className="search-box" onSubmit={handleSearch}>
          <Search size={18} />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button type="submit">Search</button>
        </form>

        {/* Navigation Links */}
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/deals">Deals</Link>
        </nav>

        {/* Right Side */}
        <div className="nav-actions">

          <Link to="/wishlist" className="nav-icon wishlist-icon">
            <Heart size={21} />
            {wishlist.length > 0 && (
              <span>{wishlist.length}</span>
            )}
          </Link>

          <Link to="/cart" className="nav-icon cart-icon">
            <ShoppingCart size={22} />
            <span>{cartItem.length}</span>
          </Link>

          {user && (
            <Link to="/my-orders" className="nav-icon orders-icon">
              <Package size={21} />
            </Link>
          )}

          {user ? (
            <>
              <Link to="/profile" className="profile-btn">
                <UserRound size={18} />
                <strong>{user.name}</strong>
              </Link>

              <button className="logout-btn" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="login-btn">
              <UserRound size={18} />
              Login
            </Link>
          )}

        </div>

        {/* Mobile Button */}
        <button
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">

          <form className="mobile-search" onSubmit={handleSearch}>
            <Search size={18} />

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button type="submit">Go</button>
          </form>

          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>

          <Link to="/shop" onClick={() => setMenuOpen(false)}>
            Shop
          </Link>

          <Link to="/categories" onClick={() => setMenuOpen(false)}>
            Categories
          </Link>

          <Link to="/deals" onClick={() => setMenuOpen(false)}>
            Deals
          </Link>

          <Link to="/new-arrivals" onClick={() => setMenuOpen(false)}>
            New Arrivals
          </Link>

          <Link to="/wishlist" onClick={() => setMenuOpen(false)}>
            <Heart size={18} />
            Wishlist ({wishlist.length})
          </Link>

          {user && (
            <Link
              to="/my-orders"
              onClick={() => setMenuOpen(false)}
            >
              <Package size={18} />
              My Orders
            </Link>
          )}

          <Link to="/cart" onClick={() => setMenuOpen(false)}>
            <ShoppingCart size={18} />
            Cart ({cartItem.length})
          </Link>

          {user ? (
            <button
              className="mobile-login"
              onClick={() => {
                logout();
                setMenuOpen(false);
              }}
            >
              <UserRound size={18} />
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="mobile-login"
              onClick={() => setMenuOpen(false)}
            >
              <UserRound size={18} />
              Login
            </Link>
          )}

        </div>
      )}

    </header>
  );
};

export default Navbar;
