import { auth, signIn, signOut } from "@/auth";
import styles from "./header.module.css";

export default async function Header() {
  const session = await auth();

  return (
    <header className={styles.header}>
      <div>LOGO</div>
      {session ? (
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <button type="submit">Signout</button>
        </form>
      ) : (
        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/me" });
          }}
        >
          <button type="submit">Signin with Google</button>
        </form>
      )}
    </header>
  );
}
