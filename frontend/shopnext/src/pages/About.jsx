
import React from "react";

const About = () => {
  return (
    <>
      <style>{`
        .about-page {
          width: 100%;
          background: #fff;
          color: #1f1f29;
        }

        /* HERO SECTION */

        .about-hero {
          min-height: 450px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 60px 20px;
          background: linear-gradient(
            135deg,
            #f4efff,
            #ffffff,
            #eee7ff
          );
        }

        .about-hero-content {
          max-width: 850px;
        }

        .about-small-title {
          color: #7c3aed;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 2px;
          margin-bottom: 15px;
        }

        .about-hero h1 {
          font-size: 55px;
          line-height: 1.1;
          margin: 0 0 25px;
          font-weight: 800;
        }

        .about-hero h1 span,
        .about-section h2 span,
        .about-features h2 span,
        .about-mission h2 span {
          color: #7c3aed;
        }

        .about-hero p {
          max-width: 650px;
          margin: auto;
          color: #666;
          font-size: 17px;
          line-height: 1.8;
        }


        /* ABOUT SECTION */

        .about-section {
          max-width: 1150px;
          margin: auto;
          padding: 90px 25px;

          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 70px;
          align-items: center;
        }

        .section-label {
          color: #7c3aed;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 2px;
          margin-bottom: 15px;
        }

        .about-section h2,
        .about-features h2,
        .about-mission h2 {
          font-size: 40px;
          line-height: 1.2;
          margin-bottom: 25px;
        }

        .about-text p {
          color: #666;
          line-height: 1.8;
          margin-bottom: 18px;
        }

        .about-box {
          padding: 50px 40px;
          border-radius: 25px;
          background: #f7f3ff;
          text-align: center;
        }

        .about-box-icon {
          font-size: 55px;
          margin-bottom: 15px;
        }

        .about-box h3 {
          font-size: 25px;
          margin-bottom: 12px;
        }

        .about-box p {
          color: #666;
          line-height: 1.7;
        }


        /* FEATURES */

        .about-features {
          background: #fafafa;
          padding: 90px 25px;
          text-align: center;
        }

        .features-heading {
          max-width: 700px;
          margin: 0 auto 50px;
        }

        .feature-grid {
          max-width: 1150px;
          margin: auto;

          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .feature-card {
          background: white;
          padding: 35px 25px;
          border-radius: 18px;
          transition: 0.3s;
        }

        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
        }

        .feature-icon {
          font-size: 40px;
          margin-bottom: 15px;
        }

        .feature-card h3 {
          margin-bottom: 12px;
        }

        .feature-card p {
          color: #777;
          line-height: 1.6;
        }


        /* MISSION */

        .about-mission {
          padding: 90px 25px;
          text-align: center;

          background: linear-gradient(
            135deg,
            #17121f,
            #2b1747
          );

          color: white;
        }

        .about-mission > div {
          max-width: 750px;
          margin: auto;
        }

        .about-mission h2 {
          font-size: 40px;
          margin-bottom: 25px;
        }

        .about-mission p:not(.section-label) {
          color: #d1c9db;
          line-height: 1.8;
          margin-bottom: 30px;
        }

        .about-mission button {
          border: none;
          background: #7c3aed;
          color: white;
          padding: 14px 30px;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
        }


        /* RESPONSIVE */

        @media (max-width: 900px) {
          .feature-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .about-section {
            grid-template-columns: 1fr;
          }

          .about-hero h1 {
            font-size: 45px;
          }
        }

        @media (max-width: 600px) {
          .feature-grid {
            grid-template-columns: 1fr;
          }

          .about-hero h1 {
            font-size: 36px;
          }

          .about-section h2,
          .about-features h2,
          .about-mission h2 {
            font-size: 32px;
          }
        }
      `}</style>


      <div className="about-page">

        {/* HERO */}
        <section className="about-hero">
          <div className="about-hero-content">

            <p className="about-small-title">
              WELCOME TO SHOPNEST
            </p>

            <h1>
              Everything You Love,
              <span> All In One Place.</span>
            </h1>

            <p>
              Shopnest is your modern online shopping destination
              where quality products, great prices, and a smooth
              shopping experience come together.
            </p>

          </div>
        </section>


        {/* ABOUT */}
        <section className="about-section">

          <div className="about-text">

            <p className="section-label">
              WHO WE ARE
            </p>

            <h2>
              Shopping Made
              <span> Simple & Better.</span>
            </h2>

            <p>
              At Shopnest, we believe online shopping should be
              simple, convenient, and enjoyable.
            </p>

            <p>
              Our goal is to bring a wide range of products together
              in one place so you can find what you need without
              the hassle.
            </p>

          </div>


          <div className="about-box">

            <div className="about-box-icon">
              🛍️
            </div>

            <h3>
              Shop With Confidence
            </h3>

            <p>
              Discover products, explore new choices, and enjoy
              a seamless shopping experience with Shopnest.
            </p>

          </div>

        </section>


        {/* FEATURES */}
        <section className="about-features">

          <div className="features-heading">

            <p className="section-label">
              WHY SHOPNEST
            </p>

            <h2>
              Built Around
              <span> Your Shopping Experience.</span>
            </h2>

          </div>


          <div className="feature-grid">

            <div className="feature-card">
              <div className="feature-icon">🚚</div>

              <h3>Fast Delivery</h3>

              <p>
                Get your orders delivered quickly and conveniently
                to your doorstep.
              </p>
            </div>


            <div className="feature-card">
              <div className="feature-icon">🔒</div>

              <h3>Secure Shopping</h3>

              <p>
                Your shopping experience is designed with security
                and convenience in mind.
              </p>
            </div>


            <div className="feature-card">
              <div className="feature-icon">💎</div>

              <h3>Quality Products</h3>

              <p>
                Explore products selected to give you value,
                quality, and convenience.
              </p>
            </div>


            <div className="feature-card">
              <div className="feature-icon">❤️</div>

              <h3>Customer First</h3>

              <p>
                We aim to make every part of your shopping journey
                simple and enjoyable.
              </p>
            </div>

          </div>

        </section>


        {/* MISSION */}
        <section className="about-mission">

          <div>

            <p className="section-label">
              OUR MISSION
            </p>

            <h2>
              Making Every
              <span> Shopping Journey Better.</span>
            </h2>

            <p>
              Our mission is simple — make online shopping easier
              for everyone. Shopnest brings products, convenience,
              and a user-friendly experience together.
            </p>

            <button>
              Start Shopping
            </button>

          </div>

        </section>

      </div>
    </>
  );
};

export default About;

