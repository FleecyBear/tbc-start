import LikeIcon from '../../../svgIcons/likeIcon'
import DislikeIcon from '../../../svgIcons/dislikeIcon';
import "../detailBlogs.css";
export default async function BlogPost({ params }) {
  const { id } = params;

  let postData = null;
  let errorMessage = null;

  try {
    const res = await fetch(`https://dummyjson.com/posts/${id}`);

    if (!res.ok) {
      throw new Error("Blog post not found"); 
    }

    postData = await res.json(); 
  } catch (error) {
    console.error('Failed to fetch blog post:', error);
    errorMessage = error.message; 
  }
  
  if (!postData) {
    return <p>{errorMessage || "Blog was not retrieved."}</p>; 
  }

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
