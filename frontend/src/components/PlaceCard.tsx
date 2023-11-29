import React from "react";
import "../App.css";
import { daysList, groupDays, IOpenHours } from "../helpers/CardDataHelpers";

interface CardProps {
  displayed_what: string;
  displayed_where: string;
  opening_hours: {
    days: {
      [key: string]: Array<IOpenHours>;
    };
    closed_on_holidays: boolean;
    open_by_arrangement: boolean;
  };
}

const formatTime = (time: string) => {
  return time.length > 1 ? time : `0${time}`;
};

const formatOpeningHours = (openingHours: IOpenHours[]) =>
  openingHours.map(({ start, end }) => `${start} - ${end}`).join(", ");
const currentDate = new Date();

const minutes = currentDate.getMinutes();
const hours = currentDate.getHours();

const currentTime = `${formatTime(String(minutes))}:${formatTime(String(hours))}`;
const currentDay = currentDate.getDay();

const weekday = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

const PlaceCard: React.FC<CardProps> = ({ displayed_what, displayed_where, opening_hours }) => {
  const groupedDays = groupDays(daysList, opening_hours);

  const isOpenCurrently = opening_hours.days[weekday[currentDay]].some(
    (element) => currentTime >= element.start && currentTime <= element.end
  );

  return (
    <div className="card">
      <div className="info">
        <h2>{displayed_what}</h2>
        <p>{displayed_where}</p>
      </div>
      <div className="daysAndHours">
        <h2>Opening hours</h2>
        <h2 style={{ color: isOpenCurrently ? "green" : "red" }}>{isOpenCurrently ? "OPEN NOW" : "CLOSED"}</h2>
        {groupedDays?.map((group, groupIndex) => (
          <div key={groupIndex}>
            <div className="schedule">
              <p className="day">{group.days.join("-")}</p>
              {group.openingHours ? <p>{formatOpeningHours(group.openingHours)}</p> : <p className="closed">Closed</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaceCard;
