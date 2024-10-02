import React from 'react'
import "./BlogItems.css"
import Button from "../../Button/Button";

export default function BlogItems({blogTitle, blogDescription, }) {
  return (
      <div className= "blogItemsContent">
        <p>{blogTitle}</p>
        <p className="blogItemsDescription">{blogDescription}</p>
        <Button className ="blogItemsButton"  buttonText="See more..." />
      </div>
  )
}