"use client";
import "./productsPage.css";
import Products from './products/page.jsx';
import { useEffect, useState } from 'react';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('https://dummyjson.com/products');
        const data = await res.json();
        setProducts(data.products); 
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>; 

  if (!products.length) return <p>No products found</p>; 

  return (
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
  );
}
