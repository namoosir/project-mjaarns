import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

import { useState } from "react";

const CompanyCalendar = ({ user, events, setDisplay }) => {
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
          <h3 className="text-center text-light"> {user.name} Calendar </h3>
          <hr></hr>
          <FullCalendar
            plugins={[timeGridPlugin]}
            initialView="timeGridDay"
            height="50vh"
            slotDuration="00:30:00"
            slotLabelInterval="01:00"
            events={events.currEvents}
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

export default CompanyCalendar;