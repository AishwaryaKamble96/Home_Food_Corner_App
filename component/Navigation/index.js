import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

export default function Navigation() {
  return (
    <LinkNavigation>
      <Link href="/">
        <Image src={"/img/home.png"} alt="Home" width={50} height={50} />
      </Link>
    </LinkNavigation>
  );
}

const LinkNavigation = styled.nav`
  display: flex;
  position: fixed;
  bottom: 0px;
  width: 100%;
  justify-content: space-evenly;
  margin: 5px;
  padding: 10px;
  background-color: lightslategray;
`;
