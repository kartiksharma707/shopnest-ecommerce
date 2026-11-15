import React from "react";

const Terms = () => {
  return (
    <>
      <style>{`
        .terms-page {
          padding: 60px 7%;
          background: #f8f7fc;
          min-height: 80vh;
        }

        .terms-box {
          max-width: 900px;
          margin: auto;
          background: white;
          padding: 45px;
          border-radius: 20px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.06);
        }

        .terms-box h1 {
          color: #24104f;
          font-size: 38px;
          margin-bottom: 25px;
        }

        .terms-box h2 {
          color: #7c3aed;
          margin-top: 30px;
        }

        .terms-box p {
          color: #666;
          line-height: 1.8;
        }

        .terms-box ul {
          color: #666;
          line-height: 2;
        }
      `}</style>

      <div className="terms-page">

        <div className="terms-box">

          <h1>Terms & Conditions</h1>

          <p>
            By using Shopnest, you agree to use the website
            responsibly and follow the applicable terms described
            on this page.
          </p>

          <h2>Use of Website</h2>

          <p>
            Users should provide accurate information when
            creating an account or placing an order.
          </p>

          <h2>Orders</h2>

          <p>
            Product availability, prices and order details may
            change from time to time.
          </p>

          <h2>Account</h2>

          <p>
            Users are responsible for maintaining the security
            of their account credentials.
          </p>

          <h2>Changes</h2>

          <p>
            Shopnest may update these terms when necessary.
            Updated information will be displayed on this page.
          </p>

        </div>

      </div>
    </>
  );
};

export default Terms;