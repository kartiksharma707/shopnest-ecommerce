import React from "react";

const Categories = () => {
  const categories = [
    {
      name: "Electronics",
      description: "Latest gadgets and electronic products",
    },
    {
      name: "Fashion",
      description: "Trendy clothing and fashion accessories",
    },
    {
      name: "Beauty",
      description: "Beauty and personal care products",
    },
    {
      name: "Home",
      description: "Products to make your home better",
    },
    {
      name: "Sports",
      description: "Sports and fitness essentials",
    },
    {
      name: "Accessories",
      description: "Stylish accessories for everyday life",
    },
  ];

  return (
    <>
      <style>{`
        .categories-page {
          padding: 60px 7%;
          background: #f8f7fc;
          min-height: 80vh;
        }

        .categories-header {
          text-align: center;
          margin-bottom: 45px;
        }

        .categories-header h1 {
          font-size: 38px;
          color: #24104f;
          margin-bottom: 10px;
        }

        .categories-header p {
          color: #777;
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 25px;
        }

        .category-card {
          background: white;
          padding: 35px 25px;
          border-radius: 18px;
          text-align: center;
          box-shadow: 0 8px 25px rgba(0,0,0,0.06);
          transition: 0.3s;
        }

        .category-card:hover {
          transform: translateY(-7px);
        }

        .category-icon {
          width: 65px;
          height: 65px;
          margin: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #eee7ff;
          color: #7c3aed;
          border-radius: 50%;
          font-size: 28px;
          font-weight: bold;
        }

        .category-card h2 {
          margin: 20px 0 10px;
          color: #24104f;
        }

        .category-card p {
          color: #777;
          line-height: 1.6;
        }

        @media (max-width: 800px) {
          .categories-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 500px) {
          .categories-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="categories-page">

        <div className="categories-header">
          <h1>Shop by Categories</h1>
          <p>Find exactly what you're looking for</p>
        </div>

        <div className="categories-grid">

          {categories.map((category, index) => (
            <div className="category-card" key={index}>

              <div className="category-icon">
                {category.name.charAt(0)}
              </div>

              <h2>{category.name}</h2>

              <p>{category.description}</p>

            </div>
          ))}

        </div>

      </div>
    </>
  );
};

export default Categories;