import "./Blog.css";
import BlogItems from "./blog-items/page";

async function fetchBlogs() {
  const res = await fetch("https://dummyjson.com/posts");
  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }
  const data = await res.json();
  return data.posts;
}

export default async function BlogsPage() {
  let blogList;

  try {
    blogList = await fetchBlogs();
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    blogList = [];
  }

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
