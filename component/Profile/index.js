import { useState } from "react";
import styled from "styled-components";
import PostForm from "../PostForm";
import UpdatePost from "../UpdatePost";
import UserDetailsForm from "../UserDetailsForm";

export default function Profile({
  userData,
  userId,
  postList,
  setPostList,
  setUserDetails,
}) {
  const [addPostEnabled, setAddPostEnabled] = useState(false);
  const [isEditEnabled, setIsEditEnabled] = useState(false);
  const [editablePostId, setEditablePostId] = useState();
  const [addUserDetails, setAddUserDetails] = useState(false);

  const userPostList = postList.filter((post) => post.user_id === userId);

  if (!userPostList) return null;

  function handleRequiredUserDetails() {
    if (userData.contactno && userData.location) {
      setAddPostEnabled(true);
    } else {
      alert("Kindly add your contact no. and location.");
    }
  }

  async function handleRender() {
    const data = await fetch("/api/posts");
    const postData = await data.json();
    setPostList(postData);
  }

  async function onDelete(id) {
    const response = await fetch(`/api/posts/${id}`, { method: "DELETE" });
    if (response.ok) {
      await response.json();
      handleRender();
      alert("Successfully post is deleted");
    } else {
      console.error(`Error: ${response.status}`);
    }
  }

  function handleUpdate(id) {
    setIsEditEnabled(true);
    setEditablePostId(id);
    handleRender();
  }

  return (
    <>
      {addPostEnabled ? (
        <PostForm
          userId={userData._id}
          location={userData.location}
          addPostEnabled={setAddPostEnabled}
          handleRender={handleRender}
        />
      ) : (
        <ProfileGrid>
          <ProfileTitle>Hello, {userData.name}</ProfileTitle>
          <Info>
            <dt>
              Email Id : <span>{userData.email}</span>
            </dt>
            <dt>
              Contact No : <span>{userData.contactno}</span>
            </dt>
            <dt>
              Location : <span>{userData.location}</span>
            </dt>
            <br />
            <StyledInButton onClick={() => setAddUserDetails(true)}>
              Add Details
            </StyledInButton>
            {addUserDetails && (
              <UserDetailsForm
                userData={userData}
                addUserDetails={setAddUserDetails}
                setUserDetails={setUserDetails}
              />
            )}
          </Info>

          <PostList>
            <h4>Your Posts:</h4>
            {!userPostList.length ? (
              <ListItem>No post </ListItem>
            ) : (
              userPostList.map((post) => (
                <ListItem key={post._id}>
                  <PostTitle> {post.name}</PostTitle>
                  <StyledInButton onClick={() => onDelete(post._id)}>
                    Remove
                  </StyledInButton>
                  <StyledInButton onClick={() => handleUpdate(post._id)}>
                    Update
                  </StyledInButton>
                </ListItem>
              ))
            )}
          </PostList>
          <StyledButton onClick={handleRequiredUserDetails}>
            Add Post
          </StyledButton>

          {isEditEnabled && (
            <UpdatePost
              postId={editablePostId}
              isEditEnabled={setIsEditEnabled}
            ></UpdatePost>
          )}
        </ProfileGrid>
      )}
    </>
  );
}

const ProfileTitle = styled.div`
  font-weight: bold;
  font-size: larger;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
`;

const ProfileGrid = styled.section`
  display: flex;
  margin: 30px 30px 100px 30px;
  justify-content: space-evenly;
  flex-direction: column;
`;

const Info = styled.div`
  margin: 10px 20px 30px 10px;
  padding: 20px;
  background-color: white;
  border: 1px solid;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
`;

const StyledButton = styled.button`
  background-color: #f9e79f;
  padding: 10px;
  border-radius: 5%;
  width: 100px;
  border: 1px solid;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
`;

const StyledInButton = styled.button`
  background-color: #f5ecdb;
  padding: 5px;
  border-radius: 5%;
  width: 100px;
  border: 1px solid;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
`;

const PostList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  gap: 5px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
`;
const ListItem = styled.li`
  padding: 5px;
  background-color: white;
  align-items: center;
  border: 1px solid;
  border-radius: 20px;
  display: flex;
  justify-content: space-evenly;
`;

const PostTitle = styled.div`
  padding: 5px;
  margin: 0 4px 0px 4px;
  width: 180px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
`;
