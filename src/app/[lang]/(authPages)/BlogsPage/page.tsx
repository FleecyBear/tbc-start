'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Blog {
  id: number;
  Title: string;
  Title_Ka: string;
  Description: string;
  Description_Ka: string;
}

const BlogPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const lang = localStorage.getItem('lang') || 'en'; 

        const res = await fetch(`/api/blogs`, {
          method: 'GET',
          headers: {
            'lang': lang,
          },
        });

        const data = await res.json();

        if (data.error) {
          setError(data.error);
        } else {
          setBlogs(data); 
        }
      } catch (err) {
        setError('An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
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
        <h1 className="text-4xl font-bold mb-6">Blogs</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">
                  {localStorage.getItem('lang') === 'ge' ? blog.Title_Ka : blog.Title}
                </h2> 
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  {localStorage.getItem('lang') === 'ge' ? blog.Description_Ka : blog.Description}
                </p>
                <Link href={`/BlogsPage/${blog.id}`} className="text-indigo-600 hover:text-indigo-800 font-semibold">
                  Read more
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
