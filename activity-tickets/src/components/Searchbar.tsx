import React, { useState, ChangeEvent, useEffect, useRef } from "react";
import styled from "styled-components";
import CustomLink from "./CustomLink";
import { baseUrl } from "../constants/url.constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface SearchResult {
  id: number;
  title: string;
}

interface SearchBarProps {
  placeholder: string;
  data?: SearchResult[];
  onSearch?: (searchTerm: string) => void;
  shouldFocus?: boolean;
  onFocus?: () => void;
  onItemClick?: (item: SearchResult) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  onSearch,
  onFocus,
  shouldFocus,
  onItemClick,
}) => {
  const [filteredData, setFilteredData] = useState<SearchResult[]>([]);
  const [wordEntered, setWordEntered] = useState("");
  const [isDropdown, setIsDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const prevShouldFocus = useRef(shouldFocus);
  const [data, setData] = useState<SearchResult[]>([]);
  const navigate = useNavigate();
  const fetchProductsList = async () => {
    try {
      const response = await axios.get<SearchResult[]>(baseUrl);
      setFilteredData(response.data);
      setData(response.data);
    } catch (error) {
      alert("Не могат да се заредят данните от базата");
    }
  };

  useEffect(() => {
    fetchProductsList();
    if (shouldFocus && inputRef.current) {
      inputRef.current.focus();
      setIsDropdown(true);
    } else if (!shouldFocus && prevShouldFocus.current) {
      setIsDropdown(false);
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        setIsDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [shouldFocus]);

  const handleFilter = (event: ChangeEvent<HTMLInputElement>) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
      setIsDropdown(false);
    } else {
      setFilteredData(newFilter);
      setIsDropdown(true);
    }

    if (onSearch) {
      onSearch(searchWord);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
    setIsDropdown(false);
  };

  const handleFocus = () => {
    if (wordEntered) {
      setIsDropdown(true);
    }

    if (onFocus) {
      onFocus();
    }
  };

  const handleItemClick = (item: SearchResult) => {
    if (onItemClick) {
      onItemClick(item);
    }
    navigate(`/events/${item.id}`);
    clearInput();
  };

  return (
    <SearchWrapper ref={searchBarRef}>
      <SearchInputs>
        <SearchInput
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
          ref={inputRef}
          onFocus={handleFocus}
        />
        <SearchIcon>
          {filteredData.length === 0 ? (
            <div />
          ) : (
            <ClearButton id="clearBtn" onClick={clearInput} />
          )}
        </SearchIcon>
      </SearchInputs>
      {filteredData.length !== 0 && (
        <Results className={isDropdown ? "show" : ""}>
          {filteredData.slice(0, 15).map((value, key) => (
            <DataItem key={key} onClick={() => handleItemClick(value)}>
              <Title to={`/events/${value.id}`}>{value.title}</Title>
            </DataItem>
          ))}
        </Results>
      )}
    </SearchWrapper>
  );
};

export default SearchBar;

const SearchWrapper = styled.div`
  &active {
    border-color: var(--butter);
  }
`;

const SearchInputs = styled.div`
  margin-left: 3em;
  margin-right: 2em;
  display: flex;
  border: 0rem solid;
  &active {
    border-color: var(--butter);
  }
`;

const SearchInput = styled.input`
  background-color: inherit;
  border: 0.15em solid #ccc;
  border-color: #00000024;
  border-radius: 1em;
  font-size: 1em;
  padding: 1.3em;
  height: 1.5em;
  width: 15em;

  &active {
    border-color: var(--butter);
    background-color: var(--butter);
  }

  &:hover {
    border-color: var(--butter);
    transition: border-color 2s, background-color 2s;
    background-color: var(--butter);
  }
`;

const SearchIcon = styled.div``;

const ClearButton = styled.div``;

const Results = styled.div`
  font-weight: bold;
  position: absolute;
  font-size: 0.875rem;
  z-index: 9999;
  width: 30em;
  padding: 0.2em;
  left: 52%;
  padding-left: 0.2em;
  padding-right: 0.2em;
  background-color: var(--light-purple);
  border-radius: 0.5rem;
  font-weight: bold;
  margin-left: 1.8em;
  margin-top: 0.3em;
  display: none;

  &.show {
    display: block;
  }
`;

const DataItem = styled.div`
  font-family: "Courier New", Courier, monospace, serif;
  font-weight: bold;
  position: relative;
  font-size: 1.6em;
  padding: 0.1em 1em;
  margin-top: 0.2em;
  color: var(--butter);
  height: 2.5rem;
  box-shadow: 0 0 5px 1px #8585856e;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  &:hover {
    background-color: var(--butter);
    transition: background-color 0.3s;
    color: var(--light-purple);
  }
`;
const Title = styled(CustomLink)`
  text-decoration: inherit;
  color: inherit;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
