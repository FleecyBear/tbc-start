export  async function generateStaticParams() {
    const res = await fetch(`https://dummyjson.com/products`)
    const data =await res.json();
    // eslint-disable-next-line array-callback-return
    return data.products.map((element)=>({
        id:element.id.toString(),
    }))
}

async function GetProduct(id){
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    const data =await res.json();
    console.log(data)
    return data;
}

async function CreateDetailProductPage({params, searchParams}){
    debugger
    const product = await GetProduct(params.id)
    return(
        <div>
            {params.id}
        </div>
    )
}
export default CreateDetailProductPage;