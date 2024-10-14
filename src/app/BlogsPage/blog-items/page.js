"use client";
import "./BlogItems.css";
import CustomButton from "../../button/button.js";
import { useRouter } from "next/navigation";

export default function BlogItems({ blogTitle, blogDescription, id }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/BlogsPage/${id}`);
  };

  return (
    <div className="blogItemsContent" >
      <p className="blogItemsTitle">{blogTitle}</p>
      <p className="blogItemsDescription">{blogDescription}</p>
      <div onClick={handleClick} style={{ display: 'inline-block' }}>
        <CustomButton  buttonText="Continue reading..." />
      </div>
    </div>
  );
}

