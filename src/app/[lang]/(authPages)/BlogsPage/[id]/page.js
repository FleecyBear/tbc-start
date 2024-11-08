import LikeIcon from '../../../../svgIcons/likeIcon'
import DislikeIcon from '../../../../svgIcons/dislikeIcon';
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
    <div className="section-1 w-2/3 ">
      <div className="space-y-6">
        <h1 className="h2-1">
          {postData.title}
        </h1>
        <p className="p-1">
          {postData.body}
        </p>
  
        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mt-6 border-t pt-4 border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Tags:{" "}
            {postData.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded-full text-xs mr-2 mb-1"
              >
                {tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase()}
              </span>
            ))}
          </p>
  
          <div className="flex space-x-4 mt-4 md:mt-0 text-gray-600 dark:text-gray-400">
            <p className="flex items-center">
              <LikeIcon  />:{" "}
              {postData.reactions.likes}
            </p>
            <p className="flex items-center">
              <DislikeIcon  />:{" "}
              {postData.reactions.dislikes}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}  