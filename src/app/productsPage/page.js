"use client";
import "./productsPage.css";
import Products from './products/page.jsx';
import { useEffect, useState } from 'react';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('title'); 
  const [order, setOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState(''); 
  const [noResults, setNoResults] = useState(false); 
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

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

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`https://dummyjson.com/products`);
        const data = await res.json();
        setProducts(data.products); 
        setNoResults(false); 
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const handleSearch = debounce((event) => {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);
  }, 500);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortBy === "price") {
      return order === "asc" ? a.price - b.price : b.price - a.price;
    }
    if (sortBy === "brand") {
      return order === "asc" ? a.brand.localeCompare(b.brand) : b.brand.localeCompare(a.brand);
    }
    return order === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
  });

  if (loading) return <p>Loading products...</p>; 

  return (
    <div className="products-main-container">
      <div className="controls">
        <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
          <option value="title">Sort by Title</option>
          <option value="price">Sort by Price</option>
          <option value="brand">Sort by Brand</option>
        </select>
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
        <select onChange={(e) => setOrder(e.target.value)} value={order}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>

        <input
          type="text"
          placeholder="Search products..."
          onChange={handleSearch}
        />
      </div>

      {noResults && <p>No results found</p>}

      <div className="Product_List">
        {sortedProducts.length > 0 ? (
          sortedProducts.map((product) => (
            <Products
              key={product.id}
              id={product.id}
              image={product.images} 
              description={product.description}
              title={product.title}
              price={product.price}
              brand={product.brand}
            />
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
}
