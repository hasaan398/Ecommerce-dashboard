import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { MdVisibility, MdVisibilityOff, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import "./setting.css";

const settingsSchema = Yup.object({
  firstName: Yup.string().min(2, "First name must be at least 2 characters").required("First name is required"),
  lastName: Yup.string().min(2, "Last name must be at least 2 characters").required("Last name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  gender: Yup.string().required("Gender is required"),
  birthday: Yup.string().required("Date of birth is required"),
});

export default function Settings() {
  const [activeTab, setActiveTab] = useState("Account");
  const [profilePic, setProfilePic] = useState(null);

  const formik = useFormik({
    initialValues: {
      firstName: "Cameron",
      lastName: "Williamson",
      email: "Cameron",
      gender: "Male",
      birthday: "23 Desember 2003",
      phone: "+62 8417 1723 1123",
      country: "Indonesia",
      address: "Parungkuda, Kab. Sukabumi",
    },
    validationSchema: settingsSchema,
    onSubmit: (values) => {
      console.log("Settings updated:", values);
      toast.success("Profile updated successfully!");
    },
  });

  const handlePicUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  return (
    <div className="settings-page">

      {/* Title */}
      <div className="page-title">
        <h1>Account & Settings</h1>
       <p>
  <Link to="/dashboard">Dashboard</Link> ⯈{" "}
  <span className="bold">{activeTab}</span>
</p>
      </div>

      {/* Tabs */}
      <div className="settings-tabs">
        {["Account", "Security", "Notification"].map((tab) => (
          <button
            key={tab}
            className={`settings-tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Account" && (
        <form onSubmit={formik.handleSubmit}>

          {/* Profile Information Card */}
          <div className="settings-card">
            <h6>Profile Information</h6>

            <div className="profile-pic-row">
              <div className="profile-pic">
                {profilePic ? (
                  <img src={profilePic} alt="profile" />
                ) : (
                  <div className="profile-pic-placeholder">👤</div>
                )}
              </div>
              <label className="change-pic-btn">
                Change Pictures
                <input type="file" accept="image/*" style={{ display: "none" }} onChange={handlePicUpload} />
              </label>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={formik.touched.firstName && formik.errors.firstName ? "input-error" : ""}
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <small className="error-msg">{formik.errors.firstName}</small>
                )}
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={formik.touched.lastName && formik.errors.lastName ? "input-error" : ""}
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <small className="error-msg">{formik.errors.lastName}</small>
                )}
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={formik.touched.email && formik.errors.email ? "input-error" : ""}
                />
                {formik.touched.email && formik.errors.email && (
                  <small className="error-msg">{formik.errors.email}</small>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Gender</label>
                <input
                  type="text"
                  name="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={formik.touched.gender && formik.errors.gender ? "input-error" : ""}
                />
                {formik.touched.gender && formik.errors.gender && (
                  <small className="error-msg">{formik.errors.gender}</small>
                )}
              </div>
              <div className="form-group">
                <label>Date Birthday</label>
                <input
                  type="text"
                  name="birthday"
                  value={formik.values.birthday}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={formik.touched.birthday && formik.errors.birthday ? "input-error" : ""}
                />
                {formik.touched.birthday && formik.errors.birthday && (
                  <small className="error-msg">{formik.errors.birthday}</small>
                )}
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="update-btn">Update</button>
              <button type="button" className="cancel-btn" onClick={() => formik.resetForm()}>Cancel</button>
            </div>
          </div>

          {/* Contact Detail Card */}
          <div className="settings-card">
            <div className="card-header-row">
              <h6>Contact Detail</h6>
              <span className="edit-link"><MdEdit/></span>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>Country</label>
                <input
                  type="text"
                  name="country"
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  readOnly
                />
              </div>
            </div>
          </div>

        </form>
      )}

      {activeTab === "Security" && (
        <SecurityTab />
      )}

      {activeTab === "Notification" && (
        <div className="settings-card">
          <h6>Notification</h6>
          <p className="card-subtitle">Notification settings coming soon.</p>
        </div>
      )}

    </div>
  );
}

function SecurityTab() {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required("Old password is required"),
      newPassword: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("New password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "Passwords do not match")
        .required("Please confirm your password"),
    }),
    onSubmit: (values) => {
      console.log("Password changed:", values);
      toast.success("Password changed successfully!");
      formik.resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="settings-card">
        <h6>Change Password</h6>
        <p className="card-subtitle">Update your password to keep your account secure.</p>

        <div className="form-group" style={{ maxWidth: "400px" }}>
          <label>Old Password</label>
          <div className="password-input">
            <input
              type={showOld ? "text" : "password"}
              name="oldPassword"
              placeholder="Enter old password"
              value={formik.values.oldPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={formik.touched.oldPassword && formik.errors.oldPassword ? "input-error" : ""}
            />
            <span onClick={() => setShowOld(!showOld)}>
              {showOld ? <MdVisibilityOff /> : <MdVisibility />}
            </span>
          </div>
          {formik.touched.oldPassword && formik.errors.oldPassword && (
            <small className="error-msg">{formik.errors.oldPassword}</small>
          )}
        </div>

        <div className="form-group" style={{ maxWidth: "400px" }}>
          <label>New Password</label>
          <div className="password-input">
            <input
              type={showNew ? "text" : "password"}
              name="newPassword"
              placeholder="Enter new password"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={formik.touched.newPassword && formik.errors.newPassword ? "input-error" : ""}
            />
            <span onClick={() => setShowNew(!showNew)}>
              {showNew ? <MdVisibilityOff /> : <MdVisibility />}
            </span>
          </div>
          {formik.touched.newPassword && formik.errors.newPassword && (
            <small className="error-msg">{formik.errors.newPassword}</small>
          )}
        </div>

        <div className="form-group" style={{ maxWidth: "400px" }}>
          <label>Confirm Password</label>
          <div className="password-input">
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm new password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={formik.touched.confirmPassword && formik.errors.confirmPassword ? "input-error" : ""}
            />
            <span onClick={() => setShowConfirm(!showConfirm)}>
              {showConfirm ? <MdVisibilityOff /> : <MdVisibility />}
            </span>
          </div>
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <small className="error-msg">{formik.errors.confirmPassword}</small>
          )}
        </div>

        <button type="submit" className="update-btn">Update Password</button>
      </div>
    </form>
  );
}