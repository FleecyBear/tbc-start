'use client'

import { useEffect, useState } from "react";
import supaBase from "../../../utils/supaBase"; 
import Image from "next/image";

interface Product {
  id: number;  
  image: string;
  title: string;
  description: string;
  price: number;
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lang, setLang] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLang = localStorage.getItem("lang") || "en";
      setLang(storedLang); 
    }
  }, []);

  useEffect(() => {
    if (lang) {
      const fetchData = async () => {
        try {
          const { data, error } = await supaBase
            .from("Products")
            .select(
              lang === "ge"
                ? "id, Image, Title_Ka, Description_Ka, Price"
                : "id, Image, Title, Description, Price"
            );
  
          if (error) {
            setError("Error fetching products: " + error.message);
          } else {
            const validData = data?.map((item: any) => ({
              id: item.id,
              image: item.Image,
              title: lang === "ge" ? item.Title_Ka : item.Title, 
              description: lang === "ge" ? item.Description_Ka : item.Description, 
              price: item.Price,
            }));
  
            setProducts(validData || []);
          }
        } catch (err) {
          setError("An unexpected error occurred.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }
  }, [lang]); 
  

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
            <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <Image
                src={product.image}
                alt={product.title}
                width={400}
                height={300}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{product.title}</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-4">{product.description}</p>
                <p className="text-lg font-bold">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
