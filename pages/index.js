import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Post from "../component/Post";

//const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("/api");
      const dataResponse = await data.json();
      setPostList(dataResponse);
    };
    fetchData().catch(console.error);
  }, []);

  return (
    <>
      <section>
        <PostList>
          {postList.map((post) => {
            return <Post postData={post}></Post>;
          })}
        </PostList>
      </section>
    </>
  );
}

const PostList = styled.ul`
  display: flex;
  flex-direction: column;
`;
