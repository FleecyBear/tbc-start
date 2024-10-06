"use client"
import Image from "next/image";
import Products from "../products/page.js";
import "./productsPage.css";
import { useEffect, useState } from "react";

export default function ProductsPage() {
  // const products = [
  //   {
  //     image: "/images/item1.jpg",
  //     description:
  //       "Bamboo Tube Panda Doll Plush Toy Cute Holding Bamboo Panda Doll Home Pillow",
  //     title: "Panda Toy 1",
  //   },
  //   {
  //     image: "/images/item2.jpg",
  //     description:
  //       "Bamboo Tube Panda Doll Plush Toy Cute Hiding In Bamboo Tree",
  //     title: "Panda Toy 2",
  //   },
  //   {
  //     image: "/images/item3.jpg",
  //     description:
  //       "Bear Panda Bubu and Dudu Fashion Cartoon Nightlight LED Night Cute Light Lamp",
  //     title: "Panda Toy 3",
  //   },
  // ];
  
  const [productList, serProductList] = useState([]);
  
  ///immediate invoke function
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
        {productList.map((product, index) => (
          <Products
            key={product.id}
            image={product.images}
            description={product.description}
            title={product.title}
            price={product.price}   
            brand={product.brand}
          />
        ))}
      </div>
  );
}
