export const checkSubscriptionStatus = async (stripeSubscriptionId: string) => {
    try {
      const response = await fetch(`/api/subscription-status?subscriptionId=${stripeSubscriptionId}`)
      const subscriptionData = await response.json()
  
      if (subscriptionData.active) {
        return { active: true }
      } else {
        return { active: false }
      }
    } catch (error) {
      console.error('Error retrieving subscription status:', error)
      return { active: false }
    }
  }
  