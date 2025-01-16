import {stripe} from "../../lib/stripe"
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { name, price } = await req.json()

    if (!name || !price) {
      return NextResponse.json({ error: 'Name and price are required' }, { status: 400 })
    }

    const product = await stripe.products.create({ name })
    const priceData = await stripe.prices.create({
      unit_amount: price * 100,
      currency: 'usd',
      product: product.id,
    })

    return NextResponse.json({ productId: product.id }, { status: 200 })
  } catch (error) {
    console.error('Error creating Stripe product:', error)
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    } else {
      return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 })
    }
  }
}
