"use client";
import "./Blog.css";
import BlogItems from "./blog-items/page"; 
import { useEffect, useState } from 'react';

export default function Blog() {
  const [blogList, setBlogList] = useState([]); 
  // Fetch blog posts
  useEffect(() => {
    (async function getBlogPosts() {
      try {
        const jsonData = await fetch('https://dummyjson.com/posts');
        const data = await jsonData.json();
        console.log(data);
        setBlogList(data.posts); 
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="Blog_List"> 
      {blogList.map((blog) => (
        <BlogItems
          key={blog.id} 
          blogTitle={blog.title}
          blogDescription={blog.body}
          id={blog.id} 
        />
      ))}
    </div>
  );
}
