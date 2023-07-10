import { Routes, Route, Outlet } from "react-router-dom";
import HomePage from "./features/HomePage";
import Profile from "./features/Profile";
import About from "./features/About";
import CatalogPage from "./features/EventsPage";
import Registration from "./features/Registration";
import Login from "./features/Login";
import CartPage from "./features/CartPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/personalDetails" element={<Profile />} />
      <Route path="/about" element={<About />} />
      <Route path="/events" element={<CatalogPage />} />
      <Route path="/event" element={<HomePage />} />
      <Route path="/payment" element={<HomePage />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      <Route path="/confirmEmail" element={<HomePage />} />
      <Route path="/yourTickets" element={<HomePage />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  );
};

export default AppRouter;
