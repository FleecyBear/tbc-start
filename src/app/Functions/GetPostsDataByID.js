async function GetPostByID(id) {
    try {
        console.log(`Fetching data from /api/posts/${id}`); 
        const response = await fetch(`/api/posts/${id}`); 

        if (!response.ok) {
            console.error(`Error fetching post: ${response.statusText}`); 
            throw new Error("Network response was not ok");
        }

        const data = await response.json(); 
        console.log('Data fetched successfully:', data); 
        return data; 
    } catch (error) {
        console.error("Failed to fetch post:", error); 
        return null; 
    }
}
