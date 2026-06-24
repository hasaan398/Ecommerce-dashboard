import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { addProductSchema } from "../../validation/schema";
import "./addproduct.css";
import { FaImage } from "react-icons/fa";
import { toast } from "react-toastify";
import { allRows } from "../../data";

export default function AddProduct() {
  const navigate = useNavigate();
  const { id } = useParams();  // ← URL se id milega
  const [images, setImages] = useState([null, null, null, null]);

  // Agar id hai, toh edit mode — us product ka data dhundo
  const editProduct = id ? allRows.find((p) => String(p.id) === id) : null;

  const formik = useFormik({
    initialValues: {
      sku: editProduct?.productId || "",
      name: editProduct?.name || "",
      size: editProduct?.size || "",
      color: editProduct?.color || "",
      category: editProduct?.category || "",
      price: editProduct?.price?.replace("$", "") || "",
      qty: editProduct?.qty || "",
      status: editProduct?.status || "",
    },
    validationSchema: addProductSchema,
    enableReinitialize: true,
onSubmit: (values) => {
  navigate("/product", {
    state: { success: editProduct ? "Product Updated Successfully!" : "Product Saved Successfully!" },
  });
},


  });



  const handleImageUpload = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const newImages = [...images];
      newImages[index] = URL.createObjectURL(file);
      setImages(newImages);
    }
  };

  // Edit mode mein existing image dikhao
  useEffect(() => {
    if (editProduct?.image) {
      setImages([editProduct.image, null, null, null]);
    }
  }, [editProduct]);

  return (
    <div className="addproduct-page">

      {/* Title */}
      <div className="page-title">
        <h1>Product</h1>
        <p>Dashboard ▼ Product ▼ Sneakers ▼ <span className="bold">{editProduct ? "Edit Product" : "Add Product"}</span></p>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="addproduct-grid">

          {/* LEFT - Product Information */}
          <div className="addproduct-card">
            <h6>Product Information</h6>
            <p className="card-subtitle">
              Lorem ipsum dolor sit amet consectetur. Non ac nulla aliquam aenean in velit mattis.
            </p>

            {/* SKU */}
            <div className="form-group">
              <label>SKU</label>
              <input
                type="text"
                name="sku"
                placeholder="Input no SKU"
                value={formik.values.sku}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={formik.touched.sku && formik.errors.sku ? "input-error" : ""}
              />
              {formik.touched.sku && formik.errors.sku && (
                <small className="error-msg">{formik.errors.sku}</small>
              )}
            </div>

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

            {/* Size + Color */}
            <div className="form-row">
              <div className="form-group">
                <label>Size</label>
                <input
                  type="text"
                  name="size"
                  placeholder="Input Price"
                  value={formik.values.size}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={formik.touched.size && formik.errors.size ? "input-error" : ""}
                />
                {formik.touched.size && formik.errors.size && (
                  <small className="error-msg">{formik.errors.size}</small>
                )}
              </div>
              <div className="form-group">
                <label>Color</label>
                <input
                  type="text"
                  name="color"
                  placeholder="Color"
                  value={formik.values.color}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={formik.touched.color && formik.errors.color ? "input-error" : ""}
                />
                {formik.touched.color && formik.errors.color && (
                  <small className="error-msg">{formik.errors.color}</small>
                )}
              </div>
            </div>

            {/* Category + Price */}
            <div className="form-row">
              <div className="form-group">
                <label>Product Category</label>
                <select
                  name="category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={formik.touched.category && formik.errors.category ? "input-error" : ""}
                >
                  <option value="">Select product category</option>
                  <option value="Sneakers">Sneakers</option>
                  <option value="Jacket">Jacket</option>
                  <option value="T-Shirt">T-Shirt</option>
                  <option value="Bag">Bag</option>
                </select>
                {formik.touched.category && formik.errors.category && (
                  <small className="error-msg">{formik.errors.category}</small>
                )}
              </div>
              <div className="form-group">
                <label>Price</label>
                <input
                  type="text"
                  name="price"
                  placeholder="Input Price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={formik.touched.price && formik.errors.price ? "input-error" : ""}
                />
                {formik.touched.price && formik.errors.price && (
                  <small className="error-msg">{formik.errors.price}</small>
                )}
              </div>
            </div>

            {/* Quantity */}
            <div className="form-group">
              <label>Quantity</label>
              <input
                type="text"
                name="qty"
                placeholder="Input stock"
                value={formik.values.qty}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={formik.touched.qty && formik.errors.qty ? "input-error" : ""}
              />
              {formik.touched.qty && formik.errors.qty && (
                <small className="error-msg">{formik.errors.qty}</small>
              )}
            </div>

            {/* Status */}
            <div className="form-group">
              <label>Status Product</label>
              <select
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={formik.touched.status && formik.errors.status ? "input-error" : ""}
              >
                <option value="">Select status product</option>
                <option value="Available">Available</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
              {formik.touched.status && formik.errors.status && (
                <small className="error-msg">{formik.errors.status}</small>
              )}
            </div>
          </div>

          {/* RIGHT - Image Product */}
          <div className="addproduct-card">
            <h6>Image Product</h6>
            <p className="card-note">
              <span className="bold-blue">Note :</span> Format photos SVG, PNG, or JPG (Max size 4mb)
            </p>

            <div className="image-upload-grid">
              {images.map((img, i) => (
                <label key={i} className="image-upload-box">
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => handleImageUpload(i, e)}
                  />
                  {img ? (
                    <img src={img} alt={`Photo ${i + 1}`} className="uploaded-img" />
                  ) : (
                    <>
                      <span className="upload-icon"><FaImage /></span>
                      <span>Photo {i + 1}</span>
                    </>
                  )}
                </label>
              ))}
            </div>

            <button
              type="submit"
              className="save-btn"
              onClick={() => {
                if (!formik.isValid) {
                  toast.error("Please fill all required fields!");
                }
              }}
            >
              {editProduct ? "Update Product" : "Save Product"}
            </button>
          </div>

        </div>
      </form>
    </div>
  );
}