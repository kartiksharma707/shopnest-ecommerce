import React from "react";

const Privacy = () => {
  return (
    <>
      <style>{`
        .privacy-page {
          padding: 60px 7%;
          background: #f8f7fc;
          min-height: 80vh;
        }

        .privacy-box {
          max-width: 900px;
          margin: auto;
          background: white;
          padding: 45px;
          border-radius: 20px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.06);
        }

        .privacy-box h1 {
          color: #24104f;
          font-size: 38px;
          margin-bottom: 25px;
        }

        .privacy-box h2 {
          color: #7c3aed;
          margin-top: 30px;
        }

        .privacy-box p {
          color: #666;
          line-height: 1.8;
        }
      `}</style>

      <div className="privacy-page">

        <div className="privacy-box">

          <h1>Privacy Policy</h1>

          <p>
            Shopnest respects your privacy and aims to handle
            your information responsibly.
          </p>

          <h2>Information We Collect</h2>

          <p>
            Information such as your name, email address,
            delivery details and order information may be
            required to provide our services.
          </p>

          <h2>How We Use Information</h2>

          <p>
            Information may be used to process orders, provide
            customer support and improve the shopping experience.
          </p>

          <h2>Account Security</h2>

          <p>
            Users should keep their account credentials secure
            and avoid sharing passwords with others.
          </p>

        </div>

      </div>
    </>
  );
};

export default Privacy;