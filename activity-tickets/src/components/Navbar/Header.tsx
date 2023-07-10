import React from "react";
import Navbar from "./Navbar";
import "./Style.css";
import CustomLink from "./CustomLink";
import SearchBar from "../Searchbar";
import TestData from "./../../Data.json";
import CartPage from "../../features/CartPage";
const Header: React.FC = () => {
  return (
    <header>
      <div className="nav-area">
        <CustomLink to="/home" className="logo">
          Logo
        </CustomLink>
        <SearchBar placeholder="Търси" data={TestData}></SearchBar>
        <Navbar />
        <CustomLink to="/cart" className="cart">
          Кошница
        </CustomLink>
      </div>
    </header>
  );
};

export default Header;
