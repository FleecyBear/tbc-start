import type { Stripe } from "stripe";
import { stripe } from "../../../lib/stripe";

export default async function ResultPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}): Promise<JSX.Element> {
  const sessionId = searchParams.session_id;

  if (!sessionId) {
    return (
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-xl font-semibold text-red-500">
          Missing session ID
        </h2>
        <p>
          Oops! It seems like the session ID is missing. Please try again or
          contact support if the issue persists.
        </p>
      </div>
    );
  }

  try {
    const checkoutSession: Stripe.Checkout.Session =
      await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["line_items"],
      });

    const amountTotal = (checkoutSession.amount_total ?? 0) / 100;
    const currency = checkoutSession.currency?.toUpperCase() ?? "USD";

    return (
      <div className="container mx-auto px-4 py-6">
        <h2 className="h2-1">
          Thank you for your purchase!
        </h2>
        <p className="p-1 mt-4">
          Your payment was successful. Below are the details of your
          transaction.
        </p>

        <div className="section-1">
          <p className="p-1">
            <strong>Session ID:</strong> {checkoutSession.id}
          </p>
          <p className="p-1">
            <strong>Amount:</strong> ${amountTotal} {currency}
          </p>
        </div>

        <div className="mt-8 text-center">
          <h3 className="p-1 text-xl font-medium">
            Thank you for using our services!
          </h3>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error retrieving checkout session:", error);

    return (
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-xl font-semibold text-red-500">
          Something went wrong
        </h2>
        <p>
          We couldn't retrieve your session details. Please check your session
          ID or try again later.
        </p>
      </div>
    );
  }
}
