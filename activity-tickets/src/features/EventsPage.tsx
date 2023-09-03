import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import Filter from "../components/Filter";
import { ITicket } from "../DTOs/TicketsDTO";
import { baseUrl } from "../constants/url.constants";
import styled from "styled-components";
import ascorderImg from "../imgs/sort-ascending.png";

const StyledHeading = styled.h1`
  font-size: 3.5rem;
  font-weight: bold;
  text-align: center;
  color: var(--light-purple);
  margin: 2rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
`;

const Button = styled.button`
  font-size: 1.2rem;
  box-shadow: 0 0 5px 1px #aaaaaa;
  margin: 1rem;
  background-color: var(--light-purple);
  width: 10rem;
  border: 0px;
  border-radius: 0.3rem;
  color: var(--butter);
  font-weight: bold;

  &:hover {
    background-color: var(--butter);
    color: var(--light-purple);
  }
  &:active {
    background-color: var(--light-purple);
    color: var(--butter);
  }
`;
const StyledButton = styled.button<{ isAscorderImg: boolean }>`
  font-size: 1.2rem;
  box-shadow: 0 0 5px 1px #aaaaaa;
  margin: 1rem;
  padding: 0.2rem;
  background-color: var(--light-purple);
  width: 2.1rem;
  border: 0px;
  border-radius: 0.3rem;
  color: var(--butter);
  font-weight: bold;
  background-image: url(${ascorderImg});
  background-repeat: no-repeat;
  background-size: contain;

  ${({ isAscorderImg }) =>
    isAscorderImg &&
    `
    
    transform: rotate(180deg);
      animation: rotateAnimation 5s linear;
  `}

  &:hover {
    background-color: var(--butter);
    color: var(--light-purple);
  }
  &:active {
    background-color: var(--light-purple);
    color: var(--butter);
  }
`;

const StyledContainer = styled(Container)`
  font-family: Courier, sans-serif;
  font-size: 1.4rem;
  background: var(--mint);
  box-shadow: 0 0 5px 1px #aaaaaa;
  padding-bottom: 1rem;
`;

const FilterContainer = styled.div`
  display: inline-flex;
  margin-bottom: 1rem;
`;

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] =
    useState("Изберете категория");
  const [selectedLocation, setSelectedLocation] = useState("Изберете място");
  const [categories, setCategories] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [sortingOrder, setSortingOrder] = useState<"ascending" | "descending">(
    "ascending"
  );
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };
  const handleLocationChange = (category: string) => {
    setSelectedLocation(category);
  };

  const fetchProductsList = async () => {
    try {
      const response = await axios.get<ITicket[]>(baseUrl);
      setTickets(response.data);
    } catch (error) {
      alert("Не могат да се заредят данните от базата");
    }
  };

  useEffect(() => {
    fetchProductsList();
  }, [tickets]);

  useEffect(() => {
    const uniqueCategories = [...new Set(tickets.map((item) => item.category))];
    setCategories(uniqueCategories);
    const locations = [...new Set(tickets.map((item) => item.location))];
    setLocations(locations);
  }, [tickets]);

  useEffect(() => {
    if (selectedCategory !== "Изберете категория") {
      const filteredTickets = tickets.filter(
        (item) => item.category === selectedCategory
      );
      const filteredLocations = [
        ...new Set(filteredTickets.map((item) => item.location)),
      ];
      setLocations(filteredLocations);
      setSelectedLocation("Изберете място");
    }
  }, [selectedCategory, tickets]);

  useEffect(() => {
    if (selectedLocation !== "Изберете място") {
      const filteredTickets = tickets.filter(
        (item) => item.location === selectedLocation
      );
      const filteredCategories = [
        ...new Set(filteredTickets.map((item) => item.category)),
      ];
      setCategories(filteredCategories);
      setSelectedCategory("Изберете категория");
    }
  }, [selectedLocation, tickets]);

  const clearFilterCategory = () => {
    setSelectedCategory("Изберете категория");
    const locations = [...new Set(tickets.map((item) => item.location))];
    setLocations(locations);
  };
  const clearFilterLocation = () => {
    setSelectedLocation("Изберете място");
    const uniqueCategories = [...new Set(tickets.map((item) => item.category))];
    setCategories(uniqueCategories);
  };
  const onClickCleartButton = () => {
    clearFilterLocation();
    clearFilterCategory();
  };
  const toggleSortingOrder = () => {
    setSortingOrder((prevOrder) =>
      prevOrder === "ascending" ? "descending" : "ascending"
    );
  };
  return (
    <StyledContainer>
      <StyledHeading>Събития</StyledHeading>
      <FilterContainer>
        <Button onClick={onClickCleartButton}>Изчисти</Button>

        <Filter
          categories={categories}
          selectedCategory="Изберете категория"
          onCategoryChange={handleCategoryChange}
          onClearFilters={clearFilterCategory}
        />
        <Filter
          categories={locations}
          selectedCategory="Изберете място"
          onCategoryChange={handleLocationChange}
          onClearFilters={clearFilterLocation}
        />
        <StyledButton
          isAscorderImg={sortingOrder === "ascending" ? true : false}
          onClick={toggleSortingOrder}
        ></StyledButton>
      </FilterContainer>

      <Row className="g-3">
        {tickets
          .filter((item) =>
            selectedCategory === "Изберете категория"
              ? true
              : item.category === selectedCategory
          )
          .filter((item) =>
            selectedLocation === "Изберете място"
              ? true
              : item.location === selectedLocation
          )
          .sort((a, b) => {
            const sortingFactor = sortingOrder === "ascending" ? 1 : -1;
            return sortingFactor * (a.price - b.price);
          })
          .map((item) => (
            <Col key={item.id} xs={12} sm={6} md={4}>
              <StoreItem {...item} />
            </Col>
          ))}
      </Row>
    </StyledContainer>
  );
}
