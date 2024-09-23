import React from 'react';
import './Main.css';
import panda1 from './panda1.png';
import panda2 from './panda2.png';
import panda3 from './panda3.png';

export default function Main() {
  return (
    <main className='Main'>
      <p className = "Main_Text_First">Buy panda of  your choice!</p>
      <div className="Main_Images">
        <img src={panda2} alt="Panda 2" />
        <img src={panda1} alt="Panda 1" />
        <img src={panda3} alt="Panda 3" />
      </div>
      <p className = "Main_Text_Last">Custom-made pandas from Japan</p>
    </main>
  );
}
