import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { ITicket } from "../DTOs/TicketsDTO";
import { PostTicket } from "../DTOs/PostTicket";
import { useCookies } from "react-cookie";
import { baseUrl } from "../constants/url.constants";
import ConcertHall from "../components/Concerthall";

const AdminPageContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 8px;
  margin-bottom: 15px;
  margin-left: 5px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: var(--light-purple);
  color: var(--butter);
  border: none;
  cursor: pointer;
  border-radius: 0.5rem;
`;

const AddContainer = styled.div`
  background-color: var(--mint);
  box-shadow: 0 0 5px 1px #aaaaaa;
  padding: 2rem;
`;

const DeleteContainer = styled.div`
  background-color: var(--mint);
  box-shadow: 0 0 5px 1px #aaaaaa;
  margin-top: 2rem;
  padding: 2rem;
`;

const AdminPage: React.FC = () => {
  const [ticket, setTicket] = useState<PostTicket>({
    title: "",
    description: "",
    category: "",
    location: "",
    date: "",
    time: "",
    price: 0,
    quantity: 0,
  });

  const [tickets, setTickets] = useState<ITicket[]>([]);

  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    fetchTicketsList();
  }, []);

  const fetchTicketsList = async () => {
    try {
      const response = await axios.get<ITicket[]>(baseUrl);
      setTickets(response.data);
    } catch (error) {
      alert("Грешка при зареждане от базата");
    }
  };
  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setTicket((prevTicket) => ({
      ...prevTicket,
      [name]: value,
    }));
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTicket((prevTicket) => ({
      ...prevTicket,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleDeleteTicket = (ticketId: number) => {
    const headers = { Authorization: `Bearer ${cookies.token.result}` };
    axios
      .put(`http://localhost:5104/Delete/${ticketId}`, {}, { headers })
      .then(() => {
        setTickets(tickets.filter((ticket) => ticket.id !== ticketId));
      })
      .catch((error) => {
        console.error("Error deleting ticket:", error);
      });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const headers = { Authorization: `Bearer ${cookies.token.result}` };
      await axios.post("http://localhost:5104/CreateTickets", ticket, {
        headers,
      });
      alert("Успешно дабавен билет");

      setTicket({
        title: "",
        description: "",
        category: "",
        date: "",
        time: "",
        location: "",
        price: 0,
        quantity: 0,
      });
    } catch (error) {
      console.error("Error adding ticket:", error);
      alert("Error adding ticket. Please try again.");
    }
  };

  return (
    <AdminPageContainer>
      <AddContainer>
        <h2>Добави нов билет</h2>
        <Form onSubmit={handleSubmit}>
          <Label>
            Заглавие:
            <Input
              type="text"
              name="title"
              value={ticket.title}
              onChange={handleInputChange}
              required
            />
          </Label>
          <Label>Детайли:</Label>
          <textarea
            name="description"
            value={ticket.description}
            onChange={handleTextareaChange} // Use the adjusted event handler
            required
            rows={4}
            style={{ marginBottom: "1rem" }}
          />

          <Label>
            Категория:
            <Input
              type="text"
              name="category"
              value={ticket.category}
              onChange={handleInputChange}
              required
            />
          </Label>
          <Label>
            Местоположие:
            <Input
              type="text"
              name="location"
              value={ticket.location}
              onChange={handleInputChange}
              required
            />
          </Label>
          <Label>
            Дата:
            <Input
              type="date"
              name="date"
              value={ticket.date}
              onChange={handleInputChange}
              required
            />
          </Label>
          <Label>
            Време:
            <Input
              type="time"
              name="time"
              value={ticket.time}
              onChange={handleInputChange}
              required
            />
          </Label>
          <Label>
            Цена:
            <Input
              name="price"
              type="number"
              step="0.01"
              value={ticket.price}
              onChange={handleInputChange}
              required
            />
          </Label>
          <Label>
            брой билети:
            <Input
              name="quantity"
              type="number"
              step="1.0"
              value={ticket.quantity}
              onChange={handleInputChange}
              required
            />
          </Label>

          <Button type="submit">Добави билет</Button>
        </Form>
      </AddContainer>
      <DeleteContainer>
        <h1>Изриване на билет</h1>
        <TicketList tickets={tickets} onSelectTicket={handleDeleteTicket} />
      </DeleteContainer>
    </AdminPageContainer>
  );
};

export default AdminPage;

interface ITicketListProps {
  tickets: ITicket[];
  onSelectTicket: (ticketId: number) => void;
}
const TicketList: React.FC<ITicketListProps> = ({
  tickets,
  onSelectTicket,
}) => {
  return (
    <Container>
      <h2>Лист с билети</h2>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket.id}>
            {ticket.title}{" "}
            <Button onClick={() => onSelectTicket(ticket.id)}>Изтрий</Button>
          </li>
        ))}
      </ul>
    </Container>
  );
};
const Container = styled.div`
  font-weight: bold;
`;
