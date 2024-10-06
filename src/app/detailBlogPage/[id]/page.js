"use client"; 
import { useParams, useSearchParams } from 'next/navigation'; 
import { useEffect, useState } from 'react';

async function GetPostByID(id) {
    try {
        console.log(`Fetching data from https://dummyjson.com/posts/${id}`);
        const response = await fetch(`https://dummyjson.com/posts/${id}`);
        console.log("Response Status:", response.status); // Log status

        if (!response.ok) {
            console.error(`Error fetching post: ${response.statusText}`);
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log('Data fetched successfully:', data);
        return data;
    } catch (error) {
        console.error("Failed to fetch post:", error);
        return null;
    }
}

export default function DetailBlogPage() {
    const { id } = useParams(); 
    const searchParams = useSearchParams(); 
    const [postData, setPostData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        console.log("Search Params:", searchParams.toString()); 
        console.log("Blog Post ID from params:", id); 

      
        if (id) {
            const fetchData = async () => {
                console.log(`Fetching post with ID: ${id}`);
                const data = await GetPostByID(id);

                if (data) {
                    setPostData(data);
                } else {
                    setError('Post not found');
                }
                setLoading(false); 
            };

            fetchData();
        } else {
            console.error('No post ID provided');
            setError('No post ID provided');
            setLoading(false); 
        }
    }, [id]); 

    if (loading) return <p>Loading...</p>; 
    if (error) return <p>{error}</p>; 
    return (
        <div>
            {postData ? (
                <div>
                    <h1>{postData.title}</h1>
                    <p>{postData.body}</p>
                </div>
            ) : (
                <p>Post not found.</p>
            )}
        </div>
    );
}
