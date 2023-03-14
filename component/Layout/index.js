import TitleBar from "../TitleBar";

export default function Layout({ children }) {
  return (
    <>
      <TitleBar />
      <main>{children}</main>
    </>
  );
}
