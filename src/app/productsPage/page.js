import "./productsPage.css";
import Products from '../products/page.jsx'
async function getAllProduct() {
    const result = await fetch('https://dummyjson.com/products')
    const data = await result.json();  
    return data.products;
}

export default async function ProductsPage() {
  const productList = await getAllProduct();
  return (
      <div className="Product_List">    
        {
          productList.length > 0 &&
          (          
            productList.map((product)=>{
            console.log(product.id)
              return(
                <Products
                id={product.id}
                image={product.images}
                description={product.description}
                title={product.title}
                price={product.price}   
                brand={product.brand}
              />
            );
          })
        )
        }
      </div>
  );
}
