// app/api/subscription-status/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '../../lib/stripe' // Adjust the path to your Stripe client

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const subscriptionId = searchParams.get('subscriptionId')

  if (!subscriptionId) {
    return NextResponse.json({ error: 'Subscription ID is required.' }, { status: 400 })
  }

  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)

    if (subscription.status === 'active') {
      return NextResponse.json({ active: true })
    } else {
      return NextResponse.json({ active: false })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Error retrieving subscription status.' }, { status: 500 })
  }
}
