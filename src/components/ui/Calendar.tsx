"use client";

import { MouseEvent, useEffect, useState } from "react";
import useSWR from "swr";
import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
} from "date-fns";
//

import styles from "@/styles/components/calendar.module.css";
import { calendar_v3 } from "googleapis";

type Props = {
  list: calendar_v3.Schema$CalendarList;
};

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function Calendar() {
  const { data, error, isLoading } = useSWR("/api/calendar", fetcher);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [duration, setDuration] = useState(60);
  const [isOpen, setIsOpen] = useState(false);

  const start = startOfWeek(startOfMonth(currentDate));
  const end = endOfWeek(endOfMonth(currentDate));

  const bookingTime = [
    "9:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ];

  const days = [];
  let day = start;
  while (day <= end) {
    days.push(day);
    day = addDays(day, 1);
  }

  const onClickDate = async (day: Date) => {
    setIsOpen(true);
    console.log(format(day, "d"));

    // const res = await fetch("/api/calendar", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ action: "update" }),
    // });

    // console.log(res);
  };

  return (
    <div className={styles.container}>
      <div>{duration} minute meeting</div>
      <div className={styles.content}>
        <div className={`${styles.calendar} ${isOpen && styles.calendarOpen}`}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className={styles.day}>
              {d}
            </div>
          ))}
          {days.map((day) => (
            <div
              key={day.toString()}
              onClick={() => onClickDate(day)}
              className={styles.day}
            >
              {format(day, "d")}
            </div>
          ))}
        </div>
        <div className={`${styles.menu} ${isOpen && styles.menuOpen}`}>
          <div className={styles.menuClose} onClick={() => setIsOpen(false)}>
            ×
          </div>
          {bookingTime.map((v) => (
            <div key={v}>{v}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
