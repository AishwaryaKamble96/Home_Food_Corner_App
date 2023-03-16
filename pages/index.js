import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Post from "../component/Post";

//const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [postList, setPostList] = useState([]);
  const [wholeList, setWholeList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("/api");
      const dataResponse = await data.json();

      setWholeList(dataResponse);
      setPostList(dataResponse);
    };
    fetchData().catch(console.error);
  }, []);

  const [searchText, setSearchText] = useState("");

  function handleSearch(event) {
    event.preventDefault();
    console.log("call.", event.target.value);
    setSearchText(event.target.value);
    //setSearchText(event.target);

    //console.log("list", wholeList);
    const searchResult = wholeList.filter((post) => {
      const postName = post.name.toLowerCase();
      return postName.includes(searchText);
    });
    console.log("called", searchText);
    setPostList(searchResult);
    console.log(searchText, searchResult);
  }

  async function handleReload(event) {
    const form = event.target;
    // form.reset();
    const data = await fetch("/api/posts");
    const postData = await data.json();
    setPostList(postData);
  }

  return (
    <>
      <AppGrid>
        <form>
          <Search
            type={"search"}
            id="searchText"
            name="searchText"
            value={searchText}
            placeholder="Enter your favourite food name"
            onInput={handleSearch}
          ></Search>
        </form>
        <button onClick={handleReload}>Refresh</button>
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
const Search = styled.input`
  width: 80%;
  border-radius: 1%;
  align-self: center;
  background-color: rgb(253, 254, 254);
`;
