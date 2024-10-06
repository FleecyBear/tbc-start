async function GetProductByID(id){
    try {
        const jsonData = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await jsonData.json();
        return data 

    } catch (error) {
        console.log(error)
    }
}