import { Offcanvas, Stack, Button } from "react-bootstrap";
import { useShoppingCartContext } from "../Context/ShoppingCartContext";
import { CartItem } from "./CartItem";
import { formatCurrency } from "../utilities/formatCurrency";
import axios from "axios";
import { useEffect, useState } from "react";
import { ITicket } from "../DTOs/TicketsDTO";
import { baseUrl } from "../constants/url.constants";
import styled from "styled-components";
import PaymentButton from "./PaymentButton";

const StyledButton = styled(Button)`
  color: var(--butter);
  font-weight: bold;
  background: var(--light-purple);
  border: 0px;
  transition: background 0.3s ease;

  &:hover {
    background: var(--mint);
    cursor: pointer;
    color: var(--light-purple);
  }
`;

type ShoppingCartProps = {
  isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCartContext();
  const [storeItems, setStoreItems] = useState<ITicket[]>([]);
  useEffect(() => {
    async function fetchItem() {
      try {
        const response = await axios.get<ITicket[]>(baseUrl);
        const items: ITicket[] = response.data;

        setStoreItems(items);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    }

    fetchItem();
  }, []);

  const calculateTotalPriceInDollars = () => {
    const totalInDollars = cartItems.reduce((total, cartItem) => {
      const item = storeItems.find((i) => i.id === cartItem.id);
      return total + (item?.price || 0) * cartItem.quantity;
    }, 0);

    return totalInDollars.toFixed(2);
  };
  const totalPriceInUSD = parseFloat(calculateTotalPriceInDollars());

  return (
    <Offcanvas
      show={isOpen}
      onHide={closeCart}
      placement="end"
      style={{ background: "var(--butter)" }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title
          style={{
            fontSize: "2.0rem",
            fontWeight: "bold",
            textAlign: "center",
            color: "var(--light-purple)",
            margin: "1rem",
            textShadow: "0 2px 2px rgba(0, 0, 0, 0.6)",
          }}
        >
          Кошница
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body style={{ background: "var(--butter)" }}>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Общо {formatCurrency(totalPriceInUSD)}
          </div>
          <div style={{ padding: "1em" }}>
            <PaymentButton totalPrice={Number(totalPriceInUSD)} />
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
