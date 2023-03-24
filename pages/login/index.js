import React from "react";
import { useSession, signOut, signIn } from "next-auth/react";

export default function login() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div>
        <p>Welcome, {session.user.name}</p>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    );
  } else {
    return (
      <div>
        <p>Your are not signed in</p>
        <button onClick={() => signIn()}>Sign In</button>
      </div>
    );
  }
}
