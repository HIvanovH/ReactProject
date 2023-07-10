import React, { useEffect, useState } from "react";
import CustomLink from "../Navbar/CustomLink";

type DropDownProps = {
  options: string[];
  showDropDown: boolean;
};

const DropDown: React.FC<DropDownProps> = ({
  options,
}: DropDownProps): JSX.Element => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);

  useEffect(() => {
    setShowDropDown(showDropDown);
  }, [showDropDown]);

  return (
    <>
      <div className={showDropDown ? "dropdown" : "dropdown active"}>
        {options.map((option: string, index: number): JSX.Element => {
          return (
            <div key={index}>
              <CustomLink to={`/${option}`}>{option}</CustomLink>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default DropDown;
