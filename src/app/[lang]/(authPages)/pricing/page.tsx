"use client";

import React, { useState } from "react";
import { createCheckoutSession } from "../../../actions/stripe";
export default function TestPage() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const productId = ""; // Replace with your Stripe product/price ID
      const result = await createCheckoutSession(productId);

      if (result.url) {
        window.location.href = result.url; 
      } else {
        console.error("Failed to create checkout session:", result);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Test Page</h1>
      <button onClick={handleCheckout} disabled={loading}>
        {loading ? "Redirecting..." : "Checkout"}
      </button>
    </div>
  );
}
