import React from 'react'
import './Assignment3.css'

const obj = {

  id: '10002',

  name: 'Eco-Friendly Water Bottle',

  description: 'Stay hydrated with our durable, eco-friendly water bottle.',

  price: 14.99,

  currency: 'USD',

  imageURL: 'https://example.com/images/product-10002.jpg',

};

export default function Assignment3() {
  const entries = Object.entries(obj).reduce((acc, [key, value], index) => {
    acc.push({ key, value, position: index });
    return acc;
  }, []);

  return (
    <div className = "Assignment-3-Main">
      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((item) => (
            <tr key={item.position}>
              <td>{item.key}</td>
              <td>{item.value}</td>
              <td>{item.position}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
