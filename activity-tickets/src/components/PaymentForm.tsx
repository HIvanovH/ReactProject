import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import styled from "styled-components";

const PaymentButton = styled.button`
  background: var(--light-purple);
  color: var(--butter);
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  transition: background 0.3s ease;
  border-radius: 0.3rem;
  margin-right: 10px;

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    background: var(--mint);
    color: var(--light-purple);
  }
`;

const PaymentForm: React.FC<{
  onPaymentSuccess: () => void;
  amount: number;
}> = ({ onPaymentSuccess, amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    const fetchClientSecret = async () => {
      const { data } = await axios.post(
        "http://localhost:5104/api/Stripe/CreatePaymentIntent",
        {
          amount,
        }
      );
      setClientSecret(data.clientSecret);
    };
    if (amount > 0) {
      fetchClientSecret();
    }
  }, [amount]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { paymentIntent, error } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement!,
        },
      }
    );

    if (error) {
      console.log("Payment failed", error);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      await axios.post("http://localhost:5104/api/Stripe/PaymentSuccess", {
        paymentIntentId: paymentIntent.id,
      });

      onPaymentSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginTop: "15px", marginBottom: "15px" }}>
        <CardElement />
      </div>

      <PaymentButton type="submit" disabled={!stripe}>
        Плати
      </PaymentButton>
    </form>
  );
};

export default PaymentForm;
