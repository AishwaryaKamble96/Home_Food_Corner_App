import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

export default function Navigation() {
  return (
    <LinkNavigation>
      <Link href="/">
        <Image src={"/img/home.png"} alt="Home" width={50} height={50} />
      </Link>
      <Link href="/wishlistpage">
        <Image src={"/img/heart.png"} alt="Wishlist" width={50} height={50} />
      </Link>

      <Link href="/profile">
        <Image src={"/img/user.png"} alt="Wishlist" width={50} height={50} />
      </Link>
    </LinkNavigation>
  );
}

const LinkNavigation = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  margin: 5px;
  padding: 10px;
  background-color: lightslategray;
`;
