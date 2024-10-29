"use client";
import Image from "next/image";
import "./home.css";

export default function Main() {
  return (
    <main className="home_main">
      <p className="Main_Text_First">
        Shop Your Favorite Items, All with a Panda Twist!
      </p>
      <div className="Main_Images">
        <Image
          src="/images/panda2.png"
          alt="Panda 2"
          width={300}
          height={300}
          className="panda-image"
        />
        <Image
          src="/images/panda1.png"
          alt="Panda 1"
          width={300}
          height={300}
          className="panda-image"
        />
        <Image
          src="/images/panda3.png"
          alt="Panda 3"
          width={300}
          height={300}
          className="panda-image"
        />
      </div>
      <p className="Main_Text_Last">
        Everything You Need, Wrapped in Panda Love!
      </p>
    </main>
  );
}
