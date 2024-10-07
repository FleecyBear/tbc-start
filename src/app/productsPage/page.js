import Image from "next/image";
import ProductsDiv from "../products/page.js";
import './productsPage.css'

async function GetProducts() {
  const res = await fetch('https://dummyjson.com/products');
  const data = await res.json();
  return data.products;
}

export default async function Products(params) {
    const products = await GetProducts();
    return (
      <div className="Product_List">      
      {
        products.length > 0 &&(
          products.map((product)=>{
            return(
              <ProductsDiv
              id={product.id}
              image={product.images}
              description={product.description}
              title={product.title}
              price={product.price}   
              brand={product.brand}
              datta={product}
            />
          );
        })
        )
      }
    </div>
    )
}
