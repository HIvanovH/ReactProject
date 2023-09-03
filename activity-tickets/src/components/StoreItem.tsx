import { Card, Button } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";
import { useShoppingCartContext } from "../Context/ShoppingCartContext";
import CustomLink from "./CustomLink";
import defaultImg from "../imgs/ticket.avif";
import styled from "styled-components";
import { useState, useEffect } from "react";

const DetailsText = styled(CustomLink)`
  color: var(--light-purple);
  text-decoration: none;
`;
const Label = styled.span`
  color: var(--light-purple);
  text-decoration: none;
`;
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

type StoreItemProps = {
  id: number;
  title: string;
  price: number;
  imagePath?: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  quantity: number;
};

export function StoreItem({
  id,
  title,
  price,
  quantity,
  imagePath,
}: StoreItemProps) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCartContext();
  const [currentQuantity, setCurrentQuantity] = useState(quantity);
  useEffect(() => {
    setCurrentQuantity(quantity);
  }, [quantity]);
  const quantities = getItemQuantity(id);
  return (
    <Card className="h-100" style={{ boxShadow: "0 0 5px 1px #aaaaaa" }}>
      <Card.Img
        variant="top"
        src={imagePath || defaultImg}
        height="200em"
        style={{ objectFit: "cover", background: "var(--butter)" }}
      />
      <Card.Body
        className="d-flex-column"
        style={{ background: "var(--butter)" }}
      >
        <Card.Title
          className="d-flex justify-content-between alin itrms-baseline mb-4"
          style={{
            color: "var(--light-purple)",
            fontWeight: "bold",
          }}
        >
          <span
            className="fs-2"
            style={{ height: "10rem", overflow: "hidden" }}
          >
            {title}
          </span>
          <span className="ms-2 text-muted" style={{ margin: "0.8rem" }}>
            {formatCurrency(price)}
          </span>
        </Card.Title>
        <div
          style={{
            color: "var(--light-purple)",
            fontSize: "25px",
            padding: "10px",
            textDecoration: "none",
          }}
        >
          <Label>остават {currentQuantity}</Label>
          <DetailsText to={`/events/${id}`} className="details">
            <br />
            Повече информация...
          </DetailsText>
        </div>
        <div className="mt-auto">
          {quantities === 0 ? (
            <StyledButton
              className="w-100"
              onClick={() => increaseCartQuantity(id)}
            >
              Добави
            </StyledButton>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: ".5rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                <StyledButton onClick={() => decreaseCartQuantity(id)}>
                  -
                </StyledButton>
                <div>
                  <span
                    className="fs-5"
                    style={{ color: "var(--light-purple)", fontWeight: "bold" }}
                  >
                    {quantities} в кошницата
                  </span>
                </div>
                <StyledButton onClick={() => increaseCartQuantity(id)}>
                  +
                </StyledButton>
              </div>
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: "0.5rem" }}
              ></div>
              <StyledButton variant="danger" onClick={() => removeFromCart(id)}>
                Премахни
              </StyledButton>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
