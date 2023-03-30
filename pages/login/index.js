import React from "react";
import { useSession, signOut, signIn } from "next-auth/react";
import styled from "styled-components";

export default function login() {
  const { data: session } = useSession();

  return (
    <LoginPage>
      {session ? (
        <div>
          <Intro>Welcome, {session.user.name}</Intro>
          <button onClick={() => signOut()}>Sign Out</button>
        </div>
      ) : (
        <div>
          <Intro>Your are not signed in</Intro>
          <button onClick={() => signIn()}>Sign In</button>
        </div>
      )}
    </LoginPage>
  );
}

const LoginPage = styled.div`
  text-align: center;
  margin: 80px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
`;

const Intro = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: black;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
`;
