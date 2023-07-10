import React, { useState, ChangeEvent, useEffect, useRef } from "react";
import "./Navbar/Searchbar.css";
import CustomLink from "./Navbar/CustomLink";

interface SearchResult {
  title: string;
}

interface SearchBarProps {
  placeholder: string;
  data: SearchResult[];
  onSearch?: (searchTerm: string) => void;
  shouldFocus?: boolean;
  onFocus?: () => void;
  onItemClick?: (item: SearchResult) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  data,
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

  useEffect(() => {
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
    clearInput();
  };

  return (
    <div className="search" ref={searchBarRef}>
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
          ref={inputRef}
          onFocus={handleFocus}
        />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <div />
          ) : (
            <div id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div className={`results ${!isDropdown ? "show" : ""}`}>
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <div
                className="dataItem"
                key={key}
                onClick={() => handleItemClick(value)}
              >
                <CustomLink to={("/events/" + value.title) as string}>
                  {value.title}
                </CustomLink>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
