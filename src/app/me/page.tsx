import { auth } from "@/auth";
import { google, calendar_v3 } from "googleapis";
import { User } from "@auth/core/types";
import Calendar = calendar_v3.Calendar;

type Koma = User & {
  accessToken: string;
};

export default async function me() {
  const session = await auth();
  if (!session) return;
  const user = session.user as Koma;
  console.log(session);
  console.log(user.accessToken);

  // // Google OAuthへの接続
  const oauth2Client = new google.auth.OAuth2({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  });
  const accessToken = user?.accessToken; // Googleが払い出したアクセストークン
  oauth2Client.setCredentials({ access_token: accessToken });

  // // カレンダーを取得
  const calendar: Calendar = google.calendar({
    version: "v3",
    auth: oauth2Client,
  });

  const calendarResponse = await calendar.calendarList.list();
  console.log(calendarResponse);

  return (
    <div>
      <h1>My</h1>
    </div>
  );
}
