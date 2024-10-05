import Products from './products/page';
import './home.css';
import panda1 from './images/panda1.png'; 
import panda2 from './images/panda2.png'; 
import panda3 from './images/panda3.png'; 
import item1 from './images/item1.jpg'
import item2 from './images/item2.jpg'
import item3 from './images/item3.jpg'

export default function Main() {
  const products = [
    { image: item1, 
      description: 'Bamboo Tube Panda Doll Plush Toy Cute Holding Bamboo Panda Doll Home Pillow',
      title: 'Panda Toy 1'
    },
    { image: item2, 
      description: 'Bamboo Tube Panda Doll Plush Toy Cute Hiding In Bamboo Tree',
      title: 'Panda Toy 2'
    },

    { image: item3, 
      description: 'Bear Panda Bubu and Dudu Fashion Cartoon Nightlight LED Night Cute Light Lamp', 
       title: 'Panda Toy 3'
    }

  ];

  return (
    <main className='Main'>
      <p className="Main_Text_First">Buy panda of your choice!</p>
      <div className="Main_Images">
        <img src={panda2} alt="Panda 1" />
        <img src={panda1} alt="Panda 2" />
        <img src={panda3} alt="Panda 3" />
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
    </main>
  );
}

