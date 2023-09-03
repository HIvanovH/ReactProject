import { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useCookies } from "react-cookie";
import defaultImg from "../imgs/ticket.avif";
import styled from "styled-components";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TicketContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: var(--mint);
  box-shadow: 0 0 5px 1px #aaaaaa;
  height: 33rem;
  width: 65rem;
  padding: 2rem;
  margin: 2rem;
`;
const ImageContainer = styled.div<{ imagePath: string }>`
  position: relative;
  height: 18rem;
  width: 18rem;
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
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 1rem;
  margin-right: 1rem;
`;
const Text = styled.label`
  position: relative;
  top: 1.5rem;
  font-family: "Courier New", Courier, monospace, serif;
  font-size: 2rem;
  color: var(--light-purple);
  font-weight: bold;
`;
const Container = styled.div`
  position: relative;
  top: 1.5rem;
  display: grid;
  grid-template-columns: 1fr 2fr;
  background-color: var(--butter);
  box-shadow: 0 0 5px 1px #aaaaaa;
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

type BoughtItem = {
  id: number;
  title: string;
  description: string;
  totalQuantity: number;
  location: string;
  date: string;
  imagePath?: string;
};

export function BoughtTickets() {
  const [boughtItems, setBoughtItems] = useState<BoughtItem[]>([]);
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    const headers = { Authorization: `Bearer ${cookies.token.result}` };
    axios
      .get(`http://localhost:5104/api/BoughtTickets/history`, {
        headers,
      })
      .then((response) => {
        setBoughtItems(response.data);
      })
      .catch((error) => {
        console.error("Error retrieving purchase history:", error);
      });
    console.log(boughtItems);
  }, [boughtItems]);

  return (
    <MainContainer>
      {boughtItems.map((item) => (
        <TicketContainer key={item.id} className="d-flex align-items-center">
          <Title>{item.title}</Title>

          <Container>
            <ImageContainer imagePath={item.imagePath || defaultImg} />
            <Description>{item.description}</Description>
          </Container>
          {<Text> {item.totalQuantity + "бр."}</Text>}
          <DateContainer>
            {"дата: "}
            {new Date(item.date).toLocaleString("bg-BG", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            {", в: "}
            {new Date(item.date).toLocaleString("bg-BG", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </DateContainer>
        </TicketContainer>
      ))}
    </MainContainer>
  );
}
