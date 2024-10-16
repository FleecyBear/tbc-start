"use client";
import "./productsPage.css";
import Products from './products/page.jsx';
import { useEffect, useState } from 'react';

async function getCategories() {
  try {
    const res = await fetch('https://dummyjson.com/products/categories');
    const data = await res.json();
    return data || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

async function getProducts(category = "", search = "", sort = "title", order = "asc") {
  try {
    let url = "https://dummyjson.com/products";

    if (category) {
      url += `/category/${category}`;
    }

    url += `?sortBy=${sort}&order=${order}`;

    console.log("Fetching products from:", url);
    
    const res = await fetch(url);
    const data = await res.json();
    let products = data.products || [];

    if (search) {
      products = products.filter(product =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    return products; 
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default function ProductsPage() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [order, setOrder] = useState("asc");
  const [search, setSearch] = useState(""); 
  const [debouncedSearch, setDebouncedSearch] = useState(""); 
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noResults, setNoResults] = useState(false);

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
      const products = await getProducts(selectedCategory, debouncedSearch, sortBy, order);
      setFilteredProducts(products);
      setNoResults(products.length === 0);
      setLoading(false);
    };
    fetchProducts();
  }, [selectedCategory, sortBy, order, debouncedSearch]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500); 
    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const handleSearch = (e) => {
    setSearch(e.target.value); 
  };

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
  {categories.length > 0 &&
    categories.map((category) => (
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
          value={search}
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
