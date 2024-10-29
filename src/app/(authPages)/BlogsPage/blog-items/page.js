import "./BlogItems.css";
import CustomButton from "../../../components/button/button.js";
import Link from "next/link";

export default function BlogItems({ blogTitle, blogDescription, id }) {
  return (
    <div className="blogItemsContent">
      <p className="blogItemsTitle">{blogTitle}</p>
      <p className="blogItemsDescription">{blogDescription}</p>
      <Link href={`/BlogsPage/${id}`} passHref>
        <div style={{ display: 'inline-block' }}>
          <CustomButton buttonText="Continue reading..." />
        </div>
      </Link>
    </div>
  );
}