import styles from "./page.module.css";
import { auth, signIn, signOut } from "@/auth";

export default async function Home() {
  const session = await auth();
  console.log("session", session);
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Top Page</h1>
        <form
          action={async () => {
            "use server";
            await signIn("google");
          }}
        >
          <button type="submit">Signin with Google</button>
        </form>
      </main>
    </div>
  );
}
