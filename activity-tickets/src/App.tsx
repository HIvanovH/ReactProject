import "./App.css";
import "./index.css";
import AppRouter from "./AppRouter";
import "./components/Navbar/Style.css";
import Header from "./components/Navbar/Header";
import SearchBar from "./components/Searchbar";
import TestData from "./Data.json";
import { useEffect, useRef, useState } from "react";

const App: React.FC = () => {
  // const [user, setUser] = useState<User>({
  //   email: undefined,
  // });

  // useEffect(() => {
  //   setUser(initUser());
  // }, [setUser]);
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
    <div>
      <Header></Header>
      <AppRouter />
    </div>
  );
};

export default App;
