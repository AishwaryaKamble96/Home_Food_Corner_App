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
          <StyledButton onClick={() => signOut()}>Sign Out</StyledButton>
        </div>
      ) : (
        <div>
          <Intro>Your are not signed in</Intro>
          <StyledButton onClick={() => signIn()}>Sign In</StyledButton>
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

const StyledButton = styled.button`
  background-color: #f9e79f;
  padding: 10px;
  border-radius: 5%;
  width: 100px;
  border: 1px solid;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
`;
