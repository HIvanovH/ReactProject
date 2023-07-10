import React from "react";
import { menuItems } from "./menuItems";
import Items from "./Items";
import "./Style.css";
interface NavbarProps {
  // Define your prop types here
}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <nav>
      <ul className="menus">
        {menuItems.map((menu, index) => {
          return <Items items={menu} key={index} />;
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
