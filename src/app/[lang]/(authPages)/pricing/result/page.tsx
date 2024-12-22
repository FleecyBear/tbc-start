import type { Stripe } from "stripe";
import { stripe } from "../../../../lib/stripe";

export default async function ResultPage({
  searchParams,
}: {
  searchParams: { session_id: string };
}): Promise<JSX.Element> {
  if (!searchParams.session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.retrieve(searchParams.session_id, {
      expand: ["line_items", "payment_intent"],
    });

  const paymentIntent = checkoutSession.payment_intent as Stripe.PaymentIntent;

  const currency = checkoutSession.currency ?? "usd";  


  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="h2-1">Thank you for your purchase! Your payment was successful</h2>
      <div className=" p-1  mt-6 text-center">
        <p>
          <strong>Session ID:</strong> {checkoutSession.id}
        </p>
        <p>
          <strong>Amount:</strong> ${(checkoutSession.amount_total ?? 0) / 100} {currency.toUpperCase()}
        </p>
        <p>
          <strong>Payment Status:</strong> {paymentIntent.status}
        </p>
      </div>
      <div className="mt-6 text-center">
        <h3 className="font-semibold text-xl p-1 ">Thank you for using our services!</h3>
      </div>
    </div>
  );
}
