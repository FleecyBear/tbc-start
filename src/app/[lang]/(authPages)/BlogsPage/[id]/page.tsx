'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface Blog {
  id: number;
  Title: string;
  Title_Ka: string;
  Description: string;
  Description_Ka: string;
}

const BlogDetailPage = () => {
  const { id, lang } = useParams();  
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return;

      try {
        const language = lang || 'en';

        const res = await fetch(`/api/blogs/${id}`, {
          method: 'GET',
          headers: {
            'lang': String(language),
          },
        });

        const data = await res.json();

        if (data.error) {
          setError(data.error);
        } else {
          setBlog(data);
        }
      } catch (err) {
        setError('An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
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

  if (!blog) {
    return <p>Blog not found</p>;
  }

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-extrabold text-center mb-6">
          {lang === 'ge' ? blog.Title_Ka : blog.Title}
        </h1>
        <div className="flex flex-col">
          <div>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
              {lang === 'ge' ? blog.Description_Ka : blog.Description}
            </p>
          </div>
          <div className="mt-4">
            <button
              className="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Share Blog
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
