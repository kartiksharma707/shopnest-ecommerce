import React from "react";

const NewArrivals = () => {
  return (
    <>
      <style>{`
        .new-page {
          min-height: 80vh;
          padding: 70px 7%;
          background: #f8f7fc;
        }

        .new-header {
          text-align: center;
          margin-bottom: 45px;
        }

        .new-header h1 {
          font-size: 40px;
          color: #24104f;
          margin-bottom: 12px;
        }

        .new-header p {
          color: #777;
        }

        .new-box {
          max-width: 900px;
          margin: auto;
          background: white;
          padding: 50px;
          border-radius: 22px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0,0,0,0.06);
        }

        .new-box h2 {
          color: #7c3aed;
          margin-bottom: 15px;
        }

        .new-box p {
          color: #666;
          line-height: 1.8;
        }
      `}</style>

      <div className="new-page">

        <div className="new-header">
          <h1>New Arrivals</h1>
          <p>Explore the latest products added to Shopnest</p>
        </div>

        <div className="new-box">

          <h2>Fresh Products Are Coming</h2>

          <p>
            We're constantly adding new products to our store.
            Check back regularly to discover the latest arrivals
            and trending products.
          </p>

        </div>

      </div>
    </>
  );
};

export default NewArrivals;