import { UserWithToken } from "@/types/auth";
import { google, calendar_v3 } from "googleapis";
import CalendarType = calendar_v3.Calendar;

export const useCalendar = () => {
  const oauth2Client = new google.auth.OAuth2({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  });
  const calendar: CalendarType = google.calendar({
    version: "v3",
    auth: oauth2Client,
  });

  const getCalendarList = async (user: UserWithToken) => {
    const { accessToken } = user;
    oauth2Client.setCredentials({ access_token: accessToken });
    return await calendar.calendarList.list();
  };

  return { getCalendarList };
};
