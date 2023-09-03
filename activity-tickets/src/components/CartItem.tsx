import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Stack } from "react-bootstrap";
import { useShoppingCartContext } from "../Context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { ITicket } from "../DTOs/TicketsDTO";
import { baseUrl } from "../constants/url.constants";
import defaultImg from "../imgs/ticket.avif";
import styled from "styled-components";
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

type CartItemProps = {
  id: number;
  quantity: number;
};

type Item = {
  id: number;
  name: string;
  imagePath?: string;
  price: number;
  quantity: number;
};

export function CartItem({ id, quantity }: CartItemProps) {
  const { removeFromCart } = useShoppingCartContext();
  const [item, setItem] = useState<Item | null>(null);

  useEffect(() => {
    async function fetchItem() {
      try {
        const response = await axios.get<ITicket[]>(baseUrl);
        const items: ITicket[] = response.data;
        const foundItem = items.find((i) => i.id === id);

        if (foundItem) {
          setItem({
            id: foundItem.id,
            name: foundItem.title,
            price: foundItem.price,
            quantity: quantity,
            imagePath: foundItem.imagePath || defaultImg,
          });
        }
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    }

    fetchItem();
  }, [id, quantity]);

  if (!item) return null;

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={item.imagePath}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div
          style={{
            color: "var(--light-purple)",
            fontSize: "1.5rem",
            fontWeight: "bold",
          }}
        >
          {item.name}{" "}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(item.price)}
        </div>
      </div>
      <div> {formatCurrency(item.price * quantity)}</div>
      <StyledButton
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(item.id)}
      >
        &times;
      </StyledButton>
    </Stack>
  );
}
