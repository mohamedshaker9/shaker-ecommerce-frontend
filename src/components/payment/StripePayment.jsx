import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';


function StripePayment({totalAmount}) {  
    const stripePromise = loadStripe(import.meta.env.VITE_PUBLIC_STRIPE_API_KEY);
    
     const options = {
         layout: {
            type: 'tabs',
            defaultCollapsed: false,
         },
        mode: 'payment',
        amount: totalAmount * 100,
        currency: 'usd',
        // Fully customizable with appearance API.
        appearance: {/*...*/},
       
      business: { name: "Shaker_ecommerce" }
    };

  return (
    <Elements stripe={stripePromise} options={options}>
      <PaymentForm totalAmount={totalAmount}/>
    </Elements>
  );
};
export default StripePayment;