import TitleBar from "../TitleBar";

import styled from "styled-components";
import { useSession, signOut, signIn } from "next-auth/react";
import { useRouter } from "next/router";
export default function Layout({ children }) {
  const { data: session } = useSession();
  const router = useRouter();

  async function handleSignOut() {
    await router.push("/");
    signOut();
  }
  return (
    <>
      <TitleBar />
      {session ? (
        <StyledButton onClick={() => handleSignOut()}>Sign Out</StyledButton>
      ) : (
        <StyledButton onClick={() => signIn()}>Login</StyledButton>
      )}
      <main>{children}</main>
    </>
  );
}
const StyledButton = styled.button`
  background-color: white;
  padding: 5px;
  border-radius: 5%;
  width: 100px;
  border: 1px solid;
`;
