import React, { useState } from "react";
import styled from "styled-components";
import PaymentPopup from "./PaymentPopup";

const PayButton = styled.button`
  color: var(--butter);
  font-weight: bold;
  background: var(--light-purple);
  border: 0px;
  transition: background 0.3s ease;
  padding: 0.5rem;
  border-radius: 0.3rem;

  &:hover {
    background: var(--mint);
    cursor: pointer;
    color: var(--light-purple);
  }
`;

interface PaymentButtonProps {
  totalPrice: number;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({ totalPrice }) => {
  const [popupVisible, setPopupVisible] = useState(false);

  const openPopup = () => {
    setPopupVisible(true);
  };

  return (
    <div>
      <PayButton onClick={openPopup}>Плати</PayButton>
      {popupVisible && (
        <PaymentPopup
          totalPrice={totalPrice}
          onClose={() => setPopupVisible(false)}
        />
      )}
    </div>
  );
};

export default PaymentButton;
