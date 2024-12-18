"use client";

import type Stripe from "stripe";
import React, { useState } from "react";
import { formatAmountForDisplay } from "../utils/stripe-helpers";
import * as config from "../config";
import { createCheckoutSession } from "../actions/stripe";
import getStripe from "../utils/get-stripe";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";

interface CheckoutFormProps {
  uiMode: Stripe.Checkout.SessionCreateParams.UiMode;
}

export default function CheckoutForm(props: CheckoutFormProps): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedAmount, setSelectedAmount] = useState<number>(5);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const handleAmountClick = (amount: number) => {
    setSelectedAmount(amount);
  };

  const formAction = async (data: FormData): Promise<void> => {
    const uiMode = data.get("uiMode") as Stripe.Checkout.SessionCreateParams.UiMode;
    const { client_secret, url } = await createCheckoutSession(data);

    if (uiMode === "embedded") return setClientSecret(client_secret);

    window.location.assign(url as string);
  };

  return (
    <>
      <form action={formAction} className="flex flex-col items-center space-y-6">
        <input type="hidden" name="uiMode" value={props.uiMode} />
        <input type="hidden" name="customDonation" value={selectedAmount} />

        <div className="flex space-x-6">
          <div
            className={`p-6 border-2 rounded-lg text-center cursor-pointer transition-all duration-300 ease-in-out ${
              selectedAmount === 5 ? "border-blue-500 bg-blue-100" : "border-gray-300 bg-white"
            }`}
            onClick={() => handleAmountClick(5)}
          >
            <p className="text-2xl font-bold">$5/month</p>
            <p className="text-sm text-gray-600">Basic Plan</p>
            <p className="text-sm text-gray-600">Includes 5 blog posts per month</p>
            <button
              type="button"
              className={`mt-2 px-4 py-2 rounded-full transition-all duration-300 ease-in-out ${
                selectedAmount === 5 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-blue-300"
              }`}
            >
              Select
            </button>
          </div>
          <div
            className={`p-6 border-2 rounded-lg text-center cursor-pointer transition-all duration-300 ease-in-out ${
              selectedAmount === 15 ? "border-blue-500 bg-blue-100" : "border-gray-300 bg-white"
            }`}
            onClick={() => handleAmountClick(15)}
          >
            <p className="text-2xl font-bold">$10/month</p>
            <p className="text-sm text-gray-600">Pro Plan</p>
            <p className="text-sm text-gray-600">Includes 15 blog posts per month</p>
            <button
              type="button"
              className={`mt-2 px-4 py-2 rounded-full transition-all duration-300 ease-in-out ${
                selectedAmount === 15 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-blue-300"
              }`}
            >
              Select
            </button>
          </div>
          <div
            className={`p-6 border-2 rounded-lg text-center cursor-pointer transition-all duration-300 ease-in-out ${
              selectedAmount === 25 ? "border-blue-500 bg-blue-100" : "border-gray-300 bg-white"
            }`}
            onClick={() => handleAmountClick(25)}
          >
            <p className="text-2xl font-bold">$20/month</p>
            <p className="text-sm text-gray-600">Premium Plan</p>
            <p className="text-sm text-gray-600">Includes 30 blog posts per month</p>
            <button
              type="button"
              className={`mt-2 px-4 py-2 rounded-full transition-all duration-300 ease-in-out ${
                selectedAmount === 25 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-blue-300"
              }`}
            >
              Select
            </button>
          </div>
        </div>

        <button
          className="px-6 py-2 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700"
          type="submit"
          disabled={loading}
        >
          Proceed to Checkout - {formatAmountForDisplay(selectedAmount, config.CURRENCY)}
        </button>
      </form>
      {clientSecret ? (
        <EmbeddedCheckoutProvider
          stripe={getStripe()}
          options={{ clientSecret }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      ) : null}
    </>
  );
}
