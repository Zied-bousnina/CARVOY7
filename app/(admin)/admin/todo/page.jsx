"use client";

import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
// import { CalendarService } from "@/_services/CalendarService";
import EventModal from "@/components/partials/app/calender/EventModal";
import { CalendarService } from "@/_services/Calendar.Service";
import EditEventModal from "@/components/partials/app/calender/EditEventModal";

const CalenderPage = () => {
  const [events, setEvents] = useState([]);
  const [activeModal, setActiveModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editModal, setEditModal] = useState(false); // Controls EditEventModal visibility
  const [editItem, setEditItem] = useState(null);   // Stores the event to be edited

  useEffect(() => {
    CalendarService.getAllEvents()
      .then((data) => {
       
        const mappedData = data.map((event) => ({
          ...event,
          id: event.id || event._id, // Ensure `id` exists
        }));
        setEvents(mappedData);
      })
      .catch((err) => console.error("Error fetching events:", err));
  }, []);
  const handleEventClick = (arg) => {
    
    setEditItem({
      id: arg.event.id || arg.event._id,
      title: arg.event.title,
      start: arg.event.start,
      end: arg.event.end,
      calendar: arg.event.extendedProps.calendar || "personal",
    });
    setEditModal(true);
  };

  const handleUpdateEvent = (id, updates) => {

    CalendarService.updateEvent(id, updates)
      .then((updatedEvent) => {
        setEvents((prev) =>
          prev.map((event) => (event.id === id ? updatedEvent : event))
        );
      })
      .catch((err) => console.error("Error updating event:", err));
    setEditModal(false);
  };

  const handleDeleteEvent = (id) => {
    
    CalendarService.deleteEvent(id)
      .then(() => {
        setEvents((prev) => prev.filter((event) => event.id !== id));
      })
      .catch((err) => console.error("Error deleting event:", err));
    setEditModal(false);
  };
  const handleDateClick = (arg) => {
    setSelectedEvent({
      title: "",
      start: arg.date,
      end: arg.date,
      calendar: "personal", // default calendar type
    });
    setActiveModal(true);
  };

  const handleAddEvent = (event) => {
    CalendarService.createEvent(event)
      .then((newEvent) => setEvents((prev) => [...prev, newEvent]))
      .catch((err) => console.error("Error adding event:", err));
    setActiveModal(false);
  };

  return (
    <div className="dashcode-calender">
      <h4 className="font-medium lg:text-2xl text-xl capitalize text-slate-900 mb-6">
        To-DO
      </h4>
      <FullCalendar
  plugins={[dayGridPlugin, interactionPlugin]}
  events={events}
  dateClick={handleDateClick}
  eventClick={handleEventClick}
  selectable={true}
  editable={true}
  initialView="dayGridMonth"
/>
<EditEventModal
  editModal={editModal}
  onCloseEditModal={() => setEditModal(false)}
  editItem={editItem}
  onUpdate={handleUpdateEvent}
  onDelete={handleDeleteEvent}
/>
      <EventModal
        activeModal={activeModal}
        onClose={() => setActiveModal(false)}
        selectedEvent={selectedEvent}
        onSave={handleAddEvent}
      />
    </div>
  );
};

export default CalenderPage;
