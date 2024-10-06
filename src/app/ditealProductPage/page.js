
import GetProductById from '../Functions/GetProductByID'

function CreateDetailProductPage(key){
    debugger
    async function GetProductByID(id){
        try {
           
            const jsonData = await fetch(`https://dummyjson.com/products/${id}`);
            const data = await jsonData.json();
            console.log(data)  
        } catch (error) {
            console.log(error)
        }
    }
    const productData = GetProductByID(key)
    return(
        <div>
            Test Ditel page
        </div>
    )
}
export default CreateDetailProductPage;