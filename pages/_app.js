//import "@/styles/globals.css";
import GlobalStyle from "../component/GlobalStyles";
import Footer from "../component/Navigation";
import Layout from "../component/Layout";
import { useState, useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";

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
    const isAdded = wishListPosts.find((post) => post.id === id);
    console.log("isAdded", isAdded);
    if (!isAdded) {
      setWishListPosts([...wishListPosts, { id: id, isWished: true }]);
      console.log("wishListPosts", wishListPosts);
    } else {
      setWishListPosts(
        wishListPosts.map((post) =>
          post.id === id ? { ...post, isWished: !post.isWished } : post
        )
      );
      console.log("wishListPosts", wishListPosts);
    }
  }
  console.log("wishListPosts", wishListPosts);
  // function handleWishedPost(id) {
  //   const isAdded = wishListPosts.find((post) => post.id === id);
  //   if (isAdded) {
  //     console.log("is added", isAdded, wishListPosts);
  //     setWishListPosts(
  //       wishListPosts.find((post) => {
  //         if (post.id === id) {
  //           isWished: !post.isWished;
  //         }
  //       })
  //     );
  //   } else {
  //     console.log("is added:false");
  //     setWishListPosts([...wishListPosts, { id: id, isWished: true }]);
  //   }

  //   if (wishListPosts.length === 10) {
  //     console.log("empty", wishListPosts);
  //     setWishListPosts([{ id: id, isWished: true }]);
  //   } else {
  //     console.log("not empty");
  //     // setWishListPosts(
  //     //   wishListPosts.map((post) => {
  //     //     if (id === post.id) {
  //     //       post.isWished = !post.isWished;
  //     //     }
  //     //     console.log("post id:id ", post.id, id, post.isWished);
  //     //   })
  //     // );
  //     // setWishListPosts(
  //     //   wishListPosts.map((post, index) => {
  //     //     index.id == id ? { ...index, isWished: !index.isWished } : index;
  //     //   })
  //     // );
  //   }
  //   console.log("wishListPosts", wishListPosts);
  //}

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
