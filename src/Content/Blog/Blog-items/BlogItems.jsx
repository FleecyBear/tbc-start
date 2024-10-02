import React from 'react'
import "./BlogItems.css"
import Button from "../../Button/Button";

export default function BlogItems({blogTitle, blogDescription, }) {
  return (
      <div className= "blogItemsContent">
        <p className="blogItemsTitle">{blogTitle}</p>
        <p className="blogItemsDescription">{blogDescription}</p>
        <div className ="blogItemsButton"> 
        <Button buttonText="Continue reading..." />
        </div>
      </div>
  )
}