import React from "react";

const Shipping = () => {
  return (
    <>
      <style>{`
        .info-page {
          padding: 60px 7%;
          background: #f8f7fc;
          min-height: 80vh;
        }

        .info-box {
          max-width: 900px;
          margin: auto;
          background: white;
          padding: 45px;
          border-radius: 20px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.06);
        }

        .info-box h1 {
          color: #24104f;
          margin-bottom: 25px;
          font-size: 38px;
        }

        .info-box h2 {
          color: #7c3aed;
          margin-top: 30px;
        }

        .info-box p {
          color: #666;
          line-height: 1.8;
        }

        .info-box ul {
          color: #666;
          line-height: 2;
        }
      `}</style>

      <div className="info-page">

        <div className="info-box">

          <h1>Shipping Information</h1>

          <p>
            We aim to make your shopping experience simple and
            convenient. Orders are processed after successful
            confirmation.
          </p>

          <h2>Processing</h2>

          <p>
            Orders are generally prepared for shipping after
            payment confirmation.
          </p>

          <h2>Delivery</h2>

          <p>
            Delivery time may vary depending on your location,
            product availability and courier service.
          </p>

          <h2>Important</h2>

          <ul>
            <li>Please provide a correct delivery address.</li>
            <li>Keep your phone number available for delivery updates.</li>
            <li>Delivery timelines may change due to unexpected delays.</li>
          </ul>

        </div>

      </div>
    </>
  );
};

export default Shipping;