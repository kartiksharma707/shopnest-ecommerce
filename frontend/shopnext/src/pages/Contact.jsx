import React, { useState } from "react";
import axios from "axios";

const Contact = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:3000/api/contact",
        {
          name,
          email,
          message,
        }
      );

      alert(response.data.message);

      setName("");
      setEmail("");
      setMessage("");

    } catch (error) {

      console.log("Contact error:", error);

      alert("Failed to send message");
    }
  };

  return (
    <>
      <style>{`
        .contact-page {
          padding: 60px 7%;
          background: #f8f7fc;
          min-height: 80vh;
        }

        .contact-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .contact-header h1 {
          font-size: 40px;
          color: #24104f;
          margin-bottom: 10px;
        }

        .contact-header p {
          color: #777;
        }

        .contact-container {
          max-width: 1000px;
          margin: auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
        }

        .contact-info,
        .contact-form {
          background: white;
          padding: 35px;
          border-radius: 20px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.06);
        }

        .contact-info h2,
        .contact-form h2 {
          color: #24104f;
          margin-bottom: 20px;
        }

        .contact-info p {
          color: #666;
          line-height: 1.8;
          margin-bottom: 15px;
        }

        .contact-form input,
        .contact-form textarea {
          width: 100%;
          padding: 13px;
          margin-bottom: 15px;
          border: 1px solid #ddd;
          border-radius: 9px;
          outline: none;
          font-size: 14px;
          box-sizing: border-box;
        }

        .contact-form textarea {
          height: 130px;
          resize: none;
        }

        .contact-form button {
          width: 100%;
          padding: 13px;
          border: none;
          border-radius: 9px;
          background: #7c3aed;
          color: white;
          font-size: 15px;
          cursor: pointer;
        }

        .contact-form button:hover {
          background: #6d28d9;
        }

        @media (max-width: 700px) {
          .contact-container {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="contact-page">

        <div className="contact-header">
          <h1>Contact Us</h1>
          <p>We're here to help you</p>
        </div>

        <div className="contact-container">

          <div className="contact-info">

            <h2>Get In Touch</h2>

            <p>
              Have a question about your order or our products?
              Feel free to contact us.
            </p>

            <p>
              📧 support@shopnest.com
            </p>

            <p>
              📞 +91 98765 43210
            </p>

            <p>
              📍 Punjab, India
            </p>

          </div>


          <form
            className="contact-form"
            onSubmit={handleSubmit}
          >

            <h2>Send Message</h2>

            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <textarea
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>

            <button type="submit">
              Send Message
            </button>

          </form>

        </div>

      </div>
    </>
  );
};

export default Contact;