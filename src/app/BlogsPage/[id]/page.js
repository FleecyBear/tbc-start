"use client"
import { useEffect, useState } from 'react';
import "../detailBlogs.css";
import LikeIcon from '../../svgIcons/likeIcon'; 
import DislikeIcon from '../../svgIcons/dislikeIcon'; 

export default function BlogPost({ params }) {
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`https://dummyjson.com/posts/${params.id}`);
        if (!res.ok) {
          throw new Error("Blog post not found");
        }
        const data = await res.json();
        setPostData(data);
      } catch (error) {
        console.error('Failed to fetch blog post:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [params.id]);

  if (loading) return <p>Loading...</p>;
  if (error || !postData) return <p>{error || "Blog was not retrieved."}</p>;

  return (
    <div className='detail-blog-container'> 
      <div className="blog-container">
        <h1 className="detail-blog-title">{postData.title}</h1>
        <p className="detail-blog-body">{postData.body}</p>
        <div className="detail-blog-bottom">
          <p className="detail-blog-tags">
            Tags:{" "}
            {postData.tags.map((tag, index) => (
              <span key={index} className="detail-blog-tag">
                {tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase()}{" "}
              </span>
            ))}
          </p>
          <div className="detail-blog-likes">
            <p>
              <LikeIcon />: {postData.reactions.likes}
            </p>
            <p>
              <DislikeIcon />: {postData.reactions.dislikes}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
