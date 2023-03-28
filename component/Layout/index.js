import TitleBar from "../TitleBar";
import Link from "next/link";
import styled from "styled-components";
import { useSession, signOut } from "next-auth/react";
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
      ) : null}
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
