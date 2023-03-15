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

  const [searchText, setSearchText] = useState("");

  function handleSearch(event) {
    event.preventDefault();
    if (postList.length <= 1) {
      console.log("ëmty");
      setPostList(postList);
    }
    ///setPostList(postList);
    setSearchText(event.target.value);

    console.log("called", searchText);
    // const searchResult = postList.filter((post) => {
    //   const postName = post.name.toLowerCase();
    //   return postName.includes(searchText);
    // });
    const searchResult = postList.map((post) => {
      const postName = post.name.toLowerCase();
      return postName.includes(searchText);
    });

    setPostList(searchResult);
    console.log(searchResult);
    // if (!searchResult) {
    //   return <h2>Sorry!! Search for something else.</h2>;
    // }
  }

  async function handleReload(event) {
    // const form = event.target;
    // form.reset();
    const data = await fetch("/api/posts");
    const postData = await data.json();
    setPostList(postData);
  }

  return (
    <>
      <AppGrid>
        {/* ///onSubmit={handleSearch} */}
        <form>
          <SearchBar
            typeof="search"
            id="searchText"
            name="searchText"
            placeholder="Enter your favourite food name"
            onChange={handleSearch}
          ></SearchBar>

          <button onClick={handleReload}>Refresh</button>
        </form>
        <PostList>
          {postList.map((post) => {
            return <Post postData={post}></Post>;
          })}
        </PostList>
      </AppGrid>
    </>
  );
}

const AppGrid = styled.section`
  display: flex;
  flex-direction: column;
`;
const PostList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const SearchBar = styled.input`
  width: 80%;
  border-radius: 1%;
  align-self: center;
  background-color: rgb(253, 254, 254);
`;
