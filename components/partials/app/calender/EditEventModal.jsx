import React, { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import Textinput from "@/components/ui/Textinput";
import Flatpickr from "react-flatpickr";

const EditEventModal = ({ editModal, onCloseEditModal, editItem, onUpdate, onDelete }) => {
  const [title, setTitle] = useState(editItem?.title || "");
  const [startDate, setStartDate] = useState(editItem?.start || new Date());
  const [endDate, setEndDate] = useState(editItem?.end || new Date());
  const [calendar, setCalendar] = useState(editItem?.calendar || "personal");

  useEffect(() => {
    if (editItem) {
      setTitle(editItem.title || "");
      setStartDate(editItem.start || new Date());
      setEndDate(editItem.end || new Date());
      setCalendar(editItem.calendar || "personal");
    }
  }, [editItem]);

  const handleUpdate = () => {
    if (!title || new Date(startDate) > new Date(endDate)) {
      alert("Veuillez fournir des entrées valides.");
      return;
    }
    onUpdate(editItem.id, { title, start: startDate, end: endDate, calendar });
    onCloseEditModal();
  };

  return (
    <Modal title="Modifier l'événement" activeModal={editModal} onClose={onCloseEditModal}>
      <div className="space-y-4">
        <Textinput
          label="Nom de l'événement"
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
        <div className="flex justify-between">
          <button className="btn btn-danger" onClick={() => onDelete(editItem.id)}>
            Supprimer l'événement
          </button>
          <button className="btn btn-dark" onClick={handleUpdate}>
            Enregistrer les modifications
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditEventModal;
