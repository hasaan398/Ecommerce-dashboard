import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { addCustomerSchema } from "../../validation/schema";
import "./addcustomer.css";

export default function AddCustomer() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      purchases: "",
      qty: "",
      address: "",
    },
    validationSchema: addCustomerSchema,
    onSubmit: (values) => {
      console.log("Customer saved:", values);
      toast.success("Customer added successfully!");
      setTimeout(() => {
        navigate("/customers");
      }, 1500);
    },
  });

  return (
    <div className="addcustomer-page">

      {/* Title */}
      <div className="page-title">
        <h1>Customer</h1>
        <p>Dashboard ▼ Customer ▼ <span className="bold">Add Customer</span></p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit(e);
          if (Object.keys(formik.errors).length > 0) {
            toast.error("Please fill all required fields correctly!");
          }
        }}
      >
        <div className="addcustomer-card">

          <h6>Customer</h6>
          <p className="card-subtitle">
            Lorem ipsum dolor sit amet consectetur. Non ac nulla aliquam aenean in velit mattis.
          </p>

          {/* Name */}
          <div className="form-group">
            <label>Name Customer</label>
            <input
              type="text"
              name="name"
              placeholder="Input name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={formik.touched.name && formik.errors.name ? "input-error" : ""}
            />
            {formik.touched.name && formik.errors.name && (
              <small className="error-msg">{formik.errors.name}</small>
            )}
          </div>

          {/* Email + Phone */}
          <div className="form-row">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Input email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={formik.touched.email && formik.errors.email ? "input-error" : ""}
              />
              {formik.touched.email && formik.errors.email && (
                <small className="error-msg">{formik.errors.email}</small>
              )}
            </div>
            <div className="form-group">
              <label>No Handphone</label>
              <input
                type="text"
                name="phone"
                placeholder="Input no handphone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={formik.touched.phone && formik.errors.phone ? "input-error" : ""}
              />
              {formik.touched.phone && formik.errors.phone && (
                <small className="error-msg">{formik.errors.phone}</small>
              )}
            </div>
          </div>

          {/* Purchases + Qty */}
          <div className="form-row">
            <div className="form-group">
              <label>Purchases</label>
              <input
                type="text"
                name="purchases"
                placeholder="Total Purchases"
                value={formik.values.purchases}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={formik.touched.purchases && formik.errors.purchases ? "input-error" : ""}
              />
              {formik.touched.purchases && formik.errors.purchases && (
                <small className="error-msg">{formik.errors.purchases}</small>
              )}
            </div>
            <div className="form-group">
              <label>Order Quantity</label>
              <input
                type="text"
                name="qty"
                placeholder="Order Quantity"
                value={formik.values.qty}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={formik.touched.qty && formik.errors.qty ? "input-error" : ""}
              />
              {formik.touched.qty && formik.errors.qty && (
                <small className="error-msg">{formik.errors.qty}</small>
              )}
            </div>
          </div>

          {/* Address */}
          <div className="form-group">
            <label>Address</label>
            <textarea
              name="address"
              placeholder="Input address"
              rows="3"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={formik.touched.address && formik.errors.address ? "input-error" : ""}
            />
            {formik.touched.address && formik.errors.address && (
              <small className="error-msg">{formik.errors.address}</small>
            )}
          </div>

          <button type="submit" className="save-btn">
            Save Customer
          </button>

        </div>
      </form>
    </div>
  );
}