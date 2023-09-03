import "./index.css";
import AppRouter from "./AppRouter";
import { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "./components/Nav";
import { ShoppingCartProvider } from "./Context/ShoppingCartContext";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import Footer from "./components/Footer";
import { useNavigate } from "react-router-dom";
const App: React.FC = () => {
  const [dropdown, setDropdown] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  const [cookies, , removeCookie] = useCookies(["token"]);
  const isLoggedIn = !!cookies["token"];
  const navigate = useNavigate();

  const Container = styled.div`
    background-color: var(--butter);
    height: 100%;
    padding-bottom: 20rem;
  `;
  const handleLogout = () => {
    navigate("/");
    removeCookie("token");
  };

  useEffect(() => {
    const handler = (event: MouseEvent | TouchEvent) => {
      if (
        dropdown &&
        ref.current &&
        !ref.current.contains(event.target as Node)
      ) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [dropdown]);
  return (
    <ShoppingCartProvider>
      <Container>
        <Nav isLoggedIn={isLoggedIn} onLogout={handleLogout}></Nav>
        <AppRouter />
      </Container>
      <Footer></Footer>
    </ShoppingCartProvider>
  );
};

export default App;
