
import React, { useContext, useState } from "react";
import {
  UserRound,
  Mail,
  Shield,
  LogOut,
  Edit,
  X,
  Save,
  Lock,
  Eye,
  EyeOff,
  KeyRound
} from "lucide-react";

import { AuthContext } from "../context/Authcontext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const { user, logout, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || ""
  });

  if (!user) {
    return (
      <div className="profile-login">
        <h2>Please login first</h2>
        <button onClick={() => navigate("/login")}>
          Go to Login
        </button>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handleEdit = () => {
    setFormData({
      name: user.name || "",
      email: user.email || ""
    });

    setIsEditing(true);
    setShowPasswordForm(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.put(
        "http://localhost:3000/api/users/profile",
        {
          name: formData.name,
          email: formData.email
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        updateUser({
          ...user,
          ...response.data.user,
          _id: user._id || user.id,
          id: user.id || user._id
        });

        setIsEditing(false);
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Profile update failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword.length < 8) {
      toast.error("New password must be at least 8 characters");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    try {
      setPasswordLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.put(
        "http://localhost:3000/api/users/change-password",
        passwordData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        toast.success("Password changed successfully!");

        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: ""
        });

        setShowPasswordForm(false);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Password change failed"
      );
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const togglePassword = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <>
      <style>{`
        .profile-page {
          min-height: 80vh;
          background: #f7f7fc;
          padding: 55px 20px;
        }

        .profile-container {
          max-width: 850px;
          margin: auto;
        }

        .profile-heading {
          text-align: center;
          margin-bottom: 30px;
        }

        .profile-heading h1 {
          color: #24104f;
          font-size: 32px;
          margin-bottom: 8px;
        }

        .profile-heading p {
          color: #777;
        }

        .profile-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 35px rgba(0,0,0,0.07);
        }

        .profile-cover {
          height: 145px;
          background: linear-gradient(120deg, #6d28d9, #a855f7);
        }

        .profile-user {
          text-align: center;
          padding: 0 25px 30px;
          margin-top: -55px;
        }

        .profile-avatar {
          width: 105px;
          height: 105px;
          border-radius: 50%;
          background: white;
          color: #7c3aed;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: auto;
          border: 5px solid white;
          box-shadow: 0 4px 15px rgba(0,0,0,0.12);
        }

        .profile-user h2 {
          margin: 15px 0 5px;
          color: #24104f;
          font-size: 25px;
        }

        .profile-user p {
          color: #777;
          margin: 0;
        }

        .profile-role {
          display: inline-block;
          margin-top: 12px;
          padding: 6px 16px;
          border-radius: 30px;
          background: #f0eaff;
          color: #6d28d9;
          font-size: 13px;
          font-weight: 600;
          text-transform: capitalize;
        }

        .profile-details {
          padding: 25px 35px;
          border-top: 1px solid #eee;
        }

        .profile-details h3,
        .profile-form h3 {
          color: #24104f;
          margin-bottom: 20px;
        }

        .profile-info {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 17px 0;
          border-bottom: 1px solid #eee;
        }

        .profile-info:last-child {
          border-bottom: none;
        }

        .profile-info-icon {
          width: 43px;
          height: 43px;
          border-radius: 12px;
          background: #f2ecff;
          color: #7c3aed;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .profile-info small {
          display: block;
          color: #888;
          margin-bottom: 5px;
        }

        .profile-info strong {
          color: #333;
          font-size: 15px;
          word-break: break-word;
        }

        .profile-actions {
          padding: 0 35px 30px;
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .profile-button {
          flex: 1;
          padding: 14px;
          border: none;
          border-radius: 10px;
          color: white;
          font-size: 15px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          cursor: pointer;
          transition: 0.3s;
        }

        .edit-button {
          background: #7c3aed;
        }

        .edit-button:hover {
          background: #5b21b6;
        }

        .password-button {
          background: #2563eb;
        }

        .password-button:hover {
          background: #1d4ed8;
        }

        .logout-button {
          background: #dc2626;
        }

        .logout-button:hover {
          background: #b91c1c;
        }

        .profile-form {
          padding: 25px 35px;
          border-top: 1px solid #eee;
        }

        .profile-input-group {
          margin-bottom: 18px;
        }

        .profile-input-group label {
          display: block;
          margin-bottom: 8px;
          color: #444;
          font-weight: 600;
          font-size: 14px;
        }

        .profile-input-group input {
          width: 100%;
          padding: 13px;
          border: 1px solid #ddd;
          border-radius: 9px;
          outline: none;
          font-size: 15px;
          box-sizing: border-box;
        }

        .profile-input-group input:focus {
          border-color: #7c3aed;
        }

        .password-input-wrap {
          position: relative;
        }

        .password-input-wrap input {
          padding-right: 45px;
        }

        .password-toggle {
          position: absolute;
          right: 13px;
          top: 50%;
          transform: translateY(-50%);
          border: none;
          background: transparent;
          color: #777;
          cursor: pointer;
          display: flex;
          align-items: center;
        }

        .form-buttons {
          display: flex;
          gap: 12px;
        }

        .form-buttons button {
          flex: 1;
          padding: 13px;
          border: none;
          border-radius: 9px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .save-button {
          background: #7c3aed;
          color: white;
        }

        .cancel-button {
          background: #eee;
          color: #333;
        }

        .profile-login {
          min-height: 60vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 15px;
        }

        .profile-login button {
          background: #7c3aed;
          color: white;
          border: none;
          padding: 12px 25px;
          border-radius: 8px;
          cursor: pointer;
        }

        @media (max-width: 600px) {
          .profile-page {
            padding: 35px 14px;
          }

          .profile-heading h1 {
            font-size: 26px;
          }

          .profile-details,
          .profile-form {
            padding: 22px 20px;
          }

          .profile-actions {
            padding: 0 20px 25px;
            flex-direction: column;
          }

          .form-buttons {
            flex-direction: column;
          }
        }
      `}</style>

      <div className="profile-page">
        <div className="profile-container">

          <div className="profile-heading">
            <h1>My Profile</h1>
            <p>Manage your Shopnest account</p>
          </div>

          <div className="profile-card">

            <div className="profile-cover"></div>

            <div className="profile-user">
              <div className="profile-avatar">
                <UserRound size={55} />
              </div>

              <h2>{user.name}</h2>
              <p>{user.email}</p>

              <span className="profile-role">
                {user.role || "Customer"}
              </span>
            </div>

            {!isEditing && !showPasswordForm ? (
              <>
                <div className="profile-details">
                  <h3>Account Information</h3>

                  <div className="profile-info">
                    <div className="profile-info-icon">
                      <UserRound size={21} />
                    </div>
                    <div>
                      <small>Full Name</small>
                      <strong>{user.name}</strong>
                    </div>
                  </div>

                  <div className="profile-info">
                    <div className="profile-info-icon">
                      <Mail size={21} />
                    </div>
                    <div>
                      <small>Email Address</small>
                      <strong>{user.email}</strong>
                    </div>
                  </div>

                  <div className="profile-info">
                    <div className="profile-info-icon">
                      <Shield size={21} />
                    </div>
                    <div>
                      <small>Account Role</small>
                      <strong>{user.role || "Customer"}</strong>
                    </div>
                  </div>
                </div>

                <div className="profile-actions">
                  <button
                    className="profile-button edit-button"
                    onClick={handleEdit}
                  >
                    <Edit size={18} />
                    Edit Profile
                  </button>

                  <button
                    className="profile-button password-button"
                    onClick={() => setShowPasswordForm(true)}
                  >
                    <KeyRound size={18} />
                    Change Password
                  </button>

                  <button
                    className="profile-button logout-button"
                    onClick={handleLogout}
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              </>
            ) : isEditing ? (
              <form className="profile-form" onSubmit={handleUpdate}>
                <h3>Edit Your Profile</h3>

                <div className="profile-input-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    minLength={3}
                  />
                </div>

                <div className="profile-input-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="form-buttons">
                  <button
                    type="submit"
                    className="save-button"
                    disabled={loading}
                  >
                    <Save size={18} />
                    {loading ? "Saving..." : "Save Changes"}
                  </button>

                  <button
                    type="button"
                    className="cancel-button"
                    onClick={() => setIsEditing(false)}
                  >
                    <X size={18} />
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <form
                className="profile-form"
                onSubmit={handleChangePassword}
              >
                <h3>Change Your Password</h3>

                <div className="profile-input-group">
                  <label>Current Password</label>
                  <div className="password-input-wrap">
                    <input
                      type={showPasswords.current ? "text" : "password"}
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      placeholder="Enter current password"
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => togglePassword("current")}
                    >
                      {showPasswords.current ? <EyeOff size={19} /> : <Eye size={19} />}
                    </button>
                  </div>
                </div>

                <div className="profile-input-group">
                  <label>New Password</label>
                  <div className="password-input-wrap">
                    <input
                      type={showPasswords.new ? "text" : "password"}
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      placeholder="Enter new password"
                      minLength={8}
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => togglePassword("new")}
                    >
                      {showPasswords.new ? <EyeOff size={19} /> : <Eye size={19} />}
                    </button>
                  </div>
                </div>

                <div className="profile-input-group">
                  <label>Confirm New Password</label>
                  <div className="password-input-wrap">
                    <input
                      type={showPasswords.confirm ? "text" : "password"}
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      placeholder="Confirm new password"
                      minLength={8}
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => togglePassword("confirm")}
                    >
                      {showPasswords.confirm ? <EyeOff size={19} /> : <Eye size={19} />}
                    </button>
                  </div>
                </div>

                <div className="form-buttons">
                  <button
                    type="submit"
                    className="save-button"
                    disabled={passwordLoading}
                  >
                    <Lock size={18} />
                    {passwordLoading ? "Updating..." : "Update Password"}
                  </button>

                  <button
                    type="button"
                    className="cancel-button"
                    onClick={() => {
                      setShowPasswordForm(false);
                      setPasswordData({
                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: ""
                      });
                    }}
                  >
                    <X size={18} />
                    Cancel
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
