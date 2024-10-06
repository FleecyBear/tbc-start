"use client";
import "./BlogItems.css";
import CustomButton from "../../button/button.js";
import { useRouter } from 'next/navigation'; 

export default function BlogItems({ blogTitle, blogDescription, id }) {
  const router = useRouter(); 

  const handleClick = () => {
    router.push(`/detailBlogPage/${id}`);
  };

  return (
    <div className="blogItemsContent" onClick={handleClick}> 
      <p className="blogItemsTitle">{blogTitle}</p>
      <p className="blogItemsDescription">{blogDescription}</p>
      <div className="blogItemsButton">
        <CustomButton buttonText="Continue reading..." />
      </div>
    </div>
  );
}
