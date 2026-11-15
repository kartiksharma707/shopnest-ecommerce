import React from "react";

const Deals = () => {
  return (
    <>
      <style>{`
        .deals-page {
          min-height: 80vh;
          padding: 70px 7%;
          background: #f8f7fc;
        }

        .deals-content {
          max-width: 900px;
          margin: auto;
          text-align: center;
          background: white;
          padding: 60px 30px;
          border-radius: 25px;
          box-shadow: 0 10px 35px rgba(0,0,0,0.07);
        }

        .deals-content h1 {
          font-size: 42px;
          color: #24104f;
          margin-bottom: 15px;
        }

        .deals-content p {
          color: #666;
          font-size: 17px;
          line-height: 1.7;
        }

        .deal-box {
          margin-top: 35px;
          padding: 25px;
          background: #f0eaff;
          border-radius: 16px;
        }

        .deal-box h2 {
          color: #7c3aed;
          margin-bottom: 10px;
        }
      `}</style>

      <div className="deals-page">

        <div className="deals-content">

          <h1>Exclusive Deals</h1>

          <p>
            Discover exciting offers and special deals available
            at Shopnest.
          </p>

          <div className="deal-box">
            <h2>Special Offers Coming Soon</h2>

            <p>
              Stay connected with Shopnest to discover amazing
              discounts and limited-time offers.
            </p>
          </div>

        </div>

      </div>
    </>
  );
};

export default Deals;