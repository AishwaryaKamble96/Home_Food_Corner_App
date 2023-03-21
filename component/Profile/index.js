import styled from "styled-components";

export default function Profile({ userData }) {
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
          <li>hi</li>
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
  margin: 30px 30px 40px 30px;
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
  border-radius: 15%;
  box-shadow: 2px 5px;
  border: 1px solid;
`;

const PostList = styled.ul`
  list-style: none;
`;
