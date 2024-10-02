import React from 'react'
import "./BlogItems.css"
import CustomButton from "../../Button/Button";

export default function BlogItems({blogTitle, blogDescription, }) {
  return (
      <div className= "blogItemsContent">
        <p className="blogItemsTitle">{blogTitle}</p>
        <p className="blogItemsDescription">{blogDescription}</p>
        <div className ="blogItemsButton"> 
        <CustomButton buttonText="Continue reading..." />
        </div>
      </div>
  )
}