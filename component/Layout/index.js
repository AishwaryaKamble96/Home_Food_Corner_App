import TitleBar from "../TitleBar";
import Link from "next/link";
export default function Layout({ children }) {
  return (
    <>
      <TitleBar />
      <Link href="/login">Login</Link>
      <main>{children}</main>
    </>
  );
}
