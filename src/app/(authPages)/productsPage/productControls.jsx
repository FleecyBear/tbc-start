"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const ProductControls = ({ 
  categories, 
  selectedCategory, 
  sortBy, 
  order, 
  search 
}) => {
  const router = useRouter();
  const [localCategory, setLocalCategory] = useState(selectedCategory);
  const [localSortBy, setLocalSortBy] = useState(sortBy);
  const [localOrder, setLocalOrder] = useState(order);
  const [localSearch, setLocalSearch] = useState(search);
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    setLocalCategory(selectedCategory);
    setLocalSortBy(sortBy);
    setLocalOrder(order);
    setLocalSearch(search);
  }, [selectedCategory, sortBy, order, search]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(localSearch);
    }, 500); 

    return () => {
      clearTimeout(handler);
    };
  }, [localSearch]);

  useEffect(() => {
    updateQueryParams('search', debouncedSearch);
  }, [debouncedSearch]);

  const updateQueryParams = (key, value) => {
    const params = new URLSearchParams(window.location.search);
    params.set(key, value);
    router.push(`/productsPage?${params.toString()}`);
  };

  const handleChange = (key, value) => {
    switch (key) {
      case 'category':
        setLocalCategory(value);
        break;
      case 'sortBy':
        setLocalSortBy(value);
        break;
      case 'order':
        setLocalOrder(value);
        break;
      case 'search':
        setLocalSearch(value);
        break;
      default:
        break;
    }

    if (key !== 'search') {
      updateQueryParams(key, value);
    }
  };

  return (
    <div className="controls">
      <select aria-label="Sort by" value={localSortBy} onChange={(e) => handleChange('sortBy', e.target.value)}>
        <option value="title">Sort by Title</option>
        <option value="price">Sort by Price</option>
        <option value="brand">Sort by Brand</option>
      </select>

      <select
        id="category"
        aria-label="Category"
        value={localCategory}
        onChange={(e) => handleChange('category', e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.slug} value={category.slug}>
            {category.name}
          </option>
        ))}
      </select>

      <select aria-label="Order" value={localOrder} onChange={(e) => handleChange('order', e.target.value)}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      <input
        type="text"
        placeholder="Search products..."
        aria-label="Search products"
        value={localSearch}
        onChange={(e) => handleChange('search', e.target.value)}
      />
    </div>
  );
};

export default ProductControls;
