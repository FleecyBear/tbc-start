'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: number;
  Image: string;
  Title: string;
  Title_Ka: string;
  Description: string;
  Description_Ka: string;
  Price: number;
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const lang = localStorage.getItem('lang') || 'en';

        const res = await fetch(`/api/products`, {
          method: 'GET',
          headers: {
            'lang': lang,
          },
        });

        const data = await res.json();

        if (data.error) {
          setError(data.error);
        } else {
          setProducts(data);
        }
      } catch (err) {
        setError('An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link key={product.id} href={`/productsPage/${product.id}`} passHref>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer">
                <Image
                  src={product.Image || '/fallback-image.jpg'}
                  alt={product.Title || 'Product'}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover"
                />
              <div className="p-4">
              <h2 className="text-xl font-semibold">
                {localStorage.getItem('lang') === 'ge' ? product.Title_Ka : product.Title}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                {localStorage.getItem('lang') === 'ge' ? product.Description_Ka : product.Description}
              </p>
              
              <div className="flex items-center justify-between mb-4">
                <p className="text-lg font-bold">${product.Price}</p>
                <button
                  className="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                >
                  Add to Cart
                </button>
              </div>
            </div>

              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
