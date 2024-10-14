"use client";
import "./productsPage.css";
import Products from './products/page.jsx';
import { useEffect, useState } from 'react';

export default function ProductsPage() {
  const [data, setData] = useState({
    products: [],
    categories: [],
    loading: true,
    sortField: "title",
    sortOrder: "asc",
    selectedCategory: "",
    searchQuery: ""
  });

  
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch('https://dummyjson.com/products/category-list');
        const categories = await res.json();
        setData((prev) => ({ ...prev, categories })); 
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    }

    fetchCategories();
  }, []);


  useEffect(() => {
    async function fetchProducts() {
      setData((prev) => ({ ...prev, loading: true })); 
      try {
        const categoryPart = data.selectedCategory ? `/category/${data.selectedCategory}` : "";
        const searchPart = data.searchQuery ? `search?q=${data.searchQuery}&` : "";
        const url = `https://dummyjson.com/products/${categoryPart}?${searchPart}sortBy=${data.sortField}&order=${data.sortOrder}`;

        const res = await fetch(url);
        const products = await res.json();
        setData((prev) => ({ ...prev, products: products.products }));
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setData((prev) => ({ ...prev, loading: false })); 
      }
    }

    fetchProducts();
  }, [data.sortField, data.sortOrder, data.searchQuery, data.selectedCategory]);

  if (data.loading) return <p>Loading products...</p>;
  if (!data.products.length) return <p>No products found</p>;

  return (
    <div className="products-main-container">
      <div className="sorting-controls">
        <label htmlFor="searchQuery">Search:</label>
        <input
          id="searchQuery"
          type="text"
          value={data.searchQuery}
          onChange={(e) => setData((prev) => ({ ...prev, searchQuery: e.target.value }))}
          placeholder="Search products..."
        />

        <label htmlFor="category">Category:</label>
        <select
          id="category"
          value={data.selectedCategory}
          onChange={(e) => setData((prev) => ({ ...prev, selectedCategory: e.target.value }))}
        >
          <option value="">All Categories</option>
          {data.categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <label htmlFor="sortField">Sort by:</label>
        <select
          id="sortField"
          value={data.sortField}
          onChange={(e) => setData((prev) => ({ ...prev, sortField: e.target.value }))}
        >
          <option value="title">Title</option>
          <option value="price">Price</option>
          <option value="brand">Brand</option>
        </select>

        <label htmlFor="sortOrder">Order:</label>
        <select
          id="sortOrder"
          value={data.sortOrder}
          onChange={(e) => setData((prev) => ({ ...prev, sortOrder: e.target.value }))}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <div className="Product_List">
        {data.products.map((product) => (
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
