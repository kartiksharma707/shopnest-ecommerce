import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";
import "../styles/auth.css";

const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const res = await axios.post(
        "http://localhost:3000/api/register",
        formData
      );

      alert(res.data.message || "Registration successful");

      navigate("/login");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Registration failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="auth-page">

      {/* LEFT SIDE */}

      <div className="auth-left">

        <div className="auth-brand">
          <ShoppingBag size={28} />
          <span>Shopnest</span>
        </div>

        <div className="auth-left-content">

          <span className="auth-badge">
            ✨ Start Your Journey
          </span>

          <h1>
            Shop smarter.
            <br />
            <span>Live better.</span>
          </h1>

          <p>
            Create your Shopnest account and discover
            products you'll love, all in one place.
          </p>

          <div className="auth-benefits">

            <div>
              <span>✓</span>
              Easy & secure shopping
            </div>

            <div>
              <span>✓</span>
              Exclusive products & deals
            </div>

            <div>
              <span>✓</span>
              Fast & reliable delivery
            </div>

          </div>

        </div>

      </div>


      {/* RIGHT SIDE */}

      <div className="auth-right">

        <div className="auth-card">

          <div className="mobile-brand">
            <ShoppingBag size={25} />
            Shopnest
          </div>

          <div className="auth-heading">

            <h2>Create your account</h2>

            <p>
              Join Shopnest and start shopping today.
            </p>

          </div>


          <form onSubmit={handleSubmit}>

            {/* NAME */}

            <div className="input-group">

              <label>Full Name</label>

              <div className="input-wrapper">

                <User size={18} />

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            {/* EMAIL */}

            <div className="input-group">

              <label>Email Address</label>

              <div className="input-wrapper">

                <Mail size={18} />

                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div className="input-group">

              <label>Password</label>

              <div className="input-wrapper">

                <Lock size={18} />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className="password-btn"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

            </div>


            {/* TERMS */}

            <div className="terms">

              <input type="checkbox" required />

              <span>
                I agree to the{" "}
                <Link to="/terms">
                  Terms & Conditions
                </Link>
              </span>

            </div>


            {/* BUTTON */}

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >

              {loading ? (
                "Creating account..."
              ) : (
                <>
                  Create Account
                  <ArrowRight size={18} />
                </>
              )}

            </button>

          </form>


          {/* LOGIN */}

          <p className="auth-switch">

            Already have an account?

            <Link to="/login">
              Sign in
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
};

export default Register;