import '../detailPage.css';

export default async function ProductPage({ params }) {
  const { id } = params;
  
  const fetchProductData = async () => {
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    
    if (!res.ok) {
      throw new Error("Product not found");
    }
    
    return res.json();
  };

  let productData;
  try {
    productData = await fetchProductData();
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return <p>Product not found.</p>;
  }

  return (
    <div className="product-container">
      <img className="product-image" src={productData.images[0]} alt={productData.title} />

      <div className="product-info">
        <h1>{productData.title}</h1>
        <p className="product-price">${productData.price}</p>

        <section className="product-description">
          <h3>About the product</h3>
          <p>{productData.description}</p>
        </section>

        <section className="product-details">
          <h3>Product Details</h3>
          <ul>
            {productData.warrantyInformation && (
              <li><strong>Warranty:</strong> {productData.warrantyInformation}</li>
            )}
            {productData.dimensions && (
              <li>
                <strong>Dimensions:</strong> {productData.dimensions.width} / {productData.dimensions.height} / {productData.dimensions.depth} (w/h/d)
              </li>
            )}
            <li><strong>Rating:</strong> {productData.rating} / 5</li>
            <li><strong>Stock:</strong> {productData.stock}</li>
          </ul>
        </section>

        <section className="product-actions">
          <label htmlFor="quantity">Quantity:</label>
          <select id="quantity">
            {Array.from({ length: productData.stock }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>

          <button className="button" id="addToCart">
            Add to Cart
          </button>

          <button className="button wishlist" id="addToWishList">
            &hearts; Add to Wishlist
          </button>

          <button className="button checkout" id="checkOut">
            Checkout
          </button>
        </section>
      </div>
    </div>
  );
}
