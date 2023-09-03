import React, { forwardRef, useImperativeHandle } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

interface PaymentFormProps {
  onClose: () => void;
}

const PaymentForm = forwardRef(({ onClose }: PaymentFormProps, ref) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card", // or 'bank_account'
      card: cardElement!,
    });
    // Handle paymentMethod and error
  };

  useImperativeHandle(ref, () => ({
    submitForm: handleSubmit, // Expose the handleSubmit function
  }));

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
});

export default PaymentForm;
