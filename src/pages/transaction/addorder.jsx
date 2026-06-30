import React from "react";
import { useNavigate, useLocation,Link} from "react-router-dom";
import { useFormik } from "formik";
import { addOrderSchema } from "../../validation/schema";
import { toast } from "react-toastify";
import "./addorder.css";

export default function AddOrder() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      customer: "",
      price: "",
      payment: "",
      status: "",
    },
    validationSchema: addOrderSchema,
    onSubmit: (values) => {
      console.log("Order saved:", values);
      navigate("/transaction", {
        state: { success: "Order Added Successfully!" },
      });
    },
  });

return (
  <div className="addorder-page">

    {/* Title */}
    <div className="page-title">
      <h1>Orders</h1>
      <p>
        <Link to="/dashboard">Dashboard</Link> ▼{" "}
        <Link to="/transaction">Orders</Link> ▼{" "}
        <span className="bold">Add Order</span>
      </p>
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
        <div className="addorder-card">

          <h6>Order Information</h6>
          <p className="card-subtitle">
            Lorem ipsum dolor sit amet consectetur. Non ac nulla aliquam aenean in velit mattis.
          </p>

          {/* Product Name */}
          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              placeholder="Input product name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={formik.touched.name && formik.errors.name ? "input-error" : ""}
            />
            {formik.touched.name && formik.errors.name && (
              <small className="error-msg">{formik.errors.name}</small>
            )}
          </div>

          {/* Customer */}
          <div className="form-group">
            <label>Customer</label>
            <input
              type="text"
              name="customer"
              placeholder="Input customer name"
              value={formik.values.customer}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={formik.touched.customer && formik.errors.customer ? "input-error" : ""}
            />
            {formik.touched.customer && formik.errors.customer && (
              <small className="error-msg">{formik.errors.customer}</small>
            )}
          </div>

          {/* Price */}
          <div className="form-group">
            <label>Price</label>
            <input
              type="text"
              name="price"
              placeholder="Input price"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={formik.touched.price && formik.errors.price ? "input-error" : ""}
            />
            {formik.touched.price && formik.errors.price && (
              <small className="error-msg">{formik.errors.price}</small>
            )}
          </div>

          {/* Payment + Status */}
          <div className="form-row">
            <div className="form-group">
              <label>Payment</label>
              <select
                name="payment"
                value={formik.values.payment}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={formik.touched.payment && formik.errors.payment ? "input-error" : ""}
              >
                <option value="">Select payment status</option>
                <option value="Paid">Paid</option>
                <option value="Unpaid">Unpaid</option>
              </select>
              {formik.touched.payment && formik.errors.payment && (
                <small className="error-msg">{formik.errors.payment}</small>
              )}
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={formik.touched.status && formik.errors.status ? "input-error" : ""}
              >
                <option value="">Select order status</option>
                <option value="Shipping">Shipping</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              {formik.touched.status && formik.errors.status && (
                <small className="error-msg">{formik.errors.status}</small>
              )}
            </div>
          </div>

          <button type="submit" className="save-btn">
            Save Order
          </button>

        </div>
      </form>
    </div>
  );
}