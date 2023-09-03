import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Button, Container, Nav as NavBs, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import SearchBar from "./Searchbar";
import TestData from "./../Data.json";
import { useShoppingCartContext } from "../Context/ShoppingCartContext";
import "bootstrap/dist/css/bootstrap.css";
import logo from "../imgs/Logo.png";
const CustomNavbar = styled(Navbar)`
  background-color: var(--light-purple);
  box-shadow: 0 0 5px 1px #aaaaaa;
  font-family: Courier, sans-serif;
  font-size: 1.6rem;
  z-index: 100;
`;
interface NavProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}
const StyledButton = styled.button`
  background-color: var(--light-purple);
  border-radius: 0.5rem;
  border: 0.1rem solid var(--light-purple);
  padding: 0.3rem;
  font-weight: bold;
  color: var(--butter);
  transition: background-color 0.3s, color 0.3s;
  &:hover {
    background-color: var(--butter);
    color: var(--light-purple);
  }
`;
const Title = styled.span`
  background-color: var(--light-purple);
  border-radius: 0.5rem;
  border: 0.1rem solid var(--light-purple);
  padding: 1rem;
  margin: 0.4rem;
  color: var(--butter);
  font-weight: bold;
  transition: background-color 0.3s, color 0.3s;
  &:hover {
    background-color: var(--butter);
    color: var(--light-purple);
  }
`;
const Nav: React.FC<NavProps> = ({ isLoggedIn, onLogout }) => {
  const { openCart, cartQuantity } = useShoppingCartContext();
  const handleLogout = () => {
    onLogout();
  };
  const [isBoughtTicketsOpen, setIsBoughtTicketsOpen] = useState(false);
  const handleBoughtTicketsToggle = () => {
    setIsBoughtTicketsOpen(!isBoughtTicketsOpen);
  };
  return (
    <CustomNavbar sticky="top" className="mb-3" collapseOnSelect>
      <Navbar.Brand style={{ marginLeft: "10rem" }}>
        <img
          src={logo}
          alt="Logo"
          width="160"
          height="60"
          className="d-inline-block align-top rounded"
        />
      </Navbar.Brand>
      <NavBs className="me-auto">
        <NavBs.Link to="/" as={NavLink}>
          <Title>Начало</Title>
        </NavBs.Link>
        <NavBs.Link to="/events" as={NavLink}>
          <Title>Събития</Title>
        </NavBs.Link>
      </NavBs>
      <SearchBar placeholder={"Търси"}></SearchBar>
      <StyledCartButton onClick={openCart} className="rounded-circle">
        <StyledCartIcon
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
        >
          <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
        </StyledCartIcon>
        <div
          className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
          style={{
            color: "white",
            width: "1.5rem",
            height: "1.5rem",
            position: "absolute",
            bottom: 0,
            right: 0,
            transform: "translate(25%,25%",
          }}
        >
          {cartQuantity}
        </div>
      </StyledCartButton>

      <NavBs className="ml-auto" style={{ marginRight: "10rem" }}>
        {isLoggedIn ? (
          <>
            <NavBs.Link to="/purchases" as={NavLink}>
              <Title>Билети</Title>
            </NavBs.Link>

            <StyledButton onClick={handleLogout}>Изход</StyledButton>
          </>
        ) : (
          <>
            <NavBs.Link to="/login" as={NavLink}>
              <Title>Вход</Title>
            </NavBs.Link>
            <NavBs.Link to="/registration" as={NavLink}>
              <Title>Регистрация</Title>
            </NavBs.Link>
          </>
        )}
      </NavBs>
    </CustomNavbar>
  );
};
export default Nav;
const StyledCartButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  position: relative;
  background-color: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    svg path {
      fill: darken(var(--butter), 20%);
    }
  }
`;
const StyledCartIcon = styled.svg`
  max-width: 100%;
  max-height: 100%;
  fill: var(--butter);
`;
