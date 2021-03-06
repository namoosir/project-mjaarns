import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid"; // a plugin!

import { useState, useEffect } from "react";
import { connect } from "react-redux";

import { updateUserHome } from "../../actions/userAction";
import AddEvent from "./addEvent";
import AuthHeader from "../AuthHeader";

import map from "../stylesheets/calendar.css";

const Calendar = ({ user, isAuthenticated, history, updateUserHome }) => {
  useEffect(() => {
    updateUserHome(user, history);
  }, []);

  const [editing, setEditing] = useState({
    isEditingCalendar: false,
  });

  const [events, setEvents] = useState({
    currEvents: user ? user.events : "",
  });

  const { isEditingCalendar } = editing;

  const onSubmitAddEvent = (e) => {
    e.preventDefault();

    setEditing({
      ...editing,
      isEditingCalendar: true,
    });
  };

  return (
    <>
      <AuthHeader
        user={user}
        isAuthenticated={isAuthenticated}
        history={history}
        events={events}
        setEvents={setEvents}
      />

      <div
        className={
          isEditingCalendar ? "row justify-content-center" : "container"
        }
      >
        <div className={isEditingCalendar ? "col-lg-8 ms-4" : ""}>
          <div className="card map mt-3">
            <div className="card-body body-map">
              <h2 className="text-center">
                {user ? user.name : ""}'s Calendar
              </h2>
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView="dayGridMonth"
                height="75vh"
                slotDuration="00:30:00"
                slotLabelInterval="01:00"
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                events={events.currEvents}
              />

              <div className="text-center">
                {user && !isEditingCalendar ? (
                  <form onSubmit={onSubmitAddEvent} className="d-inline">
                    <button type="submit" className="btn btn-success me-2">
                      Add Event
                    </button>
                  </form>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
        {isEditingCalendar ? (
          <>
            <AddEvent
              user={user}
              setEditing={setEditing}
              history={history}
              events={events}
              setEvents={setEvents}
            />
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user.sentUser,
  isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps, { updateUserHome })(Calendar);
