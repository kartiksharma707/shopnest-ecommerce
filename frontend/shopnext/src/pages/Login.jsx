import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";

import { AuthContext } from "../context/Authcontext";
import "../styles/auth.css";

const Login = () => {

  const navigate = useNavigate();

  // AuthContext se login function lena
  const { login } = useContext(AuthContext);


  // Login form ka data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  // Password show/hide
  const [showPassword, setShowPassword] = useState(false);


  // Login loading
  const [loading, setLoading] = useState(false);


  // Input change hone par
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };


  // Form submit
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);


      // Backend ko login request
      const res = await axios.post(
        "https://shopnest-ecommerce-ek0w.onrender.com/api/login",
        formData
      );


      console.log("Login Response:", res.data);


      // Token save
      localStorage.setItem(
        "token",
        res.data.token
      );


      // User ko AuthContext me save
      login(res.data.user);


      // Success message
      alert("Login successful");


      // Homepage par jao
      navigate("/");


    } catch (error) {

      console.log("Login Error:", error);

      alert(
        error.response?.data?.message ||
        "Invalid email or password"
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="auth-page">


      {/* ================= LEFT SIDE ================= */}

      <div className="auth-left">

        <div className="auth-brand">

          <ShoppingBag size={28} />

          <span>
            Shopnest
          </span>

        </div>


        <div className="auth-left-content">

          <span className="auth-badge">
            ✨ Welcome Back
          </span>


          <h1>
            Your shopping
            <br />
            <span>starts here.</span>
          </h1>


          <p>
            Sign in to continue exploring amazing products,
            manage your orders and enjoy a seamless shopping
            experience.
          </p>


          <div className="auth-benefits">

            <div>
              <span>✓</span>
              Discover new products
            </div>


            <div>
              <span>✓</span>
              Track your orders
            </div>


            <div>
              <span>✓</span>
              Secure & simple checkout
            </div>

          </div>

        </div>

      </div>



      {/* ================= RIGHT SIDE ================= */}

      <div className="auth-right">

        <div className="auth-card">


          {/* Mobile Logo */}

          <div className="mobile-brand">

            <ShoppingBag size={25} />

            Shopnest

          </div>


          {/* Heading */}

          <div className="auth-heading">

            <h2>
              Welcome back
            </h2>

            <p>
              Sign in to your Shopnest account.
            </p>

          </div>



          {/* ================= FORM ================= */}

          <form onSubmit={handleSubmit}>


            {/* EMAIL */}

            <div className="input-group">

              <label>
                Email Address
              </label>


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

              <div className="password-label">

                <label>
                  Password
                </label>

                <Link to="#">
                  Forgot password?
                </Link>

              </div>


              <div className="input-wrapper">

                <Lock size={18} />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />


                {/* Show / Hide Password */}

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



            {/* REMEMBER ME */}

            <div className="remember">

              <label>

                <input type="checkbox" />

                Remember me

              </label>

            </div>



            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >

              {loading ? (

                "Signing in..."

              ) : (

                <>
                  Sign In
                  <ArrowRight size={18} />
                </>

              )}

            </button>


          </form>



          {/* REGISTER */}

          <p className="auth-switch">

            Don't have an account?

            <Link to="/register">
              Create account
            </Link>

          </p>


        </div>

      </div>

    </div>

  );

};

export default Login;