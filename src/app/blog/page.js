"use client";
import "./Blog.css";
import BlogItems from "./blog-items/blogitems.js";
import { useEffect, useState } from "react";

export default function Blog() {
  const [blogList, setBlog] = useState([]);
  ///immediate Invoke function
  useEffect(() => {
    (async function getBlogPosts() {
      try {
        const jsonData = await fetch("https://dummyjson.com/posts");
        const data = await jsonData.json();
        console.log(data);
        setBlog(data.posts);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <div className="BlogContainer">
      <div className="BlogPageWelcome">
        <p className="BlogPageTitle">Blogs</p>
        <p className="BlogPageTitleDescription">Learn more about pandas</p>
      </div>
      <div className="BlogItems">
        {blogList.map((item, index) => (
          <BlogItems
            key={index}
            blogTitle={item.title}
            blogDescription={item.body}
          />
        ))}
      </div>
    </div>
  );
}
