import { Routes, Route, Outlet } from "react-router-dom";
import HomePage from "./features/HomePage";
import Profile from "./features/Profile";
import About from "./features/About";
import EventsPage from "./features/EventsPage";
import Registration from "./features/Registration";
import Login from "./features/Login";
import EventDetailsPage from "./features/ITicketDetailsPage";
import AdminPage from "./features/AdminPage";
import PrivateRoute from "./components/PrivateRoute";
import { BoughtTickets } from "./features/BoughtTickets";
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/event" element={<HomePage />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/purchases"
        element={
          <PrivateRoute>
            <BoughtTickets />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <PrivateRoute adminOnly>
            <AdminPage />
          </PrivateRoute>
        }
      />
      <Route path="/events/:id" element={<EventDetailsPage />} />
    </Routes>
  );
};

export default AppRouter;
