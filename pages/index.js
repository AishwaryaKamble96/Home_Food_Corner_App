import { useState, useEffect } from "react";
import styled from "styled-components";
import Post from "../component/Post";

export default function Home({ postList, wishList, onToggleWished }) {
  const [filteredPostList, setFilteredPostList] = useState([]);
  const [searchText, setSearchText] = useState("");

  console.log("wishist:", wishList);
  // const [wishListPosts, setWishListPosts] = useLocalStorageState(
  //   "wishListPosts",
  //   { defaultValue: "" }
  // );
  useEffect(() => {
    setFilteredPostList(postList);
  }, [postList]);

  function handleSearch(event) {
    const word = event.target.value;
    setSearchText(word);
    const searchResult = postList.filter((post) => {
      const postName = post.name.toLowerCase();
      return postName.includes(word);
    });
    setFilteredPostList(searchResult);
  }

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

        <PostList>
          {filteredPostList.map((post) => {
            return (
              <Post
                postData={post}
                key={post._id}
                wishList={wishList}
                onToggleWished={onToggleWished}
              ></Post>
            );
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
