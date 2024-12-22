"use server";

import type { Stripe } from "stripe";
import { headers } from "next/headers";
import { CURRENCY } from "../config";
import { formatAmountForStripe } from "../utils/stripe-helpers";
import { stripe } from "../lib/stripe";

async function getCookie(name: string): Promise<string | undefined> {
  const cookie = await headers(); 
  const cookieHeader = cookie.get("cookie");
  if (cookieHeader) {
    const match = cookieHeader.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? match[2] : undefined;
  }
  return undefined;
}

export async function createCheckoutSession(
  data: FormData,
): Promise<{ client_secret: string | null; url: string | null }> {
  try {
    const ui_mode = data.get("uiMode") as Stripe.Checkout.SessionCreateParams.UiMode;

    const lang = (await getCookie("lang")) || "en"; 

    const origin: string = (await headers()).get("origin") as string;

    const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create({
      mode: "payment",
      submit_type: "donate",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: CURRENCY,
            product_data: {
              name: "Custom amount donation",
            },
            unit_amount: formatAmountForStripe(
              Number(data.get("customDonation") as string),
              CURRENCY,
            ),
          },
        },
      ],
      ...(ui_mode === "hosted" && {
        success_url: `${origin}/${lang}/pricing/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/${lang}/pricing`,
      }),
      ...(ui_mode === "embedded" && {
        return_url: `${origin}/${lang}/pricing/result?session_id={CHECKOUT_SESSION_ID}`,
      }),
      ui_mode,
    });

    return {
      client_secret: checkoutSession.client_secret,
      url: checkoutSession.url,
    };
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return {
      client_secret: null,
      url: null,
    };
  }
}

export async function createPaymentIntent(
  data: FormData,
): Promise<{ client_secret: string }> {
  try {
    const paymentIntent: Stripe.PaymentIntent = await stripe.paymentIntents.create({
      amount: formatAmountForStripe(
        Number(data.get("customDonation") as string),
        CURRENCY,
      ),
      automatic_payment_methods: { enabled: true },
      currency: CURRENCY,
    });

    return { client_secret: paymentIntent.client_secret as string };
  } catch (error) {
    console.error("Error creating payment intent:", error);
    throw new Error("Unable to create payment intent.");
  }
}
