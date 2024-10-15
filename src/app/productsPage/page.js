"use client";
import "./productsPage.css";
import Products from './products/page.jsx';
import { useEffect, useState } from 'react';

async function getProducts(searchTerm = "", sortBy = "title", order = "asc") {
  try {
    const res = await fetch(
      `https://dummyjson.com/products?search=${searchTerm}&sortBy=${sortBy}&order=${order}`
    );
    const data = await res.json();
    console.log("Fetched products:", data.products); 
    return data.products || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

async function getCategories() {
  try {
    const res = await fetch("https://dummyjson.com/products/categories");
    const data = await res.json();
    console.log("Fetched categories:", data); 
    return data; 
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export default function ProductsPage({ searchParams }) {
  const [searchTerm, setSearchTerm] = useState(searchParams?.search || "");
  const [sortBy, setSortBy] = useState(searchParams?.sortBy || "title");
  const [order, setOrder] = useState(searchParams?.order || "asc");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noResults, setNoResults] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories); 
    };

    fetchCategories(); 
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const fetchedProducts = await getProducts(searchTerm, sortBy, order);
      setProducts(fetchedProducts);
      setNoResults(fetchedProducts.length === 0);
      setLoading(false);
    };

    fetchProducts(); 
  }, [searchTerm, sortBy, order]);

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory) 
    : products;

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
            <option key={category.slug} value={category.slug}>
              {category.name} 
            </option>
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
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
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
