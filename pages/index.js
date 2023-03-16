import { useState, useEffect } from "react";
import styled from "styled-components";
import Post from "../component/Post";

export default function Home() {
  const [postList, setPostList] = useState([]);
  const [wholeList, setWholeList] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("/api");
      const dataResponse = await data.json();

      setWholeList(dataResponse);
      setPostList(dataResponse);
    };
    fetchData().catch(console.error);
  }, []);

  function handleSearch(event) {
    const word = event.target.value;
    setSearchText(word);
    const searchResult = wholeList.filter((post) => {
      const postName = post.name.toLowerCase();
      return postName.includes(word);
    });
    setPostList(searchResult);
  }

  // async function handleReload(event) {
  //   const form = event.target;
  //   const data = await fetch("/api/posts");
  //   const postData = await data.json();
  //   setPostList(postData);
  // }

  return (
    <>
      <AppGrid>
        <SearchBox>
          <Search
            type={"search"}
            id="searchtext"
            name="searchtext"
            value={searchText}
            placeholder="Enter your favourite food name"
            onChange={handleSearch}
          ></Search>
        </SearchBox>
        {/* <button onClick={handleReload}>Refresh</button> */}
        <PostList>
          {postList.map((post) => {
            return <Post postData={post} key={post._id}></Post>;
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
  width: 70%;
  height: 30px;
  border-radius: 1%;

  background-color: rgb(253, 254, 254);
`;

const SearchBox = styled.form`
  display: flex;
  justify-content: center;
`;
