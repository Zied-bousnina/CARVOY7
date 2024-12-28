import React, { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import Textinput from "@/components/ui/Textinput";
import Flatpickr from "react-flatpickr";

const EventModal = ({ activeModal, onClose, selectedEvent, onSave }) => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [calendar, setCalendar] = useState("personal");

  useEffect(() => {
    if (selectedEvent) {
      setTitle(selectedEvent.title || "");
      setStartDate(selectedEvent.start || new Date());
      setEndDate(selectedEvent.end || new Date());
      setCalendar(selectedEvent.calendar || "personal");
    }
  }, [selectedEvent]);

  const handleSubmit = () => {
    if (!title || new Date(startDate) > new Date(endDate)) {
      alert("Veuillez fournir des entrées valides.");
      return;
    }
    onSave({ title, start: startDate, end: endDate, calendar });
  };

  return (
    <Modal title="Ajouter un événement" activeModal={activeModal} onClose={onClose}>
      <div className="space-y-4">
        <Textinput
          label="Nom de l'événement"
          placeholder="Entrez le nom de l'événement"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="grid grid-cols-2 gap-4">
          <Flatpickr
            label="Date de début"
            value={startDate}
            onChange={(date) => setStartDate(date[0])}
            options={{ dateFormat: "Y-m-d" }}
          />
          <Flatpickr
            label="Date de fin"
            value={endDate}
            onChange={(date) => setEndDate(date[0])}
            options={{ dateFormat: "Y-m-d" }}
          />
        </div>
        <select
          className="form-select w-full"
          value={calendar}
          onChange={(e) => setCalendar(e.target.value)}
        >
          <option value="personal">Personnel</option>
          <option value="business">Professionnel</option>
          <option value="holiday">Vacances</option>
        </select>
        <button className="btn btn-dark w-full" onClick={handleSubmit}>
          Enregistrer l'événement
        </button>
      </div>
    </Modal>
  );
};

export default EventModal;
