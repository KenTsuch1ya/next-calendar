import { auth, signIn } from "@/auth";
import Calendar from "@/components/ui/Calendar";
import { UserWithToken } from "@/types/auth";
import { google, calendar_v3 } from "googleapis";
import CalendarType = calendar_v3.Calendar;
import { MouseEvent } from "react";
import { add } from "date-fns";

const addEvent = async (accessToken: string) => {
  const oauth2Client = new google.auth.OAuth2({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  });

  oauth2Client.setCredentials({ access_token: accessToken });

  const calendar: CalendarType = google.calendar({
    version: "v3",
    auth: oauth2Client,
  });

  console.log("TEST");
  const event: calendar_v3.Schema$Event = {
    summary: "Google I/O 2015",
    location: "800 Howard St., San Francisco, CA 94103",
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
};

export default async function me() {
  const ReLoginMessage = () => {
    return (
      <div>
        <div>
          ログインの有効期限が切れました。
          <br />
          もう一度ログインしてください。
        </div>
        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/me" });
          }}
        >
          <button type="submit">Signin with Google</button>
        </form>
      </div>
    );
  };

  const session = await auth();
  if (!session) return;

  const { accessToken } = session.user as UserWithToken;

  const oauth2Client = new google.auth.OAuth2({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  });

  oauth2Client.setCredentials({ access_token: accessToken });

  const calendar: CalendarType = google.calendar({
    version: "v3",
    auth: oauth2Client,
  });

  try {
    const calendarList = await calendar.calendarList.list();
    console.log(calendarList);
    return (
      <div>
        <h1>Calendar</h1>
        <Calendar list={calendarList.data} />
        <button
          onClick={async () => {
            "use server";
            await addEvent(accessToken);
          }}
        >
          addEvent
        </button>
      </div>
    );
  } catch (error) {
    console.log(error);
    return (
      <div>
        <div>
          ログインの有効期限が切れました。
          <br />
          もう一度ログインしてください。
        </div>
        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/me" });
          }}
        >
          <button type="submit">Signin with Google</button>
        </form>
      </div>
    );
  }
}
