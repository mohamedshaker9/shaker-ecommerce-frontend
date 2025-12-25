import React, {useState} from 'react';
import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import api from '../../api.js';

const PaymentForm = ({totalAmount}) => {
   const stripe = useStripe();
   const elements = useElements();

  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);

  const handleError = (error) => {
    setLoading(false);
    setErrorMessage(error.message);
  }

  const handleSubmit = async (event) => {

    event.preventDefault();

    if (!stripe) {
      return;
    }

    setLoading(true);

    
    const {error: submitError} = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }

    const paymentDto = {
        "amount": Number(totalAmount).toFixed(2),
        "currency": "usd"
    };
    // TODO get the total amount from backend, doesn't need to send from here 
    const res = await api.post("/payment/create-intent", paymentDto,
                    {headers: {
                        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userToken')).token}`,
                    }}
        
    );
    console.log("Payment Intent Response:", res);
    const clientSecret = await res.data.client_secret;
    console.log("Client Secret:", clientSecret);
    const {error} = await stripe.confirmPayment({
      elements: elements,
      clientSecret: clientSecret,
      confirmParams: {
        return_url: 'http://localhost:5173/payment-confirm',
      },
    });

    if (error) {
      // This point is only reached if there's an immediate error when
      // confirming the payment. Show the error to your customer (for example, payment details incomplete)
      handleError(error);
    } else {
      // Your customer is redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer is redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex flex-row items-center justify-self-center mt-2" 
         type="submit" disabled={!stripe || loading}>
        Pay
      </button>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
}   

export default PaymentForm;