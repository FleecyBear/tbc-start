"use client"
import Image from "next/image";
import Products from "./products/page";
import "./home.css";
import { useEffect, useState } from "react";

export default function Main() {
  const products = [
    {
      image: "/images/item1.jpg",
      description:
        "Bamboo Tube Panda Doll Plush Toy Cute Holding Bamboo Panda Doll Home Pillow",
      title: "Panda Toy 1",
    },
    {
      image: "/images/item2.jpg",
      description:
        "Bamboo Tube Panda Doll Plush Toy Cute Hiding In Bamboo Tree",
      title: "Panda Toy 2",
    },
    {
      image: "/images/item3.jpg",
      description:
        "Bear Panda Bubu and Dudu Fashion Cartoon Nightlight LED Night Cute Light Lamp",
      title: "Panda Toy 3",
    },
  ];
  
  const [productList, serProductList] = useState();
  
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
    <>
      <p className="Main_Text_First">Buy panda of your choice!</p>
      <div className="Main_Images">
        <Image
          src="/images/panda2.png"
          alt="Panda 2"
          width={300}
          height={300}
        />
        <Image
          src="/images/panda1.png"
          alt="Panda 1"
          width={300}
          height={300}
        />
        <Image
          src="/images/panda3.png"
          alt="Panda 3"
          width={300}
          height={300}
        />
      </div>
      <p className="Main_Text_Last">Custom-made pandas from Japan</p>

      <div className="Product_List">
        {products.map((product, index) => (
          <Products
            key={index}
            image={product.image}
            description={product.description}
            title={product.title}
          />
        ))}
      </div>
    </>
  );
}
