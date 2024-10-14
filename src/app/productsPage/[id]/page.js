"use client";  // Ensures client-side rendering
import { useEffect, useState } from 'react';
import '../detailPage.css';
import '../../global.css';

export default function ProductPage({ params }) {
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`https://dummyjson.com/products/${params.id}`);
        if (!res.ok) {
            throw new Error("Product not found");
          }
        const data = await res.json();
        setProductData(data);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [params.id]);

  if (loading) return <p>Loading...</p>;
  if (error || !productData) {
    return <p>Product not found.</p>;
  }

  return (
    <div className="product-container">
      <img className="product-image" src={productData.images[0]} alt={productData.title} />

      <div className="product-info">
        <h1>{productData.title}</h1>
        <p className="product-price">${productData.price}</p>

        <section className="product-description">
          <h3>About the product</h3>
          <p>{productData.description}</p>
        </section>

        <section className="product-details">
          <h3>Product Details</h3>
          <ul>
            {productData.warrantyInformation && (
              <li><strong>Warranty:</strong> {productData.warrantyInformation}</li>
            )}
            {productData.dimensions && (
              <li>
                <strong>Dimensions:</strong> {productData.dimensions.width} / {productData.dimensions.height} / {productData.dimensions.depth} (w/h/d)
              </li>
            )}
            <li><strong>Rating:</strong> {productData.rating} / 5</li>
            <li><strong>Stock:</strong> {productData.stock}</li>
          </ul>
        </section>

        <section className="product-actions">
          <label htmlFor="quantity">Quantity:</label>
          <select id="quantity">
            {Array.from({ length: productData.stock }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>

          <button className="button" id="addToCart">
            Add to Cart
          </button>

          <button className="button wishlist" id="addToWishList">
            &hearts; Add to Wishlist
          </button>

          <button className="button checkout" id="checkOut">
            Checkout
          </button>
        </section>
      </div>
    </div>
  );
}
