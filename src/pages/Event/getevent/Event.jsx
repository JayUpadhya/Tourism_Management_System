import React, { useEffect, useState } from "react";
import "../../../styles/Booking/event.css";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Event = () => {
  const [events, setEvents] = useState([]);

  // Retrive All Events
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:3001/api/getallevents"
      );
      setEvents(response.data);
    };
    fetchData();
  }, []);

  // Delete events
  const deleteEvent = async (eventId) => {
    await axios
      .delete(`http://localhost:3001/api/deleteevent/${eventId}`)
      .then((response) => {
        setEvents((prevEvent) =>
          prevEvent.filter((event) => event._id !== eventId)
        );
        toast.success(response.data.msg, {
          position: "top-right",
          className: "alert",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="event-table">
      <div className="eventTable">
        <h1 className="headerTopic">Event Booking Management</h1>
        <Link to="/add_event" className="addButton">
          Add Event Booking
        </Link>
        <Link to="/adminpanel" className="homeButton">
          Back to Home Panel
        </Link>
        <table border={1} cellPadding={10} cellSpacing={0}>
          <thead className="theading">
            <tr>
              <th>Id</th>
              <th>Event Id</th>
              <th>Event Type</th>
              <th>Customer Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => {
              return (
                <tr key={event._id}>
                  <td>{index + 1}</td>
                  <td>{event.eventid}</td>
                  <td>{event.eventtype}</td>
                  <td>{event.name}</td>
                  <td>{event.address}</td>
                  <td>{event.phone}</td>
                  <td>{event.email}</td>
                  <td>{new Date(event.date).toLocaleString()}</td>
                  <td className="actionButtons">
                    <button onClick={() => deleteEvent(event._id)}>
                      Delete <i className="fa-solid fa-trash"></i>
                    </button>
                    <Link to={`/editevent/` + event._id}>
                      Edit <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Event;
