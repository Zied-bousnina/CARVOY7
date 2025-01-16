import React, { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import Textinput from "@/components/ui/Textinput";
import Flatpickr from "react-flatpickr";

const EditEventModal = ({ editModal, onCloseEditModal, editItem, onUpdate, onDelete, partners }) => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("17:00");
  const [isAllDay, setIsAllDay] = useState(false);

  const [partner, setPartner] = useState("");

  useEffect(() => {
    if (editItem) {
      setTitle(editItem.title || "");
      setStartDate(editItem.start || new Date());
      setEndDate(editItem.end || new Date());
      setIsAllDay(editItem.isAllDay || false);
     
      setPartner(editItem.partner || "");
    }
  }, [editItem]);

  const handleUpdate = () => {
    if (!title || new Date(startDate) > new Date(endDate)) {
      alert("Veuillez fournir des entrées valides.");
      return;
    }

    onUpdate(editItem.id, {
      title,
      start: startDate,
      end: endDate,
      startTime: isAllDay ? null : startTime,
      endTime: isAllDay ? null : endTime,
      partner: partner || null,
      isAllDay,
    });
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
        <div className="flex items-center space-x-4">
          <input
            type="checkbox"
            id="allDay"
            checked={isAllDay}
            onChange={() => setIsAllDay(!isAllDay)}
          />
          <label htmlFor="allDay">Toute la journée</label>
        </div>
        {!isAllDay && (
          <div className="grid grid-cols-2 gap-4">
            <Textinput
              label="Heure de début"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
            <Textinput
              label="Heure de fin"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
        )}

        <select
          className="form-select w-full"
          value={partner}
          onChange={(e) => setPartner(e.target.value)}
        >
          <option value="">Aucun partenaire</option>
          {partners.map((partner) => (
            <option key={partner.id} value={partner._id}>
              {partner.name}
            </option>
          ))}
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
