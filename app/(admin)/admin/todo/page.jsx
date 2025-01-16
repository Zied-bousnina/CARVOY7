"use client";

import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import EventModal from "@/components/partials/app/calender/EventModal";
import EditEventModal from "@/components/partials/app/calender/EditEventModal";
import { CalendarService } from "@/_services/Calendar.Service";
import { missionService } from "@/_services/mission.service";

const CalenderPage = () => {
  const [events, setEvents] = useState([]);
  const [activeModal, setActiveModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [partners, setPartners] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleEventClick = (arg) => {
    setEditItem({
      id: arg.event.id || arg.event._id,
      title: arg.event.title,
      start: arg.event.start,
      end: arg.event.end,
      calendar: arg.event.extendedProps.calendar || "personal",
      partner: arg.event.extendedProps.partner ? arg.event.extendedProps.partner.id : null,
      isAllDay: arg.event.extendedProps.isAllDay || false,
    });
    setEditModal(true);
  };

  const handleUpdateEvent = (id, updates) => {
    if (!updates.title || !updates.start || !updates.end) {
      alert("Title, start, and end are required.");
      return;
    }

    CalendarService.updateEvent(id, updates)
      .then((updatedEvent) => {
        setEvents((prev) =>
          prev.map((event) => (event.id === id ? updatedEvent : event))
      );
      GetEvents()
    })
      .catch((err) => console.error("Error updating event:", err));
    setEditModal(false);
  };

  const handleDeleteEvent = (id) => {
    if (!id) {
      console.error("Event ID is undefined");
      return;
    }
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
      calendar: "personal", // Default calendar type
    });
    setActiveModal(true);
  };

  const handleAddEvent = (event) => {
    CalendarService.createEvent(event)
      .then((newEvent) => {setEvents((prev) => [...prev, newEvent])
        GetEvents()

      })
      .catch((err) => console.error("Error adding event:", err));
    setActiveModal(false);
  };

  const FetchAllPartnership = () => {
    return missionService
      .FetchAllPartnership()
      .then((res) => {
        setPartners(res.partner);
      })
      .catch((err) => console.error("Error fetching partners:", err));
  };

  const GetEvents = () => {
    CalendarService.getAllEvents()
      .then((data) => {
        const mappedData = data.map((event) => ({
          ...event,
          id: event.id || event._id,
          extendedProps: {
            partner: partners.find((p) => p.id === event.partner) || null,
          },
        }));
        setEvents(mappedData);
      })
      .catch((err) => console.error("Error fetching events:", err));
  };

  const groupAsyncFunctions = () => {
    setIsLoading(true);
    Promise.all([GetEvents(), FetchAllPartnership()])
      .catch((err) => console.error("Error in async functions:", err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    groupAsyncFunctions();
  }, []);

  const renderEventContent = (eventInfo) => {
    const { title, extendedProps } = eventInfo.event;
    const partnerName = extendedProps.partner ? extendedProps.partner.name : "No Partner";

    return (
      <div className="bg-white border-l-4 border-blue-500 p-2 rounded shadow-sm">
        <div className="font-semibold text-gray-800">{title}</div>
        <div className="text-sm text-gray-500">{partnerName}</div>
        <div className="text-xs text-gray-400">{eventInfo.timeText || "All Day"}</div>

      </div>
    );
  };

  return (
    <div className="dashcode-calender px-4 py-6">
      <h4 className="font-medium text-2xl text-slate-900 mb-6">To-DO</h4>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        selectable={true}
        editable={true}
        initialView="dayGridMonth"
        eventContent={renderEventContent}
      />
      <EditEventModal
        editModal={editModal}
        onCloseEditModal={() => setEditModal(false)}
        editItem={editItem}
        onUpdate={handleUpdateEvent}
        onDelete={handleDeleteEvent}
        partners={partners}
      />
      <EventModal
        activeModal={activeModal}
        onClose={() => setActiveModal(false)}
        selectedEvent={selectedEvent}
        onSave={handleAddEvent}
        partners={partners}
      />
    </div>
  );
};

export default CalenderPage;
