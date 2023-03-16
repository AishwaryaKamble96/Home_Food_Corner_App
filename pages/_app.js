//import "@/styles/globals.css";
import GlobalStyle from "../component/GlobalStyles";
import Footer from "../component/Navigation";
import Layout from "../component/Layout";
import { useState, useEffect } from "react";

export default function App({ Component, pageProps }) {
  const [postList, setPostList] = useState([]);

  // Fetched post list from Post Collection
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("/api");
      const dataResponse = await data.json();

      setPostList(dataResponse);
    };
    fetchData().catch(console.error);
  }, []);

  const wishListPosts = postList.map((post) => {
    return { id: post._id, isEnd: false };
  });

  console.log("array of ishlist", wishListPosts);
  return (
    <>
      <GlobalStyle />
      <Layout>
        <Component postList={postList} {...pageProps} />
      </Layout>
      <Footer />
    </>
  );
}
