async function GetPostByID(id){
    try {
        const jsonData = await fetch(`https://dummyjson.com/posts/${id}`);
        const data = await jsonData.json();
        return data 

    } catch (error) {
        console.log(error)
    }
}