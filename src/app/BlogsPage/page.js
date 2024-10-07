import "./Blog.css";
import BlogItems from "../BlogsPage/blog-items/page";

async function getAllBlogs() {
  console.log("getAllBlogs");
  const result = await fetch("https://dummyjson.com/posts");
  const data = await result.json();
  console.log("getAllBlogs");
  console.log(data.posts);
  return data.posts;
}

export default async function BlogsPage() {
  var BlogList = await getAllBlogs();
  return (
    <div className="BlogContainer">
      <div className="BlogPageWelcome">
        <p className="BlogPageTitle">Blogs</p>
      </div>
      <div className="Blog_List">
        {BlogList.length > 0 &&
          BlogList.map((blog) => {
            console.log(blog);
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
