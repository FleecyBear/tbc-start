"use client";
import "./Blog.css";
import BlogItems from "../BlogsPage/blog-items/page";
import { useEffect, useState } from 'react';

export default function BlogsPage() {
  const [blogList, setBlogList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch("https://dummyjson.com/posts");
        const data = await res.json();
        setBlogList(data.posts);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  if (loading) return <p>Loading blogs...</p>;

  if (!blogList.length) return <p>No blogs found</p>;

  return (
    <div className="BlogContainer">
      <div className="BlogPageWelcome">
        <p className="BlogPageTitle">Blogs</p>
      </div>
      <div className="Blog_List">
        {blogList.map((blog) => {
          return (
            <BlogItems
              key={blog.id}
              blogTitle={blog.title}
              blogDescription={blog.body}
              id={blog.id}
            />
          );
        })}
      </div>
    </div>
  );
}
