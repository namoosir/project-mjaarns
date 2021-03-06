import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid"; // a plugin!

import { useState } from "react";

import AddEvent from "./addEvent";

import map from "../stylesheets/calendar.css";

const ModuleCalendar = ({ user, module, setDisplay }) => {
  const onSubmitCalendar = (e) => {
    e.preventDefault();

    setDisplay({
      displayCalendar: true,
    });
  };

  return (
    <>
      <div className="card map mt-3">
        <div className="card-body body-map">
          <h5 className="text-center text-light"> {module.name} Calendar </h5>
          <hr></hr>
          <FullCalendar
            plugins={[timeGridPlugin]}
            initialView="timeGridDay"
            height="50vh"
            slotDuration="00:30:00"
            slotLabelInterval="01:00"
            events={module.events}
          />

          <div className="text-center">
            <form onSubmit={onSubmitCalendar} className="d-inline">
              <button className="btn btn-light ms-2">See Calendar</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModuleCalendar;
