import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/Productcard";

const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/api/products"
        );

        setProducts(data);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <style>{`
        .shop-page {
          padding: 50px 7%;
          background: #f8f7fc;
          min-height: 80vh;
        }

        .shop-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .shop-header h1 {
          font-size: 38px;
          color: #24104f;
          margin-bottom: 10px;
        }

        .shop-header p {
          color: #777;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 25px;
        }

        @media (max-width: 1000px) {
          .products-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 700px) {
          .products-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 450px) {
          .products-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="shop-page">

        <div className="shop-header">
          <h1>Shop All Products</h1>
          <p>Discover amazing products at Shopnest</p>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>

      </div>
    </>
  );
};

export default Shop;