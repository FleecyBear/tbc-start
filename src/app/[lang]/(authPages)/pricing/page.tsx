
import CheckoutForm from "../../../components/CheckoutForm";



export default function DonatePage(): JSX.Element {
  return (
    <div className="flex items-center justify-center">
      <CheckoutForm uiMode="hosted" />
    </div>
  );
}