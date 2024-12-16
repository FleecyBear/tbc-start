'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

interface Product {
  id: number;
  Image: string;
  Title: string;
  Title_Ka: string;
  Description: string;
  Description_Ka: string;
  Price: number;
}

const ProductDetailPage = () => {
  const { id, lang } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        const language = lang || 'en';

        const res = await fetch(`/api/products/${id}`, {
          method: 'GET',
          headers: {
            'lang': String(language),
          },
        });

        const data = await res.json();

        if (data.error) {
          setError(data.error);
        } else {
          setProduct(data);
        }
      } catch (err) {
        setError('An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, lang]);

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

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-extrabold text-center mb-6">
          {lang === 'ge' ? product.Title_Ka : product.Title}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <Image
              src={product.Image || '/fallback-image.jpg'}
              alt={product.Title || 'Product'}
              width={500}
              height={500}
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                ${product.Price}
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                {lang === 'ge' ? product.Description_Ka : product.Description}
              </p>
            </div>
            <div className="mt-4">
              <button
                className="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
