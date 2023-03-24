import GlobalStyle from "../component/GlobalStyles";
import Footer from "../component/Navigation";
import Layout from "../component/Layout";
import { useState, useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps, session }) {
  const [postList, setPostList] = useState([]);
  const [wishListPosts, setWishListPosts] = useLocalStorageState(
    "wishListPosts",
    { defaultValue: [] }
  );

  // Fetched post list from Post Collection
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("/api/");
      const dataResponse = await data.json();

      setPostList(dataResponse);
    };
    fetchData().catch(console.error);
  }, []);

  function handleWishedPost(id) {
    const isAdded = wishListPosts.find((post) => post.id === id);

    if (!isAdded) {
      setWishListPosts([...wishListPosts, { id: id, isWished: true }]);
    } else {
      setWishListPosts(
        wishListPosts.map((post) =>
          post.id === id ? { ...post, isWished: !post.isWished } : post
        )
      );
    }
  }

  return (
    <>
      <GlobalStyle />
      <Layout>
        <SessionProvider session={session}>
          <Component
            postList={postList}
            setPostList={setPostList}
            wishList={wishListPosts}
            onToggleWished={handleWishedPost}
            {...pageProps}
          />
        </SessionProvider>
      </Layout>
      <Footer />
    </>
  );
}
