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
      stars.push(
        i <= Math.round(rating)
          ? <FaStar key={i} />
          : <FaRegStar key={i} />
      );
    }

    return stars;
  };

  if (loading) {
    return (
      <div className="view-product">
        <h3>Loading...</h3>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="view-product">
        <h3>Product not found.</h3>
      </div>
    );
  }

  return (
    <div className="view-product">

      <button
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft /> Back
      </button>

      <div className="view-card">

        <div className="view-left">

          <img
            className="main-image"
            src={product.thumbnail}
            alt={product.title}
          />

          <div className="thumb-images">
            {product.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt=""
              />
            ))}
          </div>

        </div>

        <div className="view-right">

          <h2>{product.title}</h2>

          <p className="brand">
            {product.brand} • {product.category}
          </p>

          <div className="rating">
            <span className="stars">
              {renderStars(product.rating)}
            </span>

            <span>
              {product.rating} / 5
            </span>
          </div>

          <p className="description">
            {product.description}
          </p>

          <div className="details-grid">

            <div>
              <small>Price</small>
              <h4>${product.price}</h4>
            </div>

            <div>
              <small>Stock</small>
              <h4>{product.stock}</h4>
            </div>

            <div>
              <small>Discount</small>
              <h4>{product.discountPercentage}%</h4>
            </div>

            <div>
              <small>SKU</small>
              <h4>{product.sku}</h4>
            </div>

            <div>
              <small>Weight</small>
              <h4>{product.weight} kg</h4>
            </div>

            <div>
              <small>Warranty</small>
              <h4>{product.warrantyInformation}</h4>
            </div>

          </div>

          <span
            className={
              product.stock > 0
                ? "status available"
                : "status out"
            }
          >
            {product.stock > 0
              ? "Available"
              : "Out Of Stock"}
          </span>

        </div>

      </div>

      <div className="review-section">

        <h3>
          Customer Reviews ({product.reviews?.length || 0})
        </h3>

        {
          product.reviews?.length > 0
          ? product.reviews.map((review, index) => (

            <div
              key={index}
              className="review-card"
            >

              <div className="review-top">

                <strong>
                  {review.reviewerName}
                </strong>

                <span className="stars">
                  {renderStars(review.rating)}
                </span>

              </div>

              <p>{review.comment}</p>

              <small>
                {new Date(review.date).toLocaleDateString()}
              </small>

            </div>

          ))
          :
          <p>No Reviews Found.</p>
        }

      </div>

    </div>
  );
}