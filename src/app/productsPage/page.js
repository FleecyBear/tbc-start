import "./productsPage.css";
import Products from '../products/page.jsx'
async function getAllProduct() {
    debugger
    console.log("getAllProduct")
    const result = await fetch('https://dummyjson.com/products')
    const data = await result.json();  
    console.log("getAllProduct")
    console.log(data.products)
    return data.products;
}

export default async function ProductsPage() {
  var productList = await getAllProduct();
  console.log(productList);
  console.log("ProductsPage")
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
