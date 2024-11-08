'use client'
import Link from "next/link";

export default function BlogItems({ blogTitle, blogDescription, id, onDelete }) {
  return (
    <div className="section-1 
    transform transition-transform duration-200 hover:scale-105 hover:shadow-lg">
      <p className="h2-1">{blogTitle}</p>
      <p className="p-1 line-clamp-2">{blogDescription}</p>
      <div className="flex items-center space-x-4 mt-2">
      <Link href={`/BlogsPage/${id}`} passHref>
          <btn className='btn-2'>Continue reading...</btn>
      </Link>
      <btn onClick={() => onDelete(id)} className='btn-2'>Delete Blog</btn>
    </div>
    </div>
  );
}