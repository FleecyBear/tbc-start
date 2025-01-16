'use client';
import { useState, useEffect } from 'react';
import { createClient } from '../../../utils/supabase/client';
import { createCheckoutSession } from '../../../actions/stripe';
interface Art {
  timestampz: string;
  art_name: string;
  creator: string;
  price: number;
  art: string[][];
  stripe_id: string | null; 
}

const ArtsPage = () => {
  const [arts, setArts] = useState<Art[]>([]);
  const supabase = createClient();

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
      <div className="flex flex-wrap" style={{ width: `${artArray[0].length * 30}px` }}>
        {artArray.map((row, rowIndex) =>
          row.map((color, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="w-[30px] h-[30px]"
              style={{ backgroundColor: color }}
            ></div>
          ))
        )}
      </div>
    );
  };

  const handleBuyClick = async (stripeId: string | null) => {
    if (!stripeId) {
      console.log('No Stripe ID found for this art.');
      return; 
    }

    try {
      const { url } = await createCheckoutSession(stripeId, 1);

      if (url) {
    
        window.location.href = url;
      } else {
        console.error('Failed to create checkout session');
      }
    } catch (error) {
      console.error('Error during checkout session creation:', error);
    }
  };

  return (
    <div className="section-1">
      <h1 className="h2-1">Arts Page</h1>
      <div className="space-y-8">
        {arts.map((art, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-lg text-center dark:bg-gray-800 dark:text-gray-300"
          >
            <h2 className="h2-1">{art.art_name}</h2>
            <p className="p-1">Creator: {art.creator}</p>
            <p className="text-green-500 font-semibold dark:text-green-400 mb-4">${art.price}</p>
            <div className="flex flex-col items-center">
              <div className="border-2 border-gray-700 mb-4 inline-block dark:border-gray-400">
                {renderArtGrid(art.art)}
              </div>
              <button
                className="w-96 btn-2"
                onClick={() => handleBuyClick(art.stripe_id)} 
              >
                Buy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtsPage;
