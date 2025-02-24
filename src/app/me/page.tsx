import { auth, signIn, signOut } from "@/auth";
import NextCalendar from "@/components/ui/Calendar";
import Link from "next/link";
import { useCalendar } from "@/hooks/useCalendar";
import { UserWithToken } from "@/types/auth";

export default async function me() {
  const { getCalendarList } = useCalendar();

  const session = await auth();
  if (!session) return;

  const user = session.user as UserWithToken;

  try {
    const calendarList = await getCalendarList(user);

    return (
      <div>
        <h1>Calendar</h1>
        <NextCalendar />
      </div>
    );
  } catch (error) {
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
