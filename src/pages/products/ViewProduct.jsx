import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaStar, FaRegStar } from "react-icons/fa";
import "./ViewProduct.css";

export default function ViewProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const renderStars = (rating = 0) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= Math.round(rating) ? <FaStar key={i} /> : <FaRegStar key={i} />);
    }
    return stars;
  };

  if (loading) return <div className="view-product"><h3>Loading...</h3></div>;
  if (!product) return <div className="view-product"><h3>Product not found.</h3></div>;

  // ✅ Calculate old price from discount
  const oldPrice = (product.price / (1 - product.discountPercentage / 100)).toFixed(0);

  return (
    <div className="view-product">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back
      </button>

      <div className="view-card">
        {/* Left: Images */}
        <div className="view-left">
          <img className="main-image" src={product.thumbnail} alt={product.title} />
          <div className="thumb-images">
            {product.images?.map((img, index) => (
              <img key={index} src={img} alt="" />
            ))}
          </div>
        </div>

        {/* Right: Info */}
        <div className="view-right">
          <h2>{product.title}</h2>
          <p className="brand">{product.brand} • {product.category}</p>

          <div className="rating">
            <span className="stars">{renderStars(product.rating)}</span>
            <span>{product.rating} / 5</span>
          </div>

          {/* ✅ Daraz Style Price */}
          <div className="price-box">
            <span className="new-price">${product.price}</span>
            <div className="price-row">
              <span className="old-price">${oldPrice}</span>
              <span className="discount-badge">{product.discountPercentage}% OFF</span>
            </div>
          </div>

          <span className={product.stock > 0 ? "status available" : "status out"}>
            {product.stock > 0 ? "Available" : "Out Of Stock"}
          </span>

          <p className="description">{product.description}</p>

          {/* Specs */}
          <div className="specs-table">
            <div><small>SKU</small><span>{product.sku}</span></div>
            <div><small>Weight</small><span>{product.weight} kg</span></div>
            <div><small>Warranty</small><span>{product.warrantyInformation}</span></div>
            <div><small>Shipping</small><span>{product.shippingInformation}</span></div>
            <div><small>Return Policy</small><span>{product.returnPolicy}</span></div>
            <div><small>Min Order</small><span>{product.minimumOrderQuantity}</span></div>
            <div><small>Release Date</small><span>{new Date(product.releaseDate).toLocaleDateString()}</span></div>
            <div><small>Tags</small><span>{product.tags?.join(", ")}</span></div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="review-section">
        <h3>Customer Reviews ({product.reviews?.length || 0})</h3>
        {product.reviews?.length > 0 ? (
          product.reviews.map((review, index) => (
            <div key={index} className="review-card">
              <div className="review-top">
                <strong>{review.reviewerName}</strong>
                <span className="stars">{renderStars(review.rating)}</span>
              </div>
              <small className="review-email">{review.reviewerEmail}</small>
              <p>{review.comment}</p>
              <small>{new Date(review.date).toLocaleDateString()}</small>
            </div>
          ))
        ) : (
          <p>No Reviews Found.</p>
        )}
      </div>
    </div>
  );
}
