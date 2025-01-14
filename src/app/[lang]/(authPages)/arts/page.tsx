'use client'
import { useEffect, useState } from 'react';

import { createClient } from '../../../utils/supabase/client'


interface Art {
  timestampz: string;
  art_name: string;
  creator: string;
  price: number;
  art: string[][]; 
}

const ArtsPage = () => {
  const [arts, setArts] = useState<Art[]>([]);
  const supabase = createClient()


  useEffect(() => {
    const fetchArts = async () => {
      const { data, error } = await supabase.from('arts').select('*');
      if (data) {
        setArts(data);
      } else {
        console.error(error);
      }
    };

    fetchArts();
  }, []);

  const renderArtGrid = (artArray: string[][]) => {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', width: `${artArray[0].length * 30}px` }}>
        {artArray.map((row, rowIndex) =>
          row.map((color, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              style={{
                width: '30px',
                height: '30px',
                backgroundColor: color,
                boxSizing: 'border-box', 
              }}
            ></div>
          ))
        )}
      </div>
    );
  };

  return (
    <div>
      <h1>Arts Page</h1>
      {arts.map((art, index) => (
        <div key={index} style={{ marginBottom: '30px' }}>
          <h2>{art.art_name}</h2>
          <p>Creator: {art.creator}</p>
          <p>Price: ${art.price}</p>
          <div>{renderArtGrid(art.art)}</div>
        </div>
      ))}
    </div>
  );
};

export default ArtsPage;
