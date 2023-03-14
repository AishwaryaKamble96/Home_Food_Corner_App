import Link from "next/link";
import styled from "styled-components";

export default function Navigation() {
  return (
    <LinkNavigation>
      <Link href={"/"}>Home</Link>
    </LinkNavigation>
  );
}

const LinkNavigation = styled.nav`
  display: flex;
  position: fixed;
  bottom: 10px;
  justify-content: space-evenly;
`;
