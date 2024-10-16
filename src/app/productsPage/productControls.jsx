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

  useEffect(() => {
    setLocalCategory(selectedCategory);
    setLocalSortBy(sortBy);
    setLocalOrder(order);
    setLocalSearch(search);
  }, [selectedCategory, sortBy, order, search]);

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setLocalCategory(newCategory);
    router.push(`/productsPage?category=${newCategory}&sortBy=${localSortBy}&order=${localOrder}&search=${localSearch}`);
  };

  const handleSortChange = (e) => {
    const newSort = e.target.value;
    setLocalSortBy(newSort);
    router.push(`/productsPage?category=${localCategory}&sortBy=${newSort}&order=${localOrder}&search=${localSearch}`);
  };

  const handleOrderChange = (e) => {
    const newOrder = e.target.value;
    setLocalOrder(newOrder);
    router.push(`/productsPage?category=${localCategory}&sortBy=${localSortBy}&order=${newOrder}&search=${localSearch}`);
  };

  const handleSearchChange = (e) => {
    const newSearch = e.target.value;
    setLocalSearch(newSearch);
    router.push(`/productsPage?category=${localCategory}&sortBy=${localSortBy}&order=${localOrder}&search=${newSearch}`);
  };

  return (
    <div className="controls">
      <select value={localSortBy} onChange={handleSortChange}>
        <option value="title">Sort by Title</option>
        <option value="price">Sort by Price</option>
        <option value="brand">Sort by Brand</option>
      </select>

      <select
        id="category"
        value={localCategory}
        onChange={handleCategoryChange}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.slug} value={category.slug}>
            {category.name}
          </option>
        ))}
      </select>

      <select value={localOrder} onChange={handleOrderChange}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      <input
        type="text"
        placeholder="Search products..."
        value={localSearch}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default ProductControls;
