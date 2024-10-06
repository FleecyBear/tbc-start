"use client"
import Image from "next/image";
import Products from "../products/page.js";
import "./productsPage.css";
import { useEffect, useState } from "react";

export default function ProductsPage() {

  
  const [productList, serProductList] = useState([]);
  

  useEffect(()=>{
    (async function getproduct(){
        try {
            const jsonData = await fetch('https://dummyjson.com/products');
            const data = await jsonData.json();
            console.log(data)
            console.log(data.products)
            serProductList(data.products)
        } catch (error) {
          console.log(error)
        }
    })();
},[])
  return (
      <div className="Product_List">    
        {
          productList.map((product)=>{
            console.log(product.id)
              return(
                <Products
                id={product.id}
                image={product.images}
                description={product.description}
                title={product.title}
                price={product.price}   
                brand={product.brand}
              />
            );
          })
        }
      </div>
  );
}
