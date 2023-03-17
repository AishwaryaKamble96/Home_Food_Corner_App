//import "@/styles/globals.css";
import GlobalStyle from "../component/GlobalStyles";
import Footer from "../component/Navigation";
import Layout from "../component/Layout";
import { useState, useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";

import { set } from "mongoose";

export default function App({ Component, pageProps }) {
  const [postList, setPostList] = useState([]);
  const [wishListPosts, setWishListPosts] = useLocalStorageState(
    "wishListPosts",
    { defaultValue: [] }
  );

  // Fetched post list from Post Collection
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("/api");
      const dataResponse = await data.json();

      setPostList(dataResponse);
    };
    fetchData().catch(console.error);
  }, []);

  function handleWishedPost(id) {
    if (wishListPosts.length === 0) {
      console.log("empty", wishListPosts);
      setWishListPosts([{ id: id, isWished: true }]);
    } else {
      console.log("not empty");
      setWishListPosts(
        wishListPosts.map((post, index) => {
          index.id == id
            ? { ...index, isWished: !wishListPosts.isWished }
            : post;
        })
      );
    }
    console.log("wishListPosts", wishListPosts);
  }

  return (
    <>
      <GlobalStyle />
      <Layout>
        <Component
          postList={postList}
          wishList={wishListPosts}
          onToggleWished={handleWishedPost}
          {...pageProps}
        />
      </Layout>
      <Footer />
    </>
  );
}
