"use client";
import "./productsPage.css";
import Products from './products/page.jsx';
import { useEffect, useState } from 'react';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState("title"); 
  const [sortOrder, setSortOrder] = useState("asc"); 

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`https://dummyjson.com/products?sortBy=${sortField}&order=${sortOrder}`);
        const data = await res.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [sortField, sortOrder]); 

  if (loading) return <p>Loading products...</p>; 
  if (!products.length) return <p>No products found</p>; 

  return (
      <div className="products-main-container">
      <div className="sorting-controls">
        <label htmlFor="sortField">Sort by:</label>
        <select
          id="sortField"
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
        >
          <option value="title">Title</option>
          <option value="price">Price</option>
          <option value="brand">Brand</option>
        </select>

        <label htmlFor="sortOrder">Order:</label>
        <select
          id="sortOrder"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <div className="Product_List">
      {products.map((product) => {
        return (
          <Products
            key={product.id}
            id={product.id}
            image={product.images} 
            description={product.description}
            title={product.title}
            price={product.price}
            brand={product.brand}
          />
        );
      })}
    </div>
    </div>
  );
}
