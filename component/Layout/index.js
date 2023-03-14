import TitleBar from "../TitleBar";

export default function Layout({ child }) {
  return (
    <>
      <TitleBar />
      {child}
    </>
  );
}
