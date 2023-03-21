import styled from "styled-components";

export default function Profile({ userData, userPostList }) {
  const { _id, username, email_id, contactno, fullname } = userData;

  return (
    <>
      <ProfileGrid>
        <ProfileTitle>Hello, {fullname}</ProfileTitle>
        <Info>
          <dt>
            User Name : <span>{username}</span>
          </dt>
          <dt>
            Email Id : <span>{email_id}</span>
          </dt>
          <dt>
            Contact No : <span>{contactno}</span>
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
                <button>Remove</button>
              </ListItem>
            ))
          )}
        </PostList>
        <AddPostButton>Add Post</AddPostButton>
      </ProfileGrid>
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
