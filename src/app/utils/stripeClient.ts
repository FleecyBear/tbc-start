export const createStripeProduct = async (name: string, price: number) => {
    try {
      const response = await fetch('/api/create-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, price }),
      })
  
      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || 'Something went wrong')
      }
  
      const responseData = await response.json() 
      if (!responseData.productId) {
        throw new Error('Product ID not returned')
      }
  
      return responseData.productId 
    } catch (error) {
      console.error('Error in createStripeProduct:', error)
      throw error
    }
}
