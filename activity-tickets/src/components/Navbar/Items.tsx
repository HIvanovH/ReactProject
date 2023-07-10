import React, { useState, useEffect, useRef } from "react";
import Dropdown, { SubmenuItem } from "./DropDown";
import CustomLink from "./CustomLink";
import "./Style.css";
import SearchBar from "../Searchbar";
import TestData from "./../../Data.json";
interface MenuItemsProps {
  items: {
    title: string;
    url?: string;
    submenu?: SubmenuItem[];
  };
}

const MenuItems: React.FC<MenuItemsProps> = ({ items }: MenuItemsProps) => {
  const [dropdown, setDropdown] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

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
    <li className="menu-items" ref={ref}>
      {items.submenu ? (
        <>
          <button
            className="dropdownbtn"
            aria-expanded={dropdown ? "true" : "false"}
            onClick={() => setDropdown((prev) => !prev)}
          >
            {items.title}{" "}
          </button>
          <Dropdown dropdown={dropdown} submenus={items.submenu} />
        </>
      ) : (
        <CustomLink to={items.url as string}>{items.title}</CustomLink>
      )}
    </li>
  );
};

export default MenuItems;
