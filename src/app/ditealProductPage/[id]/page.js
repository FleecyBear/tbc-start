"use client"; 
import { useParams, useSearchParams } from 'next/navigation'; 
import { useEffect, useState } from 'react';

async function GetProductByID(id) {
    try {
        console.log(`Fetching data from https://dummyjson.com/products/${id}`);
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        console.log("Response Status:", response.status); 

        if (!response.ok) {
            console.error(`Error fetching product: ${response.statusText}`);
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log('Data fetched successfully:', data);
        return data;
    } catch (error) {
        console.error("Failed to fetch product:", error);
        return null;
    }
}

export default function DetailProductPage() {
    const { id } = useParams(); 
    const searchParams = useSearchParams(); 
    const [productData, setProductData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("Search Params:", searchParams.toString()); 
        console.log("Product ID from params:", id); 

       
        if (id) {
            const fetchData = async () => {
                console.log(`Fetching product with ID: ${id}`);
                const data = await GetProductByID(id);
                console.log("Fetched Data:", data);

                if (data) {
                    setProductData(data);
                } else {
                    setError('Product not found');
                }
                setLoading(false); 
            };

            fetchData();
        } else {
            console.error('No product ID provided');
            setError('No product ID provided');
            setLoading(false); 
        }
    }, [id]); 

    if (loading) return <p>Loading...</p>; 
    if (error) return <p>{error}</p>; 

    return (
        <div>
            {productData ? (
                <div>
                    <h1>{productData.title}</h1>
                    <img src={productData.image} alt={productData.title} />
                    <p>{productData.description}</p>
                    <p>Price: {productData.price}</p>
                </div>
            ) : (
                <p>Product not found.</p>
            )}
        </div>
    );
}
