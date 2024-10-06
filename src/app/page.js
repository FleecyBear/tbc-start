"use client"
import Image from "next/image";
import Products from "./products/page";
import "./home.css";
import { useEffect, useState } from "react";

export default function Main() {
  return (
    <main className="home_main">
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

      </main>
  );
}
