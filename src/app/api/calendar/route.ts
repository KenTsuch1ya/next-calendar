import { NextResponse } from "next/server";
import { google, calendar_v3 } from "googleapis";
import { auth } from "@/auth";

import CalendarType = calendar_v3.Calendar;

const oauth2Client = new google.auth.OAuth2({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
});

export async function GET(request: Request) {
  console.log("session");
  // const session = await auth();
  // console.log(session);
  return NextResponse.json({ error: "Internal Server Error" });
}

export async function POST(request: Request) {
  const data = await request.json();
  console.log(data);
  return NextResponse.json("ok");
  const oauth2Client = new google.auth.OAuth2({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  });

  const accessToken = request;
  // oauth2Client.setCredentials({ access_token: accessToken });

  const calendar: CalendarType = google.calendar({
    version: "v3",
    auth: oauth2Client,
  });

  console.log("TEST");
  const event: calendar_v3.Schema$Event = {
    summary: "Google I/O 2015",
    description: "A chance to hear more about Google's developer products.",
    start: {
      dateTime: "2025-02-26T09:00:00-07:00",
      timeZone: "America/Los_Angeles",
    },
    end: {
      dateTime: "2025-02-27T17:00:00-07:00",
      timeZone: "America/Los_Angeles",
    },
    recurrence: ["RRULE:FREQ=DAILY;COUNT=2"],
    attendees: [{ email: "lpage@example.com" }, { email: "sbrin@example.com" }],
  };

  const res = await calendar.events.insert({
    calendarId: "primary",
    requestBody: event,
  });

  console.log("res", res);
}

export const useCalendar = () => {
  // const calendar: CalendarType = google.calendar({
  //   version: "v3",
  //   auth: oauth2Client,
  // });

  const getCalendarList = async (accessToken: string) => {
    // oauth2Client.setCredentials({ access_token: accessToken });
    // return await calendar.calendarList.list();
  };

  const insertEvent = async (accessToken: string) => {
    // oauth2Client.setCredentials({ access_token: accessToken });
    // return await calendar.events.insert(a);
  };

  return { getCalendarList, insertEvent };
};
