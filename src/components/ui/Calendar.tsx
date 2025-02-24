"use client";

import { MouseEvent, useState } from "react";
import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
} from "date-fns";

import styles from "@/styles/components/calendar.module.css";

export default function NextCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const start = startOfWeek(startOfMonth(currentDate));
  const end = endOfWeek(endOfMonth(currentDate));

  const days = [];
  let day = start;
  while (day <= end) {
    days.push(day);
    day = addDays(day, 1);
  }

  const onClickDate = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    day: Date
  ) => {
    console.log(e);
    console.log(format(day, "d"));
  };

  return (
    <div className={styles.calendar}>
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
        <div key={d} className={styles.day}>
          {d}
        </div>
      ))}
      {days.map((day) => (
        <div
          key={day.toString()}
          onClick={(e) => onClickDate(e, day)}
          className={styles.day}
        >
          {format(day, "d")}
        </div>
      ))}
    </div>
  );
}
