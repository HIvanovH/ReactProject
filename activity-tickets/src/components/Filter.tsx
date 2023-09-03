import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import styled from "styled-components";

interface FilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onClearFilters: () => void;
}

const FixedWidthToggle = styled(Dropdown.Toggle)`
  &&& {
    width: 15rem;
    background-color: var(--light-purple);
    border: 0px solid;
    font-weight: bold;
    font-size: 1.2rem;
    color: var(--butter);
    box-shadow: 0 0 5px 1px #aaaaaa;
    &:hover {
      background-color: var(--butter);
      color: var(--light-purple);
    }

    &:active {
      background-color: var(--light-purple);
      color: var(--butter);
    }
  }
`;

const CustomDropdownMenu = styled(Dropdown.Menu)`
  &&& {
    font-size: 1.2rem;
    background-color: var(--light-purple);
    color: var(--butter);
    font-weight: bold;
  }
`;

const CustomDropdownItem = styled(Dropdown.Item)`
  &&& {
    background-color: var(--light-purple);
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
  }
`;

const StyledDropDown = styled(Dropdown)`
  z-index: 1;
  background-color: var(--light-purple);
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
const Filter = ({
  categories,
  selectedCategory,
  onCategoryChange,
  onClearFilters,
}: FilterProps) => {
  const handleCategoryChange = (category: string) => {
    onCategoryChange(category);
  };

  const clearFilters = () => {
    onClearFilters();
  };

  const createDropdownItems = () => {
    return categories.map((category) => (
      <CustomDropdownItem
        key={category}
        onClick={() => handleCategoryChange(category)}
      >
        {category}
      </CustomDropdownItem>
    ));
  };

  return (
    <div style={{ margin: "1rem", width: "15rem" }}>
      <StyledDropDown className="d-inline">
        <FixedWidthToggle variant="success" id="dropdown-basic">
          {selectedCategory}
        </FixedWidthToggle>
        <CustomDropdownMenu>
          <CustomDropdownItem onClick={clearFilters}>Всички</CustomDropdownItem>
          <Dropdown.Divider />
          {createDropdownItems()}
        </CustomDropdownMenu>
      </StyledDropDown>
    </div>
  );
};

export default Filter;
