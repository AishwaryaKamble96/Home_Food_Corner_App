import "@/styles/globals.css";
import GlobalStyle from "../component/GlobalStyles";

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
