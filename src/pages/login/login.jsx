import React, { useState } from "react";
import { useFormik } from "formik";
import "./login.css";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import schema from "../../validation/schema";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
const navigate = useNavigate();
const formik = useFormik({
  initialValues: {
    email: "",
    password: "",
    remember: false,
  },

  validationSchema: schema,

  onSubmit: (values) => {
    console.log(values);

    navigate("/dashboard");
  },
});
  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-logo">
          <img src={logo} alt="logo" />
          <span>Culters</span>
        </div>

        <h2>Sign In</h2>
        <p className="login-subtitle">
          Lorem ipsum dolor sit amet consectetur.
        </p>

        <button type="button" className="google-btn">
          <img
            src="https://www.google.com/favicon.ico"
            alt="google"
            style={{ width: "18px" }}
          />
          Sign In with Google
        </button>

        <div className="divider">
          <span>Or</span>
        </div>

        <form onSubmit={formik.handleSubmit}>
          {/* Email */}
          <div className="input-group">
            <label htmlFor="email">Email</label>

            <div
              className={`input-box ${
                formik.touched.email && formik.errors.email ? "error" : ""
              }`}
            >
              <input
                id="email"
                type="email"
                name="email"
                placeholder="yogaswibaya@gmail.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {formik.touched.email && !formik.errors.email && (
                <span className="check">✓</span>
              )}
            </div>

            {formik.touched.email && formik.errors.email && (
              <small className="error-msg">{formik.errors.email}</small>
            )}
          </div>

          {/* Password */}
          <div className="input-group">
            <label htmlFor="password">Password</label>

            <div
              className={`input-box ${
                formik.touched.password && formik.errors.password
                  ? "error"
                  : ""
              }`}
            >
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Input password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: "pointer" }}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            {formik.touched.password && formik.errors.password && (
              <small className="error-msg">{formik.errors.password}</small>
            )}
          </div>

          <div className="login-options">
            <label>
              <input
                type="checkbox"
                name="remember"
                checked={formik.values.remember}
                onChange={formik.handleChange}
              />
              Remember me?
            </label>

            <a href="#">Forgot Password</a>
          </div>

          <button type="submit" className="signin-btn">
            Sign In
          </button>
        </form>

        <p className="signup-link">
          Do not have account? <a href="#">Sign Up</a>
        </p>
      </div>

      <div className="login-right">
        <div className="login-banner">
          <h2>Easy-to-Use Dashboard for Managing Your Business.</h2>

          <p>
            Streamline Your Business Management with Our User-Friendly
            Dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}