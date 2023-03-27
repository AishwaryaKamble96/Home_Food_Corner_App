import TitleBar from "../TitleBar";
import Link from "next/link";
import styled from "styled-components";
import { useSession, signOut } from "next-auth/react";
export default function Layout({ children }) {
  const { data: session } = useSession();
  return (
    <>
      <TitleBar />
      {session ? (
        <StyledButton onClick={() => signOut()}>Sign Out</StyledButton>
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
