"use client";
import "./productsPage.css";
import Products from './products/page.jsx';
import { useEffect, useState } from 'react';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch categories on component mount
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch('https://dummyjson.com/products/category-list');
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    }

    fetchCategories();
  }, []);

  // Fetch products based on search query, category, sorting field, and order
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true); // Set loading to true when fetching
      try {
        // Build URL for fetching products
        const categoryPart = selectedCategory ? `/category/${selectedCategory}` : "";
        const searchPart = searchQuery ? `search?q=${searchQuery}&` : "";
        const url = `https://dummyjson.com/products/${categoryPart}?${searchPart}sortBy=${sortField}&order=${sortOrder}`;

        const res = await fetch(url);
        const data = await res.json();
        setProducts(data.products); // Update products state with fetched data
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    }

    fetchProducts();
  }, [sortField, sortOrder, searchQuery, selectedCategory]);

  if (loading) return <p>Loading products...</p>;
  if (!products.length) return <p>No products found</p>;

  return (
    <div className="products-main-container">
      <div className="sorting-controls">
        <label htmlFor="searchQuery">Search:</label>
        <input
          id="searchQuery"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..."
        />

        <label htmlFor="category">Category:</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

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
        {products.map((product) => (
          <Products
            key={product.id}
            id={product.id}
            image={product.images} 
            description={product.description}
            title={product.title}
            price={product.price}
            brand={product.brand}
          />
        ))}
      </div>
    </div>
  );
}
