import React from "react";
import "./Style.css";
import CustomLink from "./CustomLink";
export interface SubmenuItem {
  title: string;
  url: string;
}

interface DropdownProps {
  submenus: SubmenuItem[];
  dropdown: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  submenus,
  dropdown,
}: DropdownProps) => {
  return (
    <ul className={`dropdown ${dropdown ? "show" : ""}`}>
      {submenus.map((submenu, index) => (
        <li key={index} className="menu-items">
          <CustomLink to={submenu.url}>{submenu.title}</CustomLink>
        </li>
      ))}
    </ul>
  );
};

export default Dropdown;
