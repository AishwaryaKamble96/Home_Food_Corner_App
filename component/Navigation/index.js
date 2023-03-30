import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { useRouter } from "next/router";
export default function Navigation() {
  const router = useRouter();
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
  margin: 0;
  padding: 10px;
  background-color: #f2dc8a;
  //lightslategray;
`;
