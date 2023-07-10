import React from "react";
import "../css/events.css";
import { Link } from "react-router-dom";
interface Event {
  id: number;
  name: string;
  image: string;
  description: string;
}

const events: Event[] = [
  {
    id: 1,
    name: "Event 1",
    image: "event1.jpg",
    description: "Description of Event 1",
  },
  {
    id: 2,
    name: "Event 2",
    image: "event2.jpg",
    description: "Description of Event 2",
  },
  {
    id: 3,
    name: "Event 3",
    image: "event3.jpg",
    description: "Description of Event 3",
  },
  {
    id: 4,
    name: "Event 4",
    image: "event4.jpg",
    description: "Description of Event 4",
  },
  {
    id: 5,
    name: "Event 5",
    image: "event5.jpg",
    description: "Description of Event 5",
  },
  // Add more events here...
];

const EventCard: React.FC<Event> = ({ id, name, image, description }) => {
  return (
    <div>
      <Link to={`/events/${id}`} className="event-card">
        <img src={image} alt={name} />
        <h3>{name}</h3>
        <p>{description}</p>
      </Link>
    </div>
  );
};

const EventsPage: React.FC = () => {
  return (
    <div>
      <div></div>
      <div className="events-page">
        <h1>Online Events</h1>
        <div className="event-list">
          {events.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
