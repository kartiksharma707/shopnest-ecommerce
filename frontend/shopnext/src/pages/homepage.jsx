
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/Productcard";
import "../App.css";

const Homepage = () => {
  const [products, setProducts] = useState([]);

  // Search and Filter States
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState("");

  // Navbar se search aane par Homepage search update hoga
  useEffect(() => {
    const navbarSearch = searchParams.get("search") || "";
    setSearch(navbarSearch);
  }, [searchParams]);

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/products"
        );
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
  }, []);

  // Get Unique Categories
  const categories = [
    "All",
    ...new Set(
      products.map((product) => product.category).filter(Boolean)
    )
  ];

  // Search Button
  const handleSearch = () => {
    if (search.trim()) {
      setSearchParams({ search: search.trim() });
    } else {
      setSearchParams({});
    }
  };

  // Filter Products
  const filteredProducts = products.filter((product) => {
    const matchSearch = product.name
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "All" || product.category === category;

    const matchPrice =
      maxPrice === "" || Number(product.price) <= Number(maxPrice);

    return matchSearch && matchCategory && matchPrice;
  });

  // Clear Filters
  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setMaxPrice("");
    setSearchParams({});
  };

  return (
    <div className="homepage">

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-small-text">
            ✨ Welcome to Shopnest
          </span>

          <h1>
            Everything You Love,
            <span> All in One Place.</span>
          </h1>

          <p>
            Discover amazing products, explore new collections,
            and find everything you need at Shopnest.
          </p>

          <div className="hero-buttons">
            <a href="#products" className="shop-btn">
              Shop Now
            </a>

            <a href="#products" className="explore-btn">
              Explore Products
            </a>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section" id="products">

        <div className="products-heading">
          <span>OUR COLLECTION</span>
          <h2>Discover Our Products</h2>
          <p>
            Find products you'll love, carefully selected for
            quality, style and value.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="product-filters">

          {/* Search */}
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />

          <button onClick={handleSearch}>
            Search
          </button>

          {/* Category Filter */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Price Filter */}
          <input
            type="number"
            placeholder="Maximum price"
            min="0"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />

          {/* Clear Button */}
          <button onClick={clearFilters}>
            Clear Filters
          </button>
        </div>

        {/* Product Count */}
        <p className="product-count">
          Showing {filteredProducts.length} of {products.length} products
        </p>

        {/* Products */}
        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))
          ) : (
            <h3 className="no-products">
              No products found!
            </h3>
          )}
        </div>

      </section>
    </div>
  );
};

export default Homepage;
