import { useEffect, useState } from "react";
import styled from "styled-components";
import PostForm from "../PostForm";
import UpdatePost from "../UpdatePost";

export default function Profile({ userData, userId }) {
  //const { _id, username, email_id, contactno, location } = userData;
  const [addPostEnabled, setAddPostEnabled] = useState(false);
  const [isEditEnabled, setIsEditEnabled] = useState(false);
  const [editablePostId, setEditablePostId] = useState();
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("/api/posts");
      const postsData = await data.json();
      setPostList(postsData);
    };
    fetchData().catch(console.error);
  }, []);

  const userPostList = postList.filter((post) => post.user_id === userId);

  if (!userPostList) return null;

  console.log("user", userData.username, userPostList);

  async function handleRender() {
    const data = await fetch("/api/posts");
    const postData = await data.json();
    setPostList(postData);
    //postList(postData);
  }

  async function onDelete(id) {
    const response = await fetch(`/api/posts/${id}`, { method: "DELETE" });
    if (response.ok) {
      await response.json();
      handleRender();
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
        />
      ) : (
        <ProfileGrid>
          <ProfileTitle>Hello, {userData.username}</ProfileTitle>
          <Info>
            <dt>
              Email Id : <span>{userData.email_id}</span>
            </dt>
            <dt>
              Contact No : <span>{userData.contactno}</span>
            </dt>
            <dt>
              Location : <span>{userData.location}</span>
            </dt>
          </Info>

          <PostList>
            <h4>Your Posts:</h4>
            {!userPostList.length ? (
              <ListItem>No post </ListItem>
            ) : (
              userPostList.map((post) => (
                <ListItem key={post._id}>
                  {post.name}
                  <button onClick={() => onDelete(post._id)}>Remove</button>
                  <button onClick={() => handleUpdate(post._id)}>Update</button>
                </ListItem>
              ))
            )}
          </PostList>
          <AddPostButton
            onClick={() => {
              setAddPostEnabled(true);
            }}
          >
            Add Post
          </AddPostButton>
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
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
`;

const ProfileGrid = styled.section`
  display: flex;
  margin: 30px 30px 100px 30px;
  justify-content: space-evenly;
  flex-direction: column;
`;

const Info = styled.div`
  margin: 10px 20px 30px 10px;
  padding: 25px;
  background-color: white;
  border-radius: 15%;
  box-shadow: 5px 10px;
  border: 1px solid;
`;

const AddPostButton = styled.button`
  background-color: white;
  padding: 5px;
  border-radius: 5%;
  width: 100px;
  border: 1px solid;
`;

const PostList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  gap: 5px;
`;
const ListItem = styled.li`
  padding: 5px;
  background-color: white;
  align-items: center;
  border: 1px solid;
  border-radius: 20px;
  justify-content: space-evenly;
  display: flex;
  gap: 5px;
`;
