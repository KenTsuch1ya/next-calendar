import { NextResponse } from "next/server";
import { google, calendar_v3 } from "googleapis";
import CalendarType = calendar_v3.Calendar;

const oauth2Client = new google.auth.OAuth2({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
});

export async function GET(request: Request) {
  console.log(oauth2Client);
  console.log(request);
  return NextResponse.json("wawawa");
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
