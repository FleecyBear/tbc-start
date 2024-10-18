import './productsPage.css';
import Products from './products/page.jsx';
import ProductControls from './productControls.jsx';

async function getCategories() {
  try {
    const res = await fetch('https://dummyjson.com/products/categories');
    if (!res.ok) throw new Error('Failed to fetch categories');
    return await res.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

async function getProducts(category = "", search = "", sort = "title", order = "asc") {
  try {
    let url;
    
    if (category) {
      url = `https://dummyjson.com/products/category/${category}?sortBy=${sort}&order=${order}`;
    } else { 
      url = `https://dummyjson.com/products/search?q=${search}&sortBy=${sort}&order=${order}`;
    }

    console.log("Fetching products from URL:", url);
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch products');

    let products = await res.json();
    products = products.products || [];

    if (search) {
      products = products.filter(product =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    return products; 
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function ProductsPage({ searchParams }) {
  const { category = "", sortBy = "title", order = "asc", search = "" } = searchParams;

  const categories = await getCategories();
  const filteredProducts = await getProducts(category, search, sortBy, order);

  const noResults = filteredProducts.length === 0;

  return (
    <div className="products-main-container">
      <ProductControls 
        categories={categories}
        selectedCategory={category}
        sortBy={sortBy}
        order={order}
        search={search}
      />

      {noResults && <p>No results found</p>}

      <div className="Product_List">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Products
              key={product.id}
              id={product.id}
              image={product.images}
              description={product.description}
              title={product.title}
              price={product.price}
              brand={product.brand}
            />
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
}
