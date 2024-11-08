'use client'
import BlogItems from "./blog-items/page";
import { useState, useEffect } from "react";

async function fetchBlogs() {
  const res = await fetch("https://dummyjson.com/posts?limit=10");
  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }
  const data = await res.json();
  return data.posts;
}

export default function BlogsPage() {
  const [blogList, setBlogList] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: "", description: "" });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    async function loadBlogs() {
      try {
        const fetchedBlogs = await fetchBlogs();
        const savedBlogs = JSON.parse(localStorage.getItem("customBlogs")) || [];
        setBlogList([...savedBlogs, ...fetchedBlogs]);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
        setBlogList([]);
      }
    }
    loadBlogs();
  }, []);

  const addCustomBlog = () => {
    if (!newBlog.title || !newBlog.description) return;

    const customBlog = {
      id: Date.now(),
      title: newBlog.title,
      description: newBlog.description,
    };

    const updatedBlogs = [customBlog, ...blogList];
    setBlogList(updatedBlogs);

    const customBlogs = JSON.parse(localStorage.getItem("customBlogs")) || [];
    customBlogs.unshift(customBlog);
    localStorage.setItem("customBlogs", JSON.stringify(customBlogs));

    setNewBlog({ title: "", description: "" });
    setShowForm(false);
  };

  const deleteBlog = (id) => {
    const updatedBlogs = blogList.filter(blog => blog.id !== id);
    setBlogList(updatedBlogs);
    const customBlogs = JSON.parse(localStorage.getItem("customBlogs")) || [];
    const filteredCustomBlogs = customBlogs.filter(blog => blog.id !== id);
    localStorage.setItem("customBlogs", JSON.stringify(filteredCustomBlogs));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewBlog((prev) => ({ ...prev, [name]: value }));
  };

  if (!blogList.length) return <p>No blogs found</p>;

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex items-center justify-between w-full max-w-4xl mb-4">
        <p className="h2-1">Blogs</p>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-2"
        >
          {showForm ? "Cancel" : "Create Blog"}
        </button>
      </div>
      
      {showForm && (
        <div className="flex flex-col section-1 w-1/3">
          <input
            type="text"
            name="title"
            placeholder="Blog Title"
            value={newBlog.title}
            onChange={handleFormChange}
            className="w-full p-2 mb-2 border border-gray-300 rounded"
          />
          <textarea
            name="description"
            placeholder="Blog Description"
            value={newBlog.description}
            onChange={handleFormChange}
            className="w-full p-2 mb-2 border border-gray-300 rounded"
          />
          <button onClick={addCustomBlog} className="btn-2 w-1/3 my-2">Add Blog</button>
        </div>
      )}
      
      <div className="w-full max-w-4xl mt-4 grid gap-4">
        {blogList.map((blog) => (
          <BlogItems
            key={blog.id}
            blogTitle={blog.title}
            blogDescription={blog.body || blog.description}
            id={blog.id}
            onDelete={deleteBlog} 
          />
        ))}
      </div>
    </div>
  );
}
