import React, { useState } from "react";
import DropDown from "./DropDowns";

const Menu: React.FC = (): JSX.Element => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const options = () => {
    return ["Лични данни", "Закупени билети"];
  };

  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  return (
    <div
      className={showDropDown ? "active" : undefined}
      onMouseEnter={(): void => toggleDropDown()}
      onMouseLeave={(): void => toggleDropDown()}
    >
      <div>{"Профил"}</div>
      {showDropDown && <DropDown options={options()} showDropDown={false} />}
    </div>
  );
};

export default Menu;
