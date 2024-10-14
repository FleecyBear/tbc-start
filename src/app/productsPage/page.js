"use client";
import "./productsPage.css";
import Products from './products/page.jsx';
import { useEffect, useState, useCallback } from 'react';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortCriteria, setSortCriteria] = useState('price');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://dummyjson.com/products');
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        setProducts(data.products); 
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const sortProducts = useCallback((criteria, order) => {
    const sortedProducts = [...products].sort((a, b) => {
      const compareA = criteria === 'price' ? a.price : a.title.toLowerCase();
      const compareB = criteria === 'price' ? b.price : b.title.toLowerCase();
      return order === 'asc' ? (compareA > compareB ? 1 : -1) : (compareA < compareB ? 1 : -1);
    });
    setProducts(sortedProducts);
  }, [products]);

  const handleSortChange = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    sortProducts(sortCriteria, newSortOrder);
  };

  const handleCriteriaChange = (event) => {
    const newCriteria = event.target.value;
    setSortCriteria(newCriteria);
    sortProducts(newCriteria, sortOrder);
  };

  if (loading) return <p>Loading products...</p>; 
  if (!products.length) return <p>No products found</p>; 

  return (
    <div className="products-page-container">
      <div className="sort-controls">
        <select onChange={handleCriteriaChange} value={sortCriteria}>
          <option value="price">Sort by Price</option>
          <option value="name">Sort by Name</option>
        </select>
        <button className="sort-button" onClick={handleSortChange}>
          Sort: {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
        </button>
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
