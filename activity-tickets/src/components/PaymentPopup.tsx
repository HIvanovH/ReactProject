import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import axios from "axios";
import { useShoppingCartContext } from "../Context/ShoppingCartContext";
import detectEthereumProvider from "@metamask/detect-provider";
import PaymentForm from "./PaymentForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const PopupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 30%;
  left: 30%;
  width: 30%;
  height: 30%;
  background-color: var(--mint);
`;

const PopupContent = styled.div`
  background-color: var(--butter);
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

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

type CartItem = {
  id: number;
  quantity: number;
  price: number;
};

interface PaymentPopupProps {
  onClose: () => void;
  totalPrice: number;
}

const PaymentPopup: React.FC<PaymentPopupProps> = ({ onClose, totalPrice }) => {
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;
  const { clearCart } = useShoppingCartContext();
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const stripePromise = loadStripe(
    "pk_test_51NmMkNA82S8GS4aYL72AhSvrx1SW1kioTpgW65QMMHh0U5THYJmr9gbiczSnUaoIP0Mab76TCvCyUtwVktUJBuZe00yVobWbOo"
  );
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [wallet, setWallet] = useState<{ accounts: string[] }>({
    accounts: [],
  });

  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });
      if (provider) {
        const accounts = await (window as any).ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setWallet({ accounts });
        }
      }
    };

    getProvider();
  }, []);

  const handleCryptoClick = async () => {
    try {
      const accounts = await (window as any).ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length === 0) {
        console.error("No connected wallet accounts.");
        return;
      }

      const sum = totalPrice / 1.955;
      const etherExchangeRate = await fetchEtherToEuroExchangeRate();
      const etherAmount = sum / etherExchangeRate;

      const senderAddress = accounts[0];
      const recipientAddress = "0xbFC96E9308CF2b25aa3564B4DCc65Bf1b5be4957";
      const transaction = {
        from: senderAddress,
        to: recipientAddress,
        value: Number(etherAmount * 1e18).toString(16),
      };

      const result = await (window as any).ethereum.request({
        method: "eth_sendTransaction",
        params: [transaction],
      });

      fetchItems();
      localStorage.removeItem("cartItems");
      clearCart();
      onClose();
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  };

  const handleBankCardClick = () => {
    setShowPaymentForm(true);
  };

  const handlePaymentSuccess = () => {
    fetchItems();
    localStorage.removeItem("cartItems");
    clearCart();
    onClose();
  };

  const fetchItems = async () => {
    const tokenData: any = token.result;

    try {
      const response = await axios.post(
        "http://localhost:5104/api/BoughtTickets/complete",
        {
          tokenData: tokenData,
          cartItems: cartItems,
        }
      );

      if (response.status === 200) {
        console.log("Purchase completed successfully.");
      } else {
        console.log("Purchase failed.");
      }
    } catch (error) {
      const err = error as Error;

      if (axios.isAxiosError(err)) {
        if (err.response && err.response.status === 400) {
          console.error("Not enough tickets available.");
          alert("Няма достатъчно налични билети");
        } else {
          console.error("An error occurred:", err.message);
          alert("Възникна грешка при плащането");
        }
      } else {
        console.error("An unexpected error occurred:", err.message);
        alert("Възникна неочаквана греща при плащането.");
      }
    }
  };

  const fetchEtherToEuroExchangeRate = async () => {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=eur"
    );
    const data = await response.json();
    return data.ethereum.eur;
  };

  return (
    <PopupContainer>
      <PopupContent>
        <h2 style={{ color: "var(--light-purple)" }}>
          Изберете начин на плащане
        </h2>
        {token ? (
          <>
            <PaymentButton onClick={handleBankCardClick}>
              Банкова карта
            </PaymentButton>

            <PaymentButton onClick={handleCryptoClick}>
              Плащане с криптовалута
            </PaymentButton>
            {showPaymentForm && (
              <Elements stripe={stripePromise}>
                <PaymentForm
                  amount={totalPrice}
                  onPaymentSuccess={handlePaymentSuccess}
                />
              </Elements>
            )}
          </>
        ) : (
          <p>Моля влезте в профила си, за да можете да заплатите.</p>
        )}
      </PopupContent>
    </PopupContainer>
  );
};

export default PaymentPopup;
