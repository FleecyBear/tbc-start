
import '../ditealPage.css'
import '../../global.css'
// async function GetProductByID(id) {
//     try {
//         console.log(`Fetching data from https://dummyjson.com/products/${id}`);
//         const response = await fetch(`https://dummyjson.com/products/${id}`);
//         console.log("Response Status:", response.status); 

//         if (!response.ok) {
//             console.error(`Error fetching product: ${response.statusText}`);
//             throw new Error("Network response was not ok");
//         }

//         const data = await response.json();
//         console.log('Data fetched successfully:', data);
//         return data;
//     } catch (error) {
//         console.error("Failed to fetch product:", error);
//         return null;
//     }
// }

// export default function DetailProductPage() {
//     const { id } = useParams(); 
//     const searchParams = useSearchParams(); 
//     const [productData, setProductData] = useState(null);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         console.log("Search Params:", searchParams.toString()); 
//         console.log("Product ID from params:", id); 

       
//         if (id) {
//             const fetchData = async () => {
//                 console.log(`Fetching product with ID: ${id}`);
//                 const data = await GetProductByID(id);
//                 console.log("Fetched Data:", data);

//                 if (data) {
//                     setProductData(data);
//                 } else {
//                     setError('Product not found');
//                 }
//                 setLoading(false); 
//             };

//             fetchData();
//         } else {
//             console.error('No product ID provided');
//             setError('No product ID provided');
//             setLoading(false); 
//         }
//     }, [id]); 

//     if (loading) return <p>Loading...</p>; 
//     if (error) return <p>{error}</p>; 
    export async function generateStaticParams() {
        const res = await fetch('https://dummyjson.com/products/category/sports-accessoriess')
        const data = await res.json();    
        return data.products.map((product)=>({
            id:product.id.toString()
        }))
    }
    async function GetProduct(id) {
        const res  = await fetch(`https://dummyjson.com/products/${id}`);
        const data =await res.json();
        return data
    }

    export default async function ProductPage({params}) {
        debugger
        const productData = await GetProduct(params.id)
        console.log(productData)
        return (
            <div>
                {productData ? (
                    <div className='ditealProduct-Conteiner'>
                        <div>
                            <img src={productData.images[0]} alt={productData.title} />
                        </div>
                        <div className='product-Info-Conteiner'>
                            <div className='prduct-Title'>
                                <h3>{productData.title}</h3>
                                <h3>{productData.price}$</h3>
                            </div>
                            <div>
                                <h5>About product:</h5>
                                <p>{productData.description}</p>
                            </div>
                            <div className='product-Details'>
                                <h5>Product details</h5>
                                <div>
                                    <div className='details-div'>
                                        <h4>WarrantyInformation</h4>
                                        <p>{productData.warrantyInformation}</p>
                                    </div>
                                    <div className='details-div'>
                                        <h4>Dimensions</h4>
                                        <p>{productData.dimensions.width}/{productData.dimensions.height}/{productData.dimensions.depth}(w/h/d)</p>
                                    </div>
                                    <div className='details-div'>
                                        <h4>Rating</h4>
                                        <p>{productData.rating} / 5</p>
                                    </div>
                                    <div className='details-div'>
                                        <h4>Stock</h4>
                                        <p>{productData.stock}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='button-Div'>
                                <div className='amount-Div'>
                                    <span>Quantity:</span>
                                    <select id="Quantity">
                                        {Array.from({ length: productData.stock }, (_, i) => (
                                            <option key={i + 1} value={i + 1}>
                                                {i + 1}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <button id="addTocard" className='button' type="submit">
                                        Add to cart
                                    </button>
                                </div>
                                <div>
                                <button id="addWishList"  className='button' type="submit">
                                    &hearts;
                                    Add To Wish list
                                </button>
                                </div>
                            </div>
                            <div className='button-Div'>
                                     <button id="Check-out"  className='button' type="submit">
                                        &hearts;
                                        Check out
                                    </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>Product not found.</p>
                )}
            </div>
        );
    }


