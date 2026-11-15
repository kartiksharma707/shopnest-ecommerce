
import React, {
  createContext,
  useEffect,
  useState,
} from "react";

import { useDispatch } from "react-redux";

import {
  setCart,
  clearCurrentCart,
} from "../redux/cartSlice";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  // App refresh hone par cart load
  useEffect(() => {
    if (!user) {
      dispatch(clearCurrentCart());
      return;
    }

    const userId = user._id || user.id;
    const cartKey = `cart_${userId}`;
    const savedCart = localStorage.getItem(cartKey);

    if (savedCart) {
      dispatch(setCart(JSON.parse(savedCart)));
    } else {
      dispatch(clearCurrentCart());
    }
  }, [user, dispatch]);

  // Logout
  const logout = () => {
    dispatch(clearCurrentCart());

    setUser(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    window.location.href = "/login";
  };

  // Token Expiry Check
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    try {
      const payload = JSON.parse(
        atob(
          token
            .split(".")[1]
            .replace(/-/g, "+")
            .replace(/_/g, "/")
        )
      );

      const expiryTime = payload.exp * 1000;
      const currentTime = Date.now();
      const timeLeft = expiryTime - currentTime;

      if (timeLeft <= 0) {
        logout();
        return;
      }

      const timer = setTimeout(() => {
        alert("Your session has expired. Please login again.");
        logout();
      }, timeLeft);

      return () => {
        clearTimeout(timer);
      };

    } catch (error) {
      console.log("Invalid token:", error);
      logout();
    }
  }, [user]);

  // Login
  const login = (userData) => {
    setUser(userData);

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    const userId = userData._id || userData.id;
    const cartKey = `cart_${userId}`;
    const savedCart = localStorage.getItem(cartKey);

    if (savedCart) {
      dispatch(setCart(JSON.parse(savedCart)));
    } else {
      dispatch(clearCurrentCart());
    }
  };

  // Update User Profile
  const updateUser = (updatedUser) => {
    setUser(updatedUser);

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
