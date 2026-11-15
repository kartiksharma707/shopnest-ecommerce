
import React from "react";
import { Link } from "react-router-dom";

import {
  ShoppingCart,
  Mail,
  Phone,
  MapPin,
  
  
} from "lucide-react";

import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">

      {/* Main Footer */}
      <div className="footer-main">

        <div className="footer-container">

          {/* Brand */}
          <div className="footer-brand">

            <Link to="/" className="footer-logo">

              <div className="footer-logo-icon">
                <ShoppingCart size={20} />
              </div>

              <h2>
                Shop<span>nest</span>
              </h2>

            </Link>

            <p>
              Your one-stop destination for quality products,
              great deals and a better shopping experience.
            </p>

            {/* Social Icons */}
            <div className="social-icons">

              {/* <a href="#" aria-label="Facebook">
                <Facebook size={17} />
              </a>

              <a href="#" aria-label="Instagram">
                <Instagram size={17} />
              </a> */}

              <a href="#" aria-label="Twitter">
                X
              </a>

            </div>

          </div>


          {/* Quick Links */}
          <div className="footer-column">

            <h3>Quick Links</h3>

            <Link to="/">Home</Link>

           
            <Link to="/about">About Us</Link>

            <Link to="/contact">Contact Us</Link>

          </div>


          {/* Customer Service */}
          <div className="footer-column">

            <h3>Customer Service</h3>

            <Link to="/shipping">
              Shipping & Delivery
            </Link>

            <Link to="/returns">
              Returns & Refunds
            </Link>

            <Link to="/faq">
              FAQs
            </Link>

            <Link to="/privacy">
              Privacy Policy
            </Link>

          </div>


          {/* Contact */}
          <div className="footer-column contact-column">

            <h3>Contact Us</h3>

            <div className="contact-item">
              <MapPin size={17} />
              <span>
                Mohali, Punjab, India
              </span>
            </div>

            <div className="contact-item">
              <Phone size={17} />
              <span>
                +91 98765 43210
              </span>
            </div>

            <div className="contact-item">
              <Mail size={17} />
              <span>
                support@shopnest.com
              </span>
            </div>

          </div>

        </div>

      </div>


      {/* Bottom */}
      <div className="footer-bottom">

        <div className="footer-bottom-container">

          <p>
            © 2026 Shopnest. All rights reserved.
          </p>

          <div className="bottom-links">

            <Link to="/terms">
              Terms & Conditions
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;

