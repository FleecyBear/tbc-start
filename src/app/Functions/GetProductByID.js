async function GetProductByID(id) {
    try {
      console.log(`Fetching data from /api/products/${id}`); 
      const response = await fetch(`/api/products/${id}`);
  
      if (!response.ok) {
        console.error(`Error fetching product: ${response.statusText}`); 
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      console.log('Data fetched successfully:', data); 
      return data; 
    } catch (error) {
      console.error("Failed to fetch product:", error);
      return null;
    }
  }
  