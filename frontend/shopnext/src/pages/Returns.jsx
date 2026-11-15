import React from "react";

const Returns = () => {
  return (
    <>
      <style>{`
        .returns-page {
          padding: 60px 7%;
          background: #f8f7fc;
          min-height: 80vh;
        }

        .returns-box {
          max-width: 900px;
          margin: auto;
          background: white;
          padding: 45px;
          border-radius: 20px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.06);
        }

        .returns-box h1 {
          color: #24104f;
          font-size: 38px;
          margin-bottom: 25px;
        }

        .returns-box h2 {
          color: #7c3aed;
          margin-top: 30px;
        }

        .returns-box p,
        .returns-box li {
          color: #666;
          line-height: 1.8;
        }

        .returns-box ul {
          padding-left: 20px;
        }
      `}</style>

      <div className="returns-page">

        <div className="returns-box">

          <h1>Returns & Refunds</h1>

          <p>
            We want you to have a smooth shopping experience.
            If you receive a damaged or incorrect product,
            please contact our support team.
          </p>

          <h2>Return Request</h2>

          <p>
            Contact us with your order details and information
            about the issue with the product.
          </p>

          <h2>Product Condition</h2>

          <ul>
            <li>Product should be in its original condition.</li>
            <li>Original packaging should be retained when possible.</li>
            <li>Proof of purchase may be required.</li>
          </ul>

          <h2>Refund</h2>

          <p>
            Approved refunds are processed according to the
            applicable payment method and return conditions.
          </p>

        </div>

      </div>
    </>
  );
};

export default Returns;