'use client';
import './productsPage.css';
import { useState, useEffect } from 'react';
import Products from './products/page.jsx';
import ProductControls from './productControls.jsx';
import CustomButton from '../../components/button/button';

export default function ProductsPage({ searchParams }) {
  const { category = "", sortBy = "title", order = "asc", search = "" } = searchParams;

  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [newProduct, setNewProduct] = useState({ title: "", price: "", brand: "", image: "" });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch('https://dummyjson.com/products/categories?limit=15');
        if (!res.ok) throw new Error('Failed to fetch categories');
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      }
    }

    async function loadProducts() {
      try {
        let url;
        
        if (category) {
          url = `https://dummyjson.com/products/category/${category}?sortBy=${sortBy}&order=${order}&limit=15`;
        } else { 
          url = `https://dummyjson.com/products/search?q=${search}&sortBy=${sortBy}&order=${order}&limit=15`;
        }

        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch products');
        
        let products = await res.json();
        products = products.products || [];

        if (search) {
          products = products.filter(product =>
            product.title.toLowerCase().includes(search.toLowerCase())
          );
        }

        const savedProducts = JSON.parse(localStorage.getItem("customProducts")) || [];
        setFilteredProducts([...savedProducts, ...products]);
        setNoResults(products.length === 0);
      } catch (error) {
        console.error("Error fetching products:", error);
        setFilteredProducts([]);
        setNoResults(true);
      }
    }

    loadCategories();
    loadProducts();
  }, [category, search, sortBy, order]);

  const addCustomProduct = () => {
    if (!newProduct.title || !newProduct.price) return;

    const customProduct = {
      id: Date.now(),
      title: newProduct.title,
      price: parseFloat(newProduct.price),
      brand: newProduct.brand,
      images: [newProduct.image || "/default-image.jpg"], 
    };

    const updatedProducts = [customProduct, ...filteredProducts];
    setFilteredProducts(updatedProducts);

    const customProducts = JSON.parse(localStorage.getItem("customProducts")) || [];
    customProducts.unshift(customProduct);
    localStorage.setItem("customProducts", JSON.stringify(customProducts));

    setNewProduct({ title: "", price: "", brand: "", image: "" });
    setShowForm(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const deleteProduct = (id) => {
    const updatedProducts = filteredProducts.filter((product) => product.id !== id);
    setFilteredProducts(updatedProducts);

    const customProducts = JSON.parse(localStorage.getItem("customProducts")) || [];
    const updatedCustomProducts = customProducts.filter((product) => product.id !== id);
    localStorage.setItem("customProducts", JSON.stringify(updatedCustomProducts));
  };

  return (
    <div className="products-main-container">
      <ProductControls 
        categories={categories}
        selectedCategory={category}
        sortBy={sortBy}
        order={order}
        search={search}
      />

      <div className="ProductPageWelcome">
        <p className="ProductPageTitle">Products</p>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "Add Product"}
        </button>
      </div>

      {showForm && (
        <div className="ProductForm">
          <input
            type="text"
            name="title"
            placeholder="Product Title"
            value={newProduct.title}
            onChange={handleFormChange}
          />
          <input
            type="text"
            name="price"
            placeholder="Product Price"
            value={newProduct.price}
            onChange={handleFormChange}
          />
          <input
            type="text"
            name="brand"
            placeholder="Product Brand"
            value={newProduct.brand}
            onChange={handleFormChange}
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={newProduct.image}
            onChange={handleFormChange}
          />
          <div onClick={addCustomProduct} style={{ display: 'inline-block' }}>
            <CustomButton buttonText="Add Product" />
          </div>
        </div>
      )}

      {noResults && <p>No results found</p>}

      <div className="Product_List">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div>
              <Products
                id={product.id}
                image={product.images}
                description={product.description}
                title={product.title}
                price={product.price}
                brand={product.brand}
              />
              <button onClick={() => deleteProduct(product.id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
}
