import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../constants/url.constants";
import { styled } from "styled-components";
import { Button } from "react-bootstrap";
import { useShoppingCartContext } from "../Context/ShoppingCartContext";
import { useParams } from "react-router-dom";
import defaultImg from "../imgs/ticket.avif";
import { formatCurrency } from "../utilities/formatCurrency";
const MainContainer = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  height: 45rem;
  width: 100%;
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
const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  background-color: var(--butter);
  box-shadow: 0 0 5px 1px #aaaaaa;
`;
const TicketContainer = styled.div`
  display: block;
  background: var(--mint);
  box-shadow: 0 0 5px 1px #aaaaaa;
  height: 35rem;
  width: 65rem;
  padding: 2rem;
  margin: 2rem;
`;

const AddToCartContainer = styled.div``;
const ImageContainer = styled.div<{ imagePath: string }>`
  position: relative;
  height: 20rem;
  width: 20rem;
  background-image: url(${(props) => props.imagePath});
  background-repeat: no-repeat;
  background-size: cover;
  background-color: var(--mint);
  margin: 1rem;
`;

const Title = styled.label`
  font-family: "Courier New", Courier, monospace, serif;
  font-size: 3rem;
  color: var(--light-purple);
  font-weight: bold;
`;
const Description = styled.span`
  position: relative;
  font-family: "Courier New", Courier, monospace, serif;
  font-size: 2rem;
  color: var(--light-purple);
  font-weight: bold;
`;
const DateContainer = styled.label`
  padding-top: 0.5rem;
  font-family: "Courier New", Courier, monospace, serif;
  font-size: 1.5rem;
  color: var(--light-purple);
  font-weight: bold;
`;
interface ITicketDetails {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  date: string;
  imagePath?: string;
}
const EventDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCartContext();

  const quantity = getItemQuantity(Number(id));
  const idNumber = Number(id);
  const [ticketDetails, setTicketDetails] = useState<ITicketDetails | null>(
    null
  );

  useEffect(() => {
    const fetchTicketDetails = async () => {
      try {
        const response = await axios.get<ITicketDetails>(`${baseUrl}/${id}`);
        setTicketDetails(response.data);
      } catch (error) {
        alert("Failed to fetch ticket details");
      }
    };

    fetchTicketDetails();
  }, [id]);

  if (!ticketDetails) {
    return <div>Loading...</div>;
  }
  return (
    <MainContainer>
      <TicketContainer>
        <Title>
          {ticketDetails.title}
          {":  "}
          {formatCurrency(ticketDetails.price)}
        </Title>
        <Container>
          <ImageContainer imagePath={ticketDetails.imagePath || defaultImg} />

          <Description>{ticketDetails.description}</Description>
        </Container>
        <DateContainer>
          {"дата: "}
          {new Date(ticketDetails.date).toLocaleString("bg-BG", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          {", в: "}
          {new Date(ticketDetails.date).toLocaleString("bg-BG", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </DateContainer>
      </TicketContainer>
      <AddToCartContainer className="mt-auto">
        {quantity === 0 ? (
          <StyledButton
            className="w-100"
            onClick={() => increaseCartQuantity(Number(id))}
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
              <StyledButton onClick={() => decreaseCartQuantity(Number(id))}>
                -
              </StyledButton>
              <div>
                <span className="fs-5">{quantity} в кошницата</span>
              </div>
              <StyledButton onClick={() => increaseCartQuantity(Number(id))}>
                +
              </StyledButton>
            </div>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ gap: "0.5rem" }}
            ></div>
            <StyledButton
              variant="danger"
              onClick={() => removeFromCart(Number(id))}
            >
              Премахни
            </StyledButton>
          </div>
        )}
      </AddToCartContainer>
    </MainContainer>
  );
};
export default EventDetailsPage;
