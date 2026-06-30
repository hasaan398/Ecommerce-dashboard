import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useFormik } from "formik";
import { addProductSchema } from "../../validation/schema";
import { FaImage } from "react-icons/fa";
import { toast } from "react-toastify";
import "./addproduct.css";

export default function AddProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [images, setImages] = useState([null, null, null, null]);
  const [editProduct, setEditProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(!!id);

  // Categories list fetch karo (dropdown ke liye)
  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => {

        const list = Array.isArray(data)
          ? data.map((c) => (typeof c === "string" ? c : c.name || c.slug))
          : [];
        setCategories(list);
      })
      .catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`https://dummyjson.com/products/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Product not found");
          return res.json();
        })
        .then((data) => {
          setEditProduct(data);
          setImages([data.thumbnail, null, null, null]);
          setLoading(false);
        })
        .catch(() => {
          toast.error("Failed to load product for editing");
          setLoading(false);
        });
    }
  }, [id]);

  const formik = useFormik({
    initialValues: {
      sku: editProduct?.sku || "",
      name: editProduct?.title || "",
      brand: editProduct?.brand || "",
      weight: editProduct?.weight || "",
      category: editProduct?.category || "",
      price: editProduct?.price || "",
      qty: editProduct?.stock || "",
      status: editProduct ? (editProduct.stock > 0 ? "Available" : "Out of Stock") : "",
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

  if (loading) {
    return (
      <div className="addproduct-page">
        <p style={{ padding: 24 }}>Loading product...</p>
      </div>
    );
  }

  return (
    <div className="addproduct-page">

      {/* Title */}
      <div className="page-title">
        <h1>Product</h1>
        <p>
          <Link to="/dashboard">Dashboard</Link> ⯈{" "}
          <Link to="/product">Product</Link> ⯈{" "}
          {formik.values.category ? (
            <Link to={`/product/${formik.values.category.toLowerCase()}`}>
              {formik.values.category}
            </Link>
          ) : (
            "Category"
          )}{" "}
          ⯈ <span className="bold">{editProduct ? "Edit Product" : "Add Product"}</span>
        </p>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="addproduct-grid">

          <div className="addproduct-card">
            <h6>Product Information</h6>
            <p className="card-subtitle">
              Lorem ipsum dolor sit amet consectetur. Non ac nulla aliquam aenean in velit mattis.
            </p>

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

            <div className="form-row">
              <div className="form-group">
                <label>Brand</label>
                <input
                  type="text"
                  name="brand"
                  placeholder="Input brand"
                  value={formik.values.brand}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={formik.touched.brand && formik.errors.brand ? "input-error" : ""}
                />
                {formik.touched.brand && formik.errors.brand && (
                  <small className="error-msg">{formik.errors.brand}</small>
                )}
              </div>
              <div className="form-group">
                <label>Weight (kg)</label>
                <input
                  type="text"
                  name="weight"
                  placeholder="Input weight"
                  value={formik.values.weight}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={formik.touched.weight && formik.errors.weight ? "input-error" : ""}
                />
                {formik.touched.weight && formik.errors.weight && (
                  <small className="error-msg">{formik.errors.weight}</small>
                )}
              </div>
            </div>

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
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
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

            <div className="form-group">
              <label>Quantity (Stock)</label>
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